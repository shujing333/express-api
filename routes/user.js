const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const router = express.Router();

//注册
router.post("/sign-up", async (req, res) => {
  //console.log(req.body);
  //1.获取前端传递过来的参数
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  //console.log(username, password, email);
  //2.校验参数是否ok

  //3.判断是否可以注册,邮箱是唯一性
  let data = await UserModel.findOne({ email: email });
  //console.log(data, "==");
  if (data) {
    //该邮箱已被注册过
    res.send({
      code: -1,
      msg: "邮箱已被注册"
    });
    return;
  }

  //4.保存到数据库
  let user = new UserModel({
    username: username,
    password: bcryptjs.hashSync(password, 10),
    email: email
  });
  await user.save();
  // console.log(user);
  res.send({
    code: 0,
    msg: "注册成功"
  });
});

//登录
router.post("/sign-in", async (req, res) => {
  //1.获取前端传递过来的参数
  let email = req.body.email;
  let password = req.body.password;
  //2.查询数据库
  let user = await UserModel.findOne({ email: email });
  //3.判断
  if (!user) {
    res.send({
      code: -1,
      msg: "用户名或密码不正确"
    });
    return;
  }
  //4.如果存在,判断密码是否正确
  let isOk = bcryptjs.compareSync(password, user.password);
  if (!isOk) {
    res.send({
      code: -1,
      msg: "用户名或密码不正确"
    });
    return;
  }

  //5.登录成功,签发一个token
  const token = jwt.sign(
    {
      //playload中一般存放一些不敏感的信息
      userId: user._id,
      username: user.username,
      email: user.email
    },
    "hello"
  );

  //6.响应前端
  res.send({
    code: 0,
    msg: "ok",
    data: {
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      },
      token: token
    }
  });
});
module.exports = router;
