const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const config = require('../config/defaultConf')

const tplPath = path.join(__dirname, '../template/dir.tpl')
const source = fs.readFileSync(tplPath)
const template = Handlebars.compile(source.toString());


module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath)
    if (stats.isFile()) {
      //如果是文件
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      fs.createReadStream(filePath).pipe(res)
    } else if (stats.isDirectory()) {
      //如果是文件夹
      const files = await readdir(filePath)
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      const dir = path.relative(config.root, filePath)
      const data = {
        files,
        dir: dir ? `/${dir}` : '', //1:1的相对地址
        title: path.basename(filePath),
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
