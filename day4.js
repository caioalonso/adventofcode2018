let moment = require("moment");
let fs = require("fs");

let input = fs.readFileSync("day4input.txt", "utf-8");

let logs = input
  .split("\n")
  .map(line => {
    let fragments = line.split(" ");
    if (fragments.length === 1) return;
    let date = fragments[0].substr(1);
    let time = fragments[1].slice(0, -1);
    let action = fragments[3];
    return { datetime: moment(date + " " + time), action };
  })
  .sort((a, b) => a.datetime - b.datetime);

let guards = [];
let currentGuard;
logs.forEach(log => {
  if (log.action.substr(0, 1) === "#") {
    let id = parseInt(log.action.substr(1));
    if (guards[id] === undefined) {
      guards[id] = { id, minutes: new Array(60).fill(0), slept: false };
    }
    currentGuard = guards[id];
  } else if (log.action === "asleep") {
    currentGuard.slept = log.datetime.minute();
  } else if (log.action === "up") {
    for (let i = currentGuard.slept; i < log.datetime.minute(); i++) {
      currentGuard.minutes[i]++;
    }
    currentGuard.slept = false;
  }
});

let sleepsMost = guards
  .map(guard => {
    return {
      id: guard.id,
      minutes: guard.minutes.reduce((acc, cur) => acc + cur)
    };
  })
  .filter(a => a != undefined)
  .sort((a, b) => b.minutes - a.minutes)[0];

console.log(
  "Guard #" + sleepsMost.id,
  "is the sleepiest one with",
  sleepsMost.minutes,
  "minutes logged"
);

let max = { minute: 0, freq: 0 };
for (let i = 0; i <= guards[sleepsMost.id].minutes.length; i++) {
  if (guards[sleepsMost.id].minutes[i] > max.freq) {
    max.minute = i;
    max.freq = guards[sleepsMost.id].minutes[i];
  }
}

console.log("Most frequently slept minute is " + max.minute);
console.log(
  max.minute +
    " * " +
    guards[sleepsMost.id].id +
    " = " +
    max.minute * guards[sleepsMost.id].id
);

max = { minute: 0, freq: 0, id: 0 };
for (let i in guards) {
  for (let j in guards[i].minutes) {
    if (guards[i].minutes[j] > max.freq) {
      max.minute = j;
      max.freq = guards[i].minutes[j];
      max.id = i;
    }
  }
}

console.log(
  "The guard #" + max.id,
  "has the most frequently slept minute (" + max.minute + ")"
);
console.log(max.minute, "*", max.id, "=", max.minute * max.id);
