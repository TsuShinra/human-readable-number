module.exports = function toReadable (number) {
    let nLength = number.toString().length;
    let parts = number;
    const hundredsToReadable = function(n) {
    let separator = n;
    let simples = separator % 10;
    separator = (separator - simples) / 10;
    let tens = separator % 10;
    separator = (separator - tens) / 10;
    let hundreds = separator % 10;

    
    let simpArray = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    let tenPlusArray = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    let tensArray = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    
    let hText; 
    if (hundreds !== 0) {
        hText = `${simpArray[hundreds]} hundred`;
    } else {
        hText = '';
    }       
    
    let tText;
    if (tens === 1) {
        tText = tenPlusArray[simples];
    } else if (tens !== 0 && tens !== 1) {
        tText = tensArray[tens];
    } else if (tens === 0){
        tText = '';
    }

    let nText;
    if (tens === 1 || (hundreds !== 0 || tens !== 0) &&  simples === 0) {
        nText = '';
    } else if ((hundreds !== 0 || tens !== 0 && tens !== 1) && simples !== 0 || (hundreds == 0 || tens == 0) && (simples === 0 || simples !== 0))  {
        nText = simpArray[simples];
    } 

    let resultArray = [hText, tText, nText];
    return resultArray;
    };
    let result;
    if (nLength <= 3) {
        result = hundredsToReadable(parts).filter(element => element !== '').join(' ');
    }
    if (nLength > 3) {
        let hundreds = parts % 1000;
        let thousands = parts - hundreds;
        let thousandsArray = hundredsToReadable(thousands);
        let hundredsArray = hundredsToReadable(hundreds);
        if (thousandsArray[2] != 'one') {
            result = thousandsArray.filter(element => element !== '').join(' ') + ' thousands ';
        } else {
            result = thousandsArray.filter(element => element !== '').join(' ') + ' thousand ';
        }
        if (hundredsArray != ['', '', '']) {
            result = result + hundredsArray.filter(element => element !== '').join(' ');
        }

    }
    return result;
    
}
