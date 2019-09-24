const express = require("express");
const PostModel = require("../models/post");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/posts", auth(), async (req, res) => {
  //1.获取从前端传递过来的参数
  let pageNum = parseInt(req.query.pageNum) || 1;
  let pageSize = parseInt(req.query.pageSize) || 5;

  //2.查询数据库的总条数
  let num = await PostModel.find().countDocuments();
  let totalPage = Math.ceil(num / pageSize);

  //3.按照条件去查询
  let list = await PostModel.find()
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .sort({ updatedAt: -1 });

  res.send({
    code: 0,
    msg: "ok",
    data: {
      list: list,
      totalPage: totalPage
    }
  });
});
module.exports = router;
