const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')
const conf = require('../config/defaultConf')
const range = require('./range')
const isFresh = require('./cache')


//利用promisify将异步回调优化
const promisify = require('util').promisify
const stat = promisify(fs.stat) //判断文件类型
const readdir = promisify(fs.readdir) //读取目录信息
const mime = require('./mime')
const compress = require('./compress')

//不论从地址进入，都可以读到tpl正确的地址
const tplPath = path.join(__dirname, '../template/dir.tpl') //绝对正确的路径=absolutePath+tplPat
//同步读取文件？=》只会执行一次，第二次会用缓存 || 所有页面都用一样的tpl
const source = fs.readFileSync(tplPath) //读取路径
const template = Handlebars.compile(source.toString())


//用asyc函数改造异步函数，记得用await
module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath)
    //当作文件已经读到了--同步写法
    if (stats.isFile()) {
      //如果判断为文件
      const contentType = mime(filePath)

      res.setHeader('Content-Type', contentType)
      //stream读文件
      if (isFresh(stats, req, rs)) {
        res.statusCode = 304
        res.end()
        return
      }
      let rs
      const {
        code,
        start,
        end
      } = range(stats.size, req, res)
      //range 读取部分文件
      if (code === 200) {
        res.statusCode = 200
        rs = fs.createReadStream(filePath)
      } else if (code === 206) {
        res.statusCode = 206
        //如果输入正确则返回部分文件内容
        rs = fs.createReadStream(filePath, {
          start,
          end
        })
      }
      if (filePath.match(conf.compress)) {
        //让符合要求的文件进行压缩
        rs = compress(rs, req, res)
      }
      rs.pipe(res)

      res.write(`${filePath} is a file`)
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath)
      const dir = path.relative(conf.root, filePath) //相对路径
      const data = {
        files: files.map(file => {
          return {
            file,
            icon: mime(file)
          }
        }),
        dir: dir ? `/${dir}` : '',
        title: path.basename(filePath),
      }
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      res.end(template(data))
    }
  } catch (error) {
    //如果发生error
    console.warn(error)
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(`${filePath} is not found`)
  }

}
