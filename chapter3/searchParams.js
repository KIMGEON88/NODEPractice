const { URL } = require("url");

const myURL = new URL(
  "https:www.gitbut.co.kr/?page=3&limit=10&catecory=nodejs&category=javascript"
);

console.log("searchParams:", myURL.searchParams);
console.log("searchParams.getAll():", myURL.searchParams.getAll);
console.log("searchParams.get():", myURL.searchParams.get("limit"));
console.log("seacrParams.has():", myURL.searchParams.has("page"));

console.log("searchParams.keys():", myURL.searchParams.keys());
console.log("searchParams.values():", myURL.searchParams.values());

myURL.searchParams.append("filter", "es3");
myURL.searchParams.append("filter", "es5");
console.log(myURL.searchParams.getAll("filter"));

console.log("searchParams.toString():", myURL.searchParams.toString());
myURL.search = myURL.searchParams.toString();
