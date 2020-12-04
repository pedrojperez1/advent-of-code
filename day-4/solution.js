const data = require("./data");

class Solution {
    constructor(data) {
        this.passports = this.parsePassports(data);
    }
    parsePassports(rawText) {
        const splitRawText = rawText.split("\n\n")
        const rawPassports = splitRawText.map(r => r.split("\n"));
        const normalizedPassports = rawPassports.map(r => r.join(" ").split(" "));
        const passports = normalizedPassports.map(passport => {
            return passport.reduce((obj, next) => {
                const key = next.split(":")[0];
                const val = next.split(":")[1];
                return {
                    ...obj,
                    [key]: val
                }
            }, {})
        });
        return passports;
    };

    countValidPassports(requiredFields) {
        let count = 0;
        for (let passport of this.passports) {
            if (this.checkRequiredFields(passport, requiredFields)) count += 1
        }
        return count;
    };

    checkRequiredFields(passport, requiredFields) {
        for (let field of requiredFields) {
            if (!passport[field]) return false
        }
        return true
    }
}

const solve = new Solution(data);
const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
console.log("Number of valid passports:", solve.countValidPassports(required))