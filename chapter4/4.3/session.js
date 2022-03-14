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

const session = {}; // 서버에 사용자 정보를 저장하고, 클라이언트와는 세션 아이디로만 소통한다.
// 꼭 쿠키를 사용하지 않아도 되지만, 제일 간당하기에 많은 웹사이트가 쿠키를 사용한다.
// 세션을 위해 사용하는 쿠키를 세션쿠키라고 한다.
// 보통 세션 데이터는 위와 같이 저장하지 않고 레디스나 멤캐시트 같은 데이터베이스에 넣어둔다.

http
  .createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    if (req.url.startsWith("/login")) {
      const { query } = url.parse(req.url);
      const { name } = qs.parse(query);
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 5);
      const uniqueInt = Date.now();
      session[uniqueInt] = {
        name,
        expires,
      };
      res.writeHead(302, {
        Location: "/",
        "Set-Cookie": `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
      });
      res.end();
      // 세션쿠키가 존재하고, 만료 기간이 지나지 않았다면
    } else if (
      cookies.session && // 세션이 존재 하고
      session[cookies.session].expires > new Date() // 종료 기한이 지나지 않았다면
    ) {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(`${session[cookies.session].name}님 안녕하세요`);
    } else {
      try {
        const data = await fs.readFile("./cookie2.html");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(data);
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(err.message);
      }
    }
  })
  .listen(8085, () => {
    console.log("8085번 포트에서 서버 대기 중입니다!");
  });
