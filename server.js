const express = require("express");

//引入各种路由中间件
const UserRouter = require("./routes/user");
const PostRouter = require("./routes/post");
const app = express();

//静态资源托管
app.use(express.static("public"));

//跨域处理
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

//req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//调用路由中间件
app.use("/api", UserRouter);
app.use("/api", PostRouter);
app.listen(3000);
