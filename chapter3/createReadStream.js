const fs = require("fs");

const readStream = fs.createReadStream("./chapter3/readme3.txt", {
  highWaterMark: 16,
});
const data = [];

readStream.on("data", (chunk) => {
  data.push(chunk);
  console.log("data :", chunk, chunk.length);
});
readStream.on("end", () => {
  console.log("end :", Buffer.concat(data).toString());
});
readStream.on("error:", (err) => {
  console.log("error :", err);
});

const writeStream = fs.createWriteStream("./chapter3/readme3.txt");
writeStream.on("finish", () => {
  console.log("파일 쓰기 완료");
});
writeStream.write("이 글을 씁니다.\n");
writeStream.write("한번 더 씁니다.");
writeStream.end();
