[![NPM](https://nodei.co/npm/number-to-chinese-words.png)](https://www.npmjs.com/package/number-to-chinese-words)

# number-to-chinese-words
Convert a number to chinese words. 由數字轉為中文數目

### Install
`npm install number-to-chinese-words`

### API

#### `toOrdinal(number)`
Converts an integer into a string with an ordinal postfix.
If number is decimal, the decimals will be removed.
```js
var converter = require('number-to-words');
converter.toOrdinal(21); // => “第21”
```

#### `toWords(number)`
Converts an integer into words.
If number is decimal, the decimals will be removed.
```js
var converter = require('number-to-words');
converter.toWords(13); // => “第十三”

// Decimal numbers:
converter.toWords(2.9); // => “二點九”

// Negative numbers:
converter.toWords(-3); // => "負三"

// Large numbers:
converter.toWords(9007199254740992); // => “”
```

#### `toWordsOrdinal(number)`
Converts a number into ordinal words.
If number is decimal, the decimals will be removed.
```js
import converter from "number-to-chinese-words";
converter.toWordsOrdinal(21); // => “第二十一”
```