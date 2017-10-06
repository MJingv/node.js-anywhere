const http = require('http')
const chalk = require('chalk')
const conf = require('./config/defaultConf')
const path = require('path')
const router = require('./helper/router')

const server = http.createServer((req, res) => {
  const filePath = path.join(conf.root, req.url)
  router(req, res, filePath)
})
server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`
  console.info(`server started at ${chalk.green(addr)}`)
})
