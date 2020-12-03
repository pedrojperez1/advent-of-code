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

            x += slopeX;

            if (y + slopeY >= this.fieldWidth) { // check if we go past right boundary
                y = slopeY - (this.fieldWidth - y); // go back to y=0 since field repeats
            } else {
                y += slopeY;
            }; 
            if (this.field[x][y] === "#") {
                treesSeen += 1
            }
        }
        return treesSeen
    }
}

// Part 1
const solve = new Solution(data);
console.log(`In Part 1 we saw ${solve.traverse(1, 3)} trees!`);

// Part 2
const part2Answer = solve.traverse(1, 1) * solve.traverse(1, 3) * solve.traverse(1, 5) * solve.traverse(1, 7) * solve.traverse(2, 1)
console.log(`slope: (1, 1) ==> ${solve.traverse(1, 1)} trees`)
console.log(`slope: (1, 3) ==> ${solve.traverse(1, 3)} trees`)
console.log(`slope: (1, 5) ==> ${solve.traverse(1, 5)} trees`)
console.log(`slope: (1, 7) ==> ${solve.traverse(1, 7)} trees`)
console.log(`slope: (2, 1) ==> ${solve.traverse(2, 1)} trees`)

console.log(`Answer to Part 2 is ${part2Answer}`);