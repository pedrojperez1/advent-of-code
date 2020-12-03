const data = require("./data");

class Solution {
    constructor(data) {
        this.field = data.split("\n");
        this.fieldHeight = this.field.length;
        this.fieldWidth = this.field[0].length;
    }

    traverse(slopeX, slopeY) {
        let treesSeen = 0;
        let x = 0;
        let y = 0;
        while (x < this.fieldHeight - 1) {
            console.log(`current coords: (${x}, ${y})`)
            x += slopeX; // move down
            if (y + slopeY >= this.fieldWidth) { // check if we go past right boundary
                y = 3 - (this.fieldWidth - y); // go back to y=0 since field repeats
            } else {
                y += slopeY;
            }; 
            if (this.field[x][y] === "#") {
                treesSeen += 1
            }
        }
        return `We saw ${treesSeen} trees!`
    }
}

const solve = new Solution(data);
console.log(solve.traverse(1, 3));