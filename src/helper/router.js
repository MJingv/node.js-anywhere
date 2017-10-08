const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const mime = require('./mime')
const compress = require('./compress')
const range = require('./rang')
const isFresh = require('./cache')

const tplPath = path.join(__dirname, '../template/dir.tpl')

const source = fs.readFileSync(tplPath)
const template = Handlebars.compile(source.toString());


module.exports = async function (req, res, filePath,config) {
  try {
    const stats = await stat(filePath)
    if (stats.isFile()) {
      //如果是文件
      const contentType = mime(filePath)
      res.statusCode = 200
      res.setHeader('Content-Type', contentType)

      if (isFresh(stats, req, res)) {
        res.statusCode = 304
        res.end()
        return
      }

      let rs;
      const {
        code,
        start,
        end
      } = range(stats.size, req, res)
      if (code === 200) {
        rs = fs.createReadStream(filePath)
      } else {
        res.statusCode = 206
        //可以根据args确定读取的范围
        rs = fs.createReadStream(filePath, {
          start,
          end
        })
      }
      if (filePath.match(config.compress)) {
        //匹配为响应文件则压缩
        rs = compress(rs, req, res)
      }
      rs.pipe(res)
    } else if (stats.isDirectory()) {
      //如果是文件夹
      const files = await readdir(filePath)
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      const dir = path.relative(config.root, filePath)
      const data = {
        dir: dir ? `/${dir}` : '', //1:1的相对地址
        title: path.basename(filePath),
        files: files.map(file => {
          return {
            file,
            icon: mime(file)
          }
        })
      }
      res.end(template(data))
    }
  } catch (ex) {
    console.error(ex)
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html')
    res.end(`${filePath} is not a dir of file\n${ex.toString()}`)

  }

}
