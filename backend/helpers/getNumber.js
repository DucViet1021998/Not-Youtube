

function getNumber(num) {

    const numString = num.toString()
    if (numString.length >= 0 && numString.length <= 3) {
        return numString
    } else if (numString.length >= 4 && numString.length < 7) {
        const newNum = numString.slice(0, -3) + ',' + numString.slice(-3);
        return newNum;
    } else if (numString.length >= 7 && numString.length < 10) {
        const newNum = numString.slice(0, -3) + ',' + numString.slice(-3);
        const newNum2 = newNum.slice(0, -7) + ',' + newNum.slice(-7);
        return newNum2;
    } else if (numString.length >= 10 && numString.length < 13) {
        const newNum = numString.slice(0, -3) + ',' + numString.slice(-3);
        const newNum2 = newNum.slice(0, -7) + ',' + newNum.slice(-7);
        const newNum3 = newNum2.slice(0, -11) + ',' + newNum2.slice(-11);
        return newNum3;
    }
}

module.exports = getNumber