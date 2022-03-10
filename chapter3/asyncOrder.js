const fs = require("fs");
// 비동기끼리 순서를 정하는 방법.
// async에서 이전 콜백에 다음 콜백을 넣어 주는 것으로 순서를 맞출 수 있음.
console.log("시작");
fs.readFile("./chapter3/readme2.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("1번", data.toString());
  fs.readFile("./chapter3/readme2.txt", (err, data) => {
    if (err) {
      throw err;
    }
    console.log("2번", data.toString());
    fs.readFile("./chapter3/readme2.txt", (err, data) => {
      if (err) {
        throw err;
      }
      console.log("3번", data.toString());
      console.log("끝");
    });
  });
});
