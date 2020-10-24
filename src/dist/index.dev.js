"use strict";

module.exports = function toReadable(number) {
  var nLength = number.toString().length;
  var parts = number;

  var hundredsToReadable = function hundredsToReadable(n) {
    var separator = n;
    var simples = separator % 10;
    separator = (separator - simples) / 10;
    var tens = separator % 10;
    separator = (separator - tens) / 10;
    var hundreds = separator % 10;
    var simpArray = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    var tenPlusArray = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    var tensArray = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    var hText;

    if (hundreds !== 0) {
      hText = "".concat(simpArray[hundreds], " hundred");
    } else {
      hText = '';
    }

    var tText;

    if (tens === 1) {
      tText = tenPlusArray[simples];
    } else if (tens !== 0 && tens !== 1) {
      tText = tensArray[tens];
    } else if (tens === 0) {
      tText = '';
    }

    var nText;

    if (tens === 1 || (hundreds !== 0 || tens !== 0) && simples === 0) {
      nText = '';
    } else if ((hundreds !== 0 || tens !== 0 && tens !== 1) && simples !== 0 || (hundreds == 0 || tens == 0) && (simples === 0 || simples !== 0)) {
      nText = simpArray[simples];
    }

    var resultArray = [hText, tText, nText];
    return resultArray;
  };

  var result;

  if (nLength <= 3) {
    result = hundredsToReadable(parts).filter(function (element) {
      return element !== '';
    }).join(' ');
  }

  if (nLength > 3) {
    var hundreds = parts % 1000;
    var thousands = parts - hundreds;
    var thousandsArray = hundredsToReadable(thousands);
    var hundredsArray = hundredsToReadable(hundreds);

    if (thousandsArray[2] != 'one') {
      result = thousandsArray.filter(function (element) {
        return element !== '';
      }).join(' ') + ' thousands ';
    } else {
      result = thousandsArray.filter(function (element) {
        return element !== '';
      }).join(' ') + ' thousand ';
    }

    if (hundredsArray != ['', '', '']) {
      result = result + hundredsArray.filter(function (element) {
        return element !== '';
      }).join(' ');
    }
  }

  return result;
};