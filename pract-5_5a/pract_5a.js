const textNode = document.getElementById("text-source");
const text = textNode.innerText;

// console.log('text:', text);
// const sentences = text.split('.');
// console.log('sentences:', sentences);
// /**
//  * "   str 1 str s tr   ".trim() => "str 1 str s tr"
//  */
// const trimmedSentences = sentences.map(str => str.trim());
// // console.log('trimmedSentences:', trimmedSentences);
// /**
//  * [1,2,3,4,5].filter(e => e < 4) => [1,2,3] 
//  */
// const filteredTrimmedSentences = trimmedSentences.filter(str => str.length != 0);
// // console.log('filteredTrimmedSentences:', filteredTrimmedSentences);

const sentences = text
 .split('.')
 .map(str => str.trim())
 .filter(str => str.length != 0);

// console.log('sentences:', sentences);
/**
 * wordsSentences = [
 *  [w1,w2,w3,...],   => 0
 *  [w11,w22,w33,...] => 1
 * ]
 */
const wordsSentences = sentences.map(sentence => sentence.split(' '));
// console.log('wordsSentences:', wordsSentences);
// console.log('first word:', wordsSentences[2][0]);
// let wordCount = 0;
// for (let i = 0; i < wordsSentences.length; i += 1) {
//  for (let j = 0; j < wordsSentences[i].length; j += 1) {
//   wordCount += 1;
//   if (wordCount % 2 == 0) {
//    wordsSentences[i][j] = `<span>${wordsSentences[i][j]}</span>`;
//   }
//   // console.log(`word[${wordCount}]:`, wordsSentences[i][j]);
//  }
//  wordsSentences[i] = wordsSentences[i].join(' ');
//  console.log(`Sentence [${i}]:`, wordsSentences[i]);
// }
// textNode.innerHTML = wordsSentences.join('.');

let wordCount = 0;
const result = wordsSentences.map((sentence) => {
 return sentence.map((word) => {
  wordCount += 1;
  if (wordCount % 2 == 0) {
   return `<span>${word}</span>`;
  }
  return word;
 }).join(' ');
}).join('.');

textNode.innerHTML = result;

const spans = document.getElementsByTagName('span');

const wordDescription = document.getElementById('word-description');
for (const span of spans) {
 span.addEventListener('click', () => {
  const text = span.innerText;
  wordDescription.innerText = text;
 });
}



let letter = '6';
if (/[a-z]/.test(letter)) {
 console.log('small')
} 

if (/[0-9]/.test(letter)) {
 console.log('digit')
}
if (/[A-Z]/.test(letter)) {
 console.log('digit')
}


const imagesMap = {
 a: `<img src"small_a">`,
 A: `<img src"A">`,
}