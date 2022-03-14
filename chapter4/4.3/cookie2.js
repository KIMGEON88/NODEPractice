const http = require("http");
const fs = require("fs").promises;
const url = require("url");
const qs = require("querystring");

const parseCookies = (cookie = "") =>
  cookie
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

http
  .createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie); // { mycookie: 'test' }
    // 주소가 /login으로 시작하는 경우
    if (req.url.startsWith("/login")) {
      const { query } = url.parse(req.url); // url에서 query 추출
      const { name } = qs.parse(query); // query에서 name 추출
      // url과 querysting 모듈로 각각의 주소와 주소에 딸려오는 query를 분석.
      const expires = new Date();
      // 쿠키 유효 시간을 현재시간 + 5분으로 설정
      expires.setMinutes(expires.getMinutes() + 5); // 쿠키의 만료 시간 설정 , 5분 뒤
      res.writeHead(302, {
        Location: "/",
        "Set-Cookie": `name=${encodeURIComponent(
          name
        )}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
      }); // 302응답 코드, 리다이렉트 주소와 함께 쿠키를 헤더에 넣는다. 헤더에는 한글을 설정할 수 없으므로
      // name 변수를 encodeURIComponent 메서드로 인코딩함
      res.end();
      // name이라는 쿠키가 있는 경우
    } else if (cookies.name) {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" }); // utf-8 은 전세계 문자를 인코딩 하는 코드. ASCII는 영문만.
      res.end(`${cookies.name}님 안녕하세요`); // cookie가 있다면 로그인 상태로 간주.
    } else {
      try {
        const data = await fs.readFile("./cookie2.html");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(data); // cookie가 없으면 cookie2.html 전송
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(err.message);
      }
    }
  })
  .listen(8084, () => {
    console.log("8084번 포트에서 서버 대기 중입니다!");
  });
