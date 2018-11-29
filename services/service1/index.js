const { send } = require("micro")
const {
  withNamespace, router, get, post, put, del
} = require("microrouter")

const namespace = withNamespace("/service1")
/* Route defintions */
function findRoute(req, res) {
  send(res, 200, "This is the GETALL route for Service # 1")
}
function getRoute(req, res) {
  return send(res, 200, "This is the GETONE route for Service # 1")
}
function postRoute(req, res) {
  send(res, 200, "This is the POST route for Service # 1")
}
function putRoute(req, res) {
  return send(res, 200, "This is the PUT route for Service # 1")
}
function delRoute(req, res) {
  return send(res, 200, "This is the DEL route for Service # 1")
}
function notfound(req, res) {
  return send(res, 400, "No such route for Service # 1")
}


module.exports = router(
  namespace(get("/", findRoute)),
  namespace(get("/:id", getRoute)),
  namespace(post("/", postRoute)),
  namespace(put("/", notfound)),
  namespace(put("/:id", putRoute)),
  namespace(del("/", notfound)),
  namespace(del("/:id", delRoute)),
)
