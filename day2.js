let fs = require("fs");

let input = fs.readFileSync("day2input.txt", "utf-8");

let charCounts = input
  .split("\n")
  .map(line =>
    line.split("").reduce((acc, char) => {
      acc[char] = (acc[char] || 0) + 1;
      return acc;
    }, {})
  )
  .map(line => Object.values(line));

let twice = charCounts.filter(line => line.includes(2)).length;
let thrice = charCounts.filter(line => line.includes(3)).length;
console.log(twice * thrice);
