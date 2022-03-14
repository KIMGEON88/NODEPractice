const http = require("http");

http
  .createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, { "Set-Cookie": "mycookie=test" });
    res.end("Hello Cookie");
  })
  .listen(8003, () => {
    console.log("8003번 포트에서 서버 대기 중입니다!");
  });
// cookie는 문자열 형식으로 존재. 쿠키간에는 ;으로 구분
