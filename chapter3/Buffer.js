const buffer = Buffer.from("저를 버퍼로 바꿔보세요");

console.log("from():", buffer);
console.log("length:", buffer.length);
console.log("toString():", buffer.toString());

const array = [
  Buffer.from("띄엄 "),
  Buffer.from("띄엄 "),
  Buffer.from("띄어쓰기"),
];
const buffer2 = Buffer.concat(array);
console.log("concat():", buffer2.toString());

const buffer3 = Buffer.alloc(5);
console.log("alloc():", buffer3);

// 버퍼의 문제점은 용량이 100MB인 파일이 있다면 읽을 때 메모리에 100MB인 버퍼를 만들어야 한다.
// 이 작업을 동시에 열 개만 해도 1GB에 달하는 메모리가 사용된다.
