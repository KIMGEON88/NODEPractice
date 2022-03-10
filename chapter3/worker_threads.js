const { Worker, isMainThread, parentPort } = require("worker_threads");
console.log(__filename);
console.log(__dirname);
if (isMainThread) {
  const worker = new Worker(__filename);
  worker.on("message", (message) => console.log("from worker", message));
  worker.on("exit", () => console.log("workder exit"));
  worker.postMessage("ping");
} else {
  parentPort.on("message", (value) => {
    console.log("from parent", value);
    parentPort.postMessage("pong");
    parentPort.close();
  });
}
