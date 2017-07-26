export default class NumberToChineseWords{
  constructor(){
    NumberToChineseWords.digits = ['零','一', '二', '三', '四', '五', '六', '七', '八', '九'];
    NumberToChineseWords.units = ['','十', '百', '千', '萬', '十', '百', '千', '億', '十', '百', '千', '萬'];
    NumberToChineseWords.ordinal = "第";
    NumberToChineseWords.point = "點";
  }

  static toOrdinal(num){
    return NumberToChineseWords.ordinal + num;
  }

  static toWords(num){
    return NumberToChineseWords.intToChinese(num, NumberToChineseWords.digits, NumberToChineseWords.units) + NumberToChineseWords.floatToChinese(num, NumberToChineseWords.digits)
  }

  static toWordsOrdinal(num){
    return NumberToChineseWords.ordinal + NumberToChineseWords.intToChinese(num, NumberToChineseWords.digits, NumberToChineseWords.units);
  }

  static intToChinese(num, digits, units){
    let str = '';
    let n = Math.floor(num);
    while(n > 0){
      let u = units.shift();
      let d = n%10;
      str = digits[d] + ((d > 0) ? u : '') + str;
      n = Math.floor(n/10);
    }

    return ((num < 1)? digits[0] : str.replace(new RegExp("零+$", "i"), '').replace(new RegExp("^一十","i"), "十"));
  }

  static floatToChinese(num, digits){
    if(num % 1 == 0)return;

    let str = '';
    let f = parseInt(num.toString().replace(/\d+./i,'1'));
    while(f>0){
      let d = f%10;
      str = digits[d] + str;
      f = Math.floor(f/10);
    }

    return NumberToChineseWords.point + str.replace(new RegExp("^一","i") , "");
  }
}