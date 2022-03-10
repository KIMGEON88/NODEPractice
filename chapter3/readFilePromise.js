// readFile은 콜백 형식의 모듈이어서 실무에서 사용하기 불편함.
// fs 모듈을 프로미스 형식으로 바꿔주는 방법을 사용.

const fs = require("fs").promises; // 프로미스 형태로 호출

fs.readFile("./chapter3/readme.txt")
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((err) => {
    console.error(err);
  });

fs.writeFile("./chapter3/readme.txt", "글이 새로 입력됩니다.")
  .then(() => {
    return fs.readFile("./chapter3/readme.txt");
  })
  .then((data) => {
    console.log(data.toString());
  })
  .catch((err) => {
    console.error(err);
  });
