const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "database.json")); // Đường dẫn tuyệt đối
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});


