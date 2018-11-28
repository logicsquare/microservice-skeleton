const createProxy = require("micro-proxy")
const pm2 = require("pm2")

const { apps } = require("./etc/apps.json")
const { rules } = require("./etc/rules.json")

const proxy = createProxy(rules)

try {
  pm2.connect((conErr) => {
    if (conErr) {
      console.error("==> PM2 Connection Error: ", conErr)
      process.exit(2)
    }

    pm2.start(apps, { env: process.env.NODE_ENV || "development" }, (err) => {
      pm2.disconnect()
      if (err) { throw err }
      proxy.listen(9000, (proxyErr) => {
        if (proxyErr) {
          throw proxyErr
        }
        console.log(`> Ready on http://localhost:9000`)
      })
    })
  })
} catch (error) {
  console.error(error)
}
