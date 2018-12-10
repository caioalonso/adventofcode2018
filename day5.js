let fs = require("fs");

let input = fs.readFileSync("day5input.txt", "utf-8");

function swapCase(letters) {
  let newLetters = "";
  for (let i = 0; i < letters.length; i++) {
    if (letters[i] === letters[i].toLowerCase()) {
      newLetters += letters[i].toUpperCase();
    } else {
      newLetters += letters[i].toLowerCase();
    }
  }

  return newLetters;
}

function reactPolymer(p) {
  let inverted = swapCase(p);
  p = p.split("");
  inverted = inverted.split("");

  let found = true;
  while (found === true) {
    found = false;
    let toRemove = [];
    // < input.length-1 because we want to skip the last one
    for (let i = 0; i < p.length - 1; i++) {
      if (p[i] === inverted[i + 1]) {
        toRemove.push(i);
        toRemove.push(i + 1);
        i++;
        found = true;
      }
    }

    // removing in reverse order to do it in one pass
    for (let i = toRemove.length - 1; i >= 0; i--) {
        p.splice(toRemove[i], 1);
      inverted.splice(toRemove[i], 1);
    }
  }
  return p.join('');
}

let alphabet = 'abcdefghijklmnopqrstuvwxyz'
let s = alphabet.length
let min = {letter:'', size:99999}
while(s--) {
    let regex = new RegExp(alphabet.charAt(s), 'gmi')
    let newInput = input.replace(regex, '')
    let size = reactPolymer(newInput).length;
    if(size < min.size) {
        min.letter = alphabet.charAt(s)
        min.size = size
    }
}

console.log(min)
