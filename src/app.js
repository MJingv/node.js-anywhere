const http = require('http')
const chalk = require('chalk')
const conf = require('./config/defaultConf')
const path = require('path')
const route = require('./helper/route')

class Server {
    constructor(config) {
        this.conf = Object.assign({}, conf, config)
    }
    start() {
        const server = http.createServer((req, res) => {
            const url = req.url //把用户请求的路径当作根目录
            const filePath = path.join(conf.root, url) //完整地址=当前目录地址+用户请求url

            route(req, res, filePath, this.conf)
        })
        server.listen(conf.port, conf.hostname, () => {
            const addr = `http://${conf.hostname}:${conf.port}`
            console.info(`Server started at ${chalk.blue(addr)}`)
        })

    }
}

module.exports = Server