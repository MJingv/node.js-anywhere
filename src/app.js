const http = require('http')
const chalk = require('chalk')
const path = require('path')
const conf = require('./config/defaultConf')
const router = require('./helper/router')

class Server {
  constructor(config) {
    this.conf = Object.assign({}, conf, config)
    //将默认conf和用户输入的config合并起来==>浅拷贝
  }
  start() {
    const server = http.createServer((req, res) => {
      const filePath = path.join(this.conf.root, req.url)
      router(req, res, filePath, this.conf)
    })
    server.listen(this.conf.port, this.conf.hostname, () => {
      const addr = `http://${this.conf.hostname}:${this.conf.port}`
      console.info(`server started at ${chalk.bgKeyword('pink').bold.red(addr)}`)

    })
  }
}

module.exports = Server
