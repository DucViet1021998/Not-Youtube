
function getNumberText(num) {
    if (!num) return

    numText = num.toString()
    if (numText.length >= 0 && numText.length < 4) {
        return numText;
    } else if (numText.length >= 4 && numText.length < 7) {
        const newNum = numText.slice(0, -3);
        const textNum = `${newNum}K`;
        return textNum;
    } else if (numText.length >= 7 && numText.length < 10) {
        const newNum = numText.slice(0, -6);
        const textNum = `${newNum}M`;
        return textNum;
    } else if (numText.length >= 10 && numText.length < 13) {
        const newNum = `${numText.slice(0, -9)},${numText.slice(1, -8)}`;
        const textNum = `${newNum}B`;
        return textNum;
    }
}
module.exports = getNumberText
