function intToChinese(num, digits, units, minus, isCheque){
  let str = '';
  let n = Math.floor(Math.abs(num));
  if(n < 1) return ((num < 0) ? minus : "") + digits[0];

  let uc = units.slice();
  while(n > 0){
    let u = uc.shift();
    let d = n % 10;
    str = digits[d] + u + str;//((d > 0) ? u : '') + str;

    n = Math.floor(n / 10);
  }

  const smallUnit = units[1]+units[2]+units[3];
  const bigUnit   = units[4]+units[8]+units[12]+units[16]+units[20];
  const zero      = digits[0];

  str = str
    .replace(new RegExp("("+zero+")["+smallUnit+"]",'g'), "$1")//零千,零百,零十 keeps 零
    .replace(new RegExp("(["+bigUnit+"])[^"+smallUnit+"]+(["+bigUnit+"])",'g'), '$1'+zero)//大數中間沒細數，補零
    .replace(new RegExp("(["+smallUnit+"])"+zero+"+(["+bigUnit+"])", "g"), "$1$2"+zero)
    .replace(new RegExp("("+digits[0]+")+","g"), "$1")//group 零
    .replace(new RegExp(zero+"+$"), "");//tail zero remove

  if(isCheque != true){
    //check writing reserve the first "一"
    str = str.replace(new RegExp("^"+digits[1] + units[1]), units[1])//^一十 == 十
  }

  return((num < 0) ? minus : "") + str;
}

function floatToChinese(num, digits, point){
  if(num % 1 == 0)return "";

  let str = '';
  let f = parseInt(Math.abs(num).toString().replace(/\d+./i,'1'));
  while(f>0){
    let d = f%10;
    str = digits[d] + str;
    f = Math.floor(f/10);
  }

  return point + str.replace(new RegExp("^" + digits[1],"i") , "");
}

class NC{
  static toOrdinal(num) {
    return NC.labels.ordinal + num;
  }

  static toWords(num) {
    return intToChinese(num, NC.labels.digits, NC.labels.units, NC.labels.minus) + floatToChinese(num, NC.labels.digits, NC.labels.point);
  }

  static toWordsOrdinal(num) {
    return NC.labels.ordinal + intToChinese(num, NC.labels.digits, NC.labels.units, NC.labels.minus);
  }
}

NC.labels = {
  digits : ['零','一', '二', '三', '四', '五', '六', '七', '八', '九'],
  units: ['','十', '百', '千', '萬', '十', '百', '千', '億', '十', '百', '千', '兆', '十', '百', '千', '京', '十', '百', '千', '垓'],
  ordinal: "第",
  point: "點",
  minus: "負"
};

export default NC;
export let NumberToChineseWords = NC;
export let toOrdinal = NC.toOrdinal;
export let toWords = NC.toWords;
export let toWordsOrdinal = NC.toWordsOrdinal;
