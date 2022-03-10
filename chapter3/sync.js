const fs = require("fs");

console.log("시작");
let data = fs.readFileSync("./chapter3/readme2.txt");
console.log("1번", data.toString());
data = fs.readFileSync("./chapter3/readme2.txt");
console.log("2번", data.toString());
data = fs.readFileSync("./chapter3/readme2.txt");
console.log("3번", data.toString());
console.log("끝");

// 동기는 프로그램 초반에 초기화 용으로만 쓰는 것이 바람직.
