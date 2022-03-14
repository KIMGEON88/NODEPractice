const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>Hello Node!</h1>");
    res.end("<p>Hello Server!</p>");
  })
  .listen(8080, () => {
    console.log("880번 포트에서 서버 대기 중입니다!");
  });
// 포트는 서버 내에서 프로세스를 구분하는 번호.
// 서버는 HTTP 요청을 대기하는 것 외에도 다양한 작업을 한다.
// 테이터베이스와 통신, FTP 요청 처리 등.
// 따라서 서버는 프로세스에 포트를 다르게 할당하여 들어오는 요청을 구분.
