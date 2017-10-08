const {
  createGzip,
  createDeflate
} = require('zlib')

module.exports = (rs, req, res) => {
  //rs==>restream
  //req==>request,浏览器支持的压缩类型
  //res==>response,设置header

  const acceptEncoding = req.headers['accept-encoding']
  //单词边界
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
