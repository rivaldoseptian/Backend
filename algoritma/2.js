function longest(sentence) {
  const word = sentence.split(" ");
  let longestWord = "";

  for (let i = 0; i < word.length; i++) {
    // console.log(word[i]);
    if (word[i].length > longestWord.length) {
      longestWord = word[i];
    }
  }
  return longestWord;
}

const sentence = "Saya sangat senang mengerjakan soal algoritma";

console.log(longest(sentence), longest(`${sentence.length}:character`));
