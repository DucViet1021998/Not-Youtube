var shuffle = function (num, n) {
    const arr = []

    for (let i = 0; i < n; i++) {
        arr.push(num[i])
        arr.push(num[i + n])
    }
    return arr

};

console.log(shuffle([1, 2, 3, 4, 5, 6], 4));




