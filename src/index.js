function intToChinese(num, digits, units, minus){
  let str = '';
  let n = Math.floor(num);
  let uc = units.slice();
  while(n > 0){
    let u = uc.shift();
    let d = n % 10;
    str = digits[d] + ((d > 0) ? u : '') + str;
    n = Math.floor(n / 10);
  }

  const pattern1 = new RegExp(digits[0]+"+$", "i");
  const pattern2 = new RegExp("^"+digits[1] + units[1],"i");
  const pattern3 = new RegExp(digits[0]+"+", "i");

  return((num < 0) ? minus : "") + ((num < 1) ? digits[0] : str.replace(pattern1, '').replace(pattern2, units[1]).replace(pattern3, digits[0]));
}

function floatToChinese(num, digits, point){
  if(num % 1 == 0)return "";

  let str = '';
  let f = parseInt(num.toString().replace(/\d+./i,'1'));
  while(f>0){
    let d = f%10;
    str = digits[d] + str;
    f = Math.floor(f/10);
  }

  return point + str.replace(new RegExp("^" + digits[1],"i") , "");
}

export default class NC{
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
  units: ['','十', '百', '千', '萬', '十', '百', '千', '億', '十', '百', '千', '萬'],
  ordinal: "第",
  point: "點",
  minus: "負"
};

export let toOrdinal = NC.toOrdinal;
export let toWords = NC.toWords;
export let toWordsOrdinal = NC.toWordsOrdinal;
