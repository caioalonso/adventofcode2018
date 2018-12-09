let fs = require("fs");

let input = fs.readFileSync("day3input.txt", "utf-8");

// 1000x1000 fabric
let fabric = new Array(1000);
for(let i=0; i<fabric.length; i++) {
  fabric[i] = new Array(1000)
  fabric[i].fill(0)
}

let claims = input.split("\n").map(line => {
  let params = line.split(" ");
  if (params.length !== 4) {
    return;
  }
  let [marginLeft, marginTop] = params[2].split(",");
  marginTop = marginTop.slice(0, -1);
  let [width, height] = params[3].split("x");
  return {
    marginLeft: parseInt(marginLeft),
    marginTop: parseInt(marginTop),
    width: parseInt(width),
    height: parseInt(height)
  };
})
.filter(claim => claim !== undefined);

claims.forEach(claim => {
  for (let i = 0; i < claim.width; i++) {
    for (let j = 0; j < claim.height; j++) {
      fabric[claim.marginLeft + i][claim.marginTop + j] += 1;
    }
  }
});

let overlapCount = 0;
for(let i =0; i<fabric.length; i++) {
  for(let j=0;j<fabric[i].length; j++) {
    if(fabric[i][j] > 1) {
      overlapCount++
    }      
  }
}
console.log(overlapCount)
