const http = require('http')
const chalk = require('chalk')
const conf = require('./config/defaultConf')

const server = http.createServer((req, res) => {
  res.statusCode=200
  res.setHeader('Content-Type','text/html')
  res.write('<html>')
  res.write('<body>')
  res.write('hello world && http')
  res.write('</body>')
  res.write('</html>')

  res.end('--by jehol')

})

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`
console.info(`server started at ${chalk.green(addr)}`)
})
