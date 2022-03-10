const exec = require("child_process").exec;
const process = exec("dir");

process.stdout.on("data", function (data) {
  console.group(data.toString());
}); // 실행 결과

process.stderr.on("data", function (data) {
  console.error(data.toString());
});
