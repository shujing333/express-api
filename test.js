const jwt = require("jsonwebtoken");
//1.签发一个token
const token = jwt.sign(
  {
    userId: 1,
    username: "张三"
  },

  "hello"
);
console.log(token);
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoi5byg5LiJIiwiaWF0IjoxNTY5Mjg1MzU4fQ.aF-zN8MCU2YhlhPuxe2W2wHEzRdroSgi0PmY-fovYjo

try {
  const user = jwt.verify(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoi5byg5LiJIiwiaWF0IjoxNTY5Mjg1MzU4fQ.aF-zN8MCU2YhlhPuxe2W2wHEzRdroSgi0PmY-fovYjo",
    "hello"
  );
  console.log(user); //{ userId: 1, username: '张三', iat: 1569285358 }
} catch (error) {
  console.log("出错了", error.massage);
}
