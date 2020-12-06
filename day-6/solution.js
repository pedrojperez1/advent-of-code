const data = require("./data");

class Solution {
    constructor(data) {
        this.groupAnswers = this.parseRawAnswers(data);
    }

    parseRawAnswers (rawText) {
        const firstSplit = rawText.split("\n\n") // split on blank lines first
        return firstSplit.map(groupAnswer => groupAnswer.split("\n")) // split on newline
    }

    getUniqueLetters(string) {
        return [...string].reduce((unique, next) => {
            return unique.includes(next) ? unique : unique + next
        }, '')
    }

    getQuestionsAnsweredYes(groupAnswer) {
        const concatAnswers = groupAnswer.join("") // concat list of answers into single string
        return this.getUniqueLetters(concatAnswers)
    }

    getQuestionsAllAnsweredYes(groupAnswer) {
        let commonAnswers = groupAnswer[0]; // set to first set
        for (let i = 1; i < groupAnswer.length; i++) {
            commonAnswers = [...commonAnswers].filter(letter => {
                return groupAnswer[i].includes(letter);
            })
        }
        return commonAnswers;
    }

    answerPart1 () {
        return this.groupAnswers.reduce((total, next) => {
            return total + this.getQuestionsAnsweredYes(next).length
        }, 0);
    }

    answerPart2 () {
        return this.groupAnswers.reduce((total, next) => {
            return total + this.getQuestionsAllAnsweredYes(next).length
        }, 0);
    }
}

// Part 1
const solver = new Solution(data);
console.log(`[Part 1] Answer to part 1:`, solver.answerPart1());

// Part 2
console.log(`[Part 2] Answer to part 2:`, solver.answerPart2());