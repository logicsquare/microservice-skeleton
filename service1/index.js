module.exports = (req, res) => {
  res.end(`Welcome to Micro Service # 1 ${process.env.NODE_ENV}`)
}