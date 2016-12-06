function shuffleFlatArray(array) {
    const newArray = array.slice();
    let j = null;
    let temp = null;
    for (let i = newArray.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = newArray[ i ];
        newArray[ i ] = newArray[ j ];
        newArray[ j ] = temp;
    }
    return newArray;
}

module.exports.shuffleFlatArray = shuffleFlatArray;
