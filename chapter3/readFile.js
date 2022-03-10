const fs = require("fs");

fs.readFile("./chapter3/readme.txt", (err, data) => {
  // 파일 경로는 NODE가 실행 되는 위치 기준.
  // readFile의 결과물은 버퍼 형식으로 제공. 메모리 형식의 데이터. 사람이 읽을 수 있는 toString으로 변환해야 함.
  if (err) {
    throw err;
  }
  console.log(data);
  console.log(data.toString());
});
