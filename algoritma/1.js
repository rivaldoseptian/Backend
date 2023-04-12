function reverse(str) {
  let newStr = "";
  for (let i = str.length - 2; i >= 0; i--) {
    newStr += str[i];
  }

  newStr += str[str.length - 1];
  return newStr;
}
console.log(reverse("NEGIE1"));
