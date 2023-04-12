function countWord(INPUT, QUERY) {
  let result = [];
  for (let i = 0; i < QUERY.length; i++) {
    let count = 0;
    // console.log(QUERY[i]);
    for (let j = 0; j < INPUT.length; j++) {
      if (QUERY[i] === INPUT[j]) {
        count++;
      }
    }
    result.push(count);
  }
  return result;
}

let INPUT = ["xc", "dz", "bbb", "dz"];
let QUERY = ["bbb", "ac", "dz"];

console.log(countWord(INPUT, QUERY));
