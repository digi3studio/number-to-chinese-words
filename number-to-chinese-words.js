(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.index = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function intToChinese(num, digits, units, minus) {
    var str = '';
    var n = Math.floor(num);
    var uc = units.slice();
    while (n > 0) {
      var u = uc.shift();
      var d = n % 10;
      str = digits[d] + (d > 0 ? u : '') + str;
      n = Math.floor(n / 10);
    }

    var pattern1 = new RegExp(digits[0] + "+$", "i");
    var pattern2 = new RegExp("^" + digits[1] + units[1], "i");
    var pattern3 = new RegExp(digits[0] + "+", "i");

    return (num < 0 ? minus : "") + (num < 1 ? digits[0] : str.replace(pattern1, '').replace(pattern2, units[1]).replace(pattern3, digits[0]));
  }

  function floatToChinese(num, digits, point) {
    if (num % 1 == 0) return "";

    var str = '';
    var f = parseInt(num.toString().replace(/\d+./i, '1'));
    while (f > 0) {
      var d = f % 10;
      str = digits[d] + str;
      f = Math.floor(f / 10);
    }

    return point + str.replace(new RegExp("^" + digits[1], "i"), "");
  }

  var NC = function () {
    function NC() {
      _classCallCheck(this, NC);
    }

    _createClass(NC, null, [{
      key: 'toOrdinal',
      value: function toOrdinal(num) {
        return NC.labels.ordinal + num;
      }
    }, {
      key: 'toWords',
      value: function toWords(num) {
        return intToChinese(num, NC.labels.digits, NC.labels.units, NC.labels.minus) + floatToChinese(num, NC.labels.digits, NC.labels.point);
      }
    }, {
      key: 'toWordsOrdinal',
      value: function toWordsOrdinal(num) {
        return NC.labels.ordinal + intToChinese(num, NC.labels.digits, NC.labels.units, NC.labels.minus);
      }
    }]);

    return NC;
  }();

  exports.default = NC;


  NC.labels = {
    digits: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
    units: ['', '十', '百', '千', '萬', '十', '百', '千', '億', '十', '百', '千', '萬'],
    ordinal: "第",
    point: "點",
    minus: "負"
  };

  var NumberToChineseWords = exports.NumberToChineseWords = NC;
  var toOrdinal = exports.toOrdinal = NC.toOrdinal;
  var toWords = exports.toWords = NC.toWords;
  var toWordsOrdinal = exports.toWordsOrdinal = NC.toWordsOrdinal;
});
