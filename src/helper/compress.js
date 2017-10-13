const {
  createGzip,
  createDeflate
} = require('zlib') //系统内置压缩方法

module.exports = (rs, req, res) => {
  //rs=>readstream
  //req=>浏览器支持压缩的类型
  //res=>设置header，告诉用什么方法压缩

  const acceptEncoding = req.headers['accept-encoding']
  if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
    return rs
  } else if (acceptEncoding.match(/\bgzip\b/)) {

    res.setHeader('Content-Encoding', 'gzip')
    return rs.pipe(createGzip())
  } else if (acceptEncoding.match(/\bdeflate\b/)) {
    res.setHeader('Content-Encoding', 'deflate')
    return rs.pipe(createDeflate())
  }
}
