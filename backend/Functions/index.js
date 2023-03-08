function getNumber(num) {
    if (num.length >= 0 && num.length <= 3) {
        console.log(num);
    } else if (num.length >= 4 && num.length < 7) {
        const newNum = num.slice(0, -3) + ',' + num.slice(-3);
        return newNum;
    } else if (num.length >= 7 && num.length < 10) {
        const newNum = num.slice(0, -3) + ',' + num.slice(-3);
        const newNum2 = newNum.slice(0, -7) + ',' + newNum.slice(-7);
        return newNum2;
    } else if (num.length >= 10 && num.length < 13) {
        const newNum = num.slice(0, -3) + ',' + num.slice(-3);
        const newNum2 = newNum.slice(0, -7) + ',' + newNum.slice(-7);
        const newNum3 = newNum2.slice(0, -11) + ',' + newNum2.slice(-11);
        return newNum3;
    }
}

function getNumberText(num) {
    if (num.length >= 0 && num.length < 4) {
        return num;
    } else if (num.length >= 4 && num.length < 7) {
        const newNum = num.slice(0, -3);
        const textNum = `${newNum}K`;
        return textNum;
    } else if (num.length >= 7 && num.length < 10) {
        const newNum = num.slice(0, -6);
        const textNum = `${newNum}M`;
        return textNum;
    } else if (num.length >= 10 && num.length < 13) {
        const newNum = `${num.slice(0, -9)},${num.slice(1, -8)}`;
        const textNum = `${newNum}B`;
        return textNum;
    }
}

function removeAccents(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .toLowerCase();
}


export { removeAccents, getNumberText, getNumber }