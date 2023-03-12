let arr = function (num) {
    let biggest = num[0]
    let second = num[0]
    for (let i = 0; i <= num.length; i++) {
        if (biggest < num[i]) {
            second = biggest
            biggest = num[i]
        }
        else if (second !== biggest && second < num[i]) {
            second = num[i]
        }
    }
    return console.log(second);

};

arr([1, 2, 3, 4, 7, 9])
arr([1, 2, 3, 9, 7, 7])
arr([1, 9, 9, 4, 7, 3])
arr([1, 2, 9, 8, 7, 7])




