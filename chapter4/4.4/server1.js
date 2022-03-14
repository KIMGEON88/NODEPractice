// https 모듈은 웹 서버에 ssl 암호화를ㄹ 추가한다.
// GET이나 POST 같은 요청을 할 때 오가는 데이터를 누가 가로 채더라도 내용을 확인 할 수 없게 한다.

// 암호화를 적용하는 만큼, 그것을 인증해줄 기관도 필요하다. 인증기관에서 구입해야 한다.

const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
    res.write(`<h1>Hello Node!</h1>`);
    res.end(`<p>Hello Server!</p>`);
  })
  .listen(8080, () => {
    console.log("8080번 포트에서 서버 대기 중입니다.");
  });
///////////////////////////////////////////////////////////////////////////////////
const https = require("https");
const fs = require("fs");

https
  .createServer(
    {
      cert: fs.readFileSync("도메인 인증서 경로"),
      key: fs.readFileSync("도메인 비밀키 경로"),
      ca: [
        fs.readFileSync("상위 인증서 경로"),
        fs.readFileSync("상위 인증서 경로"),
      ],
    },
    (req, res) => {
      res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
      res.write(`<h1>Hello Node!</h1>`);
      res.end(`<p>Hello Server!</p>`);
    }
  )
  .listen(443, () => {
    console.log("443번 포트에서 서버 대기 중입니다.");
  });
////////////////////////////////////////////////////////////////////////////////////////
const https = require("https");
const fs = require("fs");
// http/2 사용
https
  .createSecureServer(
    {
      cert: fs.readFileSync("도메인 인증서 경로"),
      key: fs.readFileSync("도메인 비밀키 경로"),
      ca: [
        fs.readFileSync("상위 인증서 경로"),
        fs.readFileSync("상위 인증서 경로"),
      ],
    },
    (req, res) => {
      res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
      res.write(`<h1>Hello Node!</h1>`);
      res.end(`<p>Hello Server!</p>`);
    }
  )
  .listen(443, () => {
    console.log("443번 포트에서 서버 대기 중입니다.");
  });
