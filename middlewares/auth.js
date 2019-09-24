const jwt = require("jsonwebtoken");

const auth = () => {
  return (req, res, next) => {
    //判断处理
    //1.得到请求头中传递过来的Access_Token
    let token = req.get("Access_Token");
    //2.判断token是否存在
    if (!token) {
      //不存在
      res.status(401).send("用户认证失败");
      return;
    }

    //存在,需要判断是否有效
    try {
      let userInfo = jwt.verify(token, "hello");
      //校验成功
      //给req添加一个userInfo的属性,供后续使用
      req.userInfo = userInfo;
      //让代码流程继续执行
      next();
    } catch (error) {
      //校验失败
      res.status(401).send("用户认证失败");
    }
  };
};

module.exports = auth;
