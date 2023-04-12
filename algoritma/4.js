function diagonal(Matrix) {
  let diagonal1 = 0;
  let diagonal2 = 0;
  let n = Matrix.length;

  for (let i = 0; i < n; i++) {
    // console.log(i);
    diagonal1 += Matrix[i][i];
    diagonal2 += Matrix[i][n - 1 - i];
  }
  return diagonal1 - diagonal2;
}

const Matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(diagonal(Matrix));
