const data = require("./data");
// const data = require("./dataExample");

class Solution {
    constructor(data) {
        this.passports = this.parsePassports(data);
    }
    parsePassports(rawText) {
        const splitRawText = rawText.split("\n\n") // split on empty lines
        const rawPassports = splitRawText.map(r => r.split("\n")); // split each passport by new line and then join them on spaces
        const normalizedPassports = rawPassports.map(r => r.join(" ").split(" "));
        const passports = normalizedPassports.map(passport => { // reduce down to obj for usability
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

    countValidPassportsPart2(requiredFields) {
        let count = 0;
        for (let passport of this.passports) {
            if (this.checkRequiredFields(passport, requiredFields)) {
                if (this.validateRequiredFields(passport, requiredFields)) count += 1
            }
        }
        return count;
    };

    checkRequiredFields(passport, requiredFields) {
        for (let field of requiredFields) {
            if (!passport[field]) return false
        }
        return true
    };

    validateRequiredFields(passport, validateFields) {
        let test;
        for (let field of validateFields) {
            test = this.validateRequiredField(field, passport[field]);
            console.log(`field ${field} tested ${test}. passport field: ${passport[field]}`);
            if (!test) return false
        }
        return true
    };

    validateRequiredField(fieldCode, fieldValue) {
        let regexMatch;
        switch (fieldCode) {
            case 'byr':
                return Number(fieldValue) >= 1920 && Number(fieldValue) <= 2002;

            case 'iyr':
                return Number(fieldValue) >= 2010 && Number(fieldValue) <= 2020;

            case 'eyr':
                return Number(fieldValue) >= 2020 && Number(fieldValue) <= 2030;
            
            case 'hgt':
                regexMatch = fieldValue.match(/(\d{2}in)|(\d{3}cm)/);
                if (regexMatch) {
                    const unit = fieldValue.slice(fieldValue.length - 2);
                    if(unit === "in") {
                        const height = Number(fieldValue.slice(0, 2));
                        return height >= 59 && height <= 76
                    } else if (unit === "cm"){
                        const height = Number(fieldValue.slice(0, 3));
                        return height >= 150 && height <= 193
                    }
                }
                return false;

            case 'hcl':
                regexMatch = fieldValue.match(/#(\d|[a-f]){6}/g);
                return regexMatch ? true : false

            case 'ecl':
                return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(fieldValue)
            
            case 'pid':
                regexMatch = fieldValue.match(/\d{9}/g);
                if (regexMatch) {
                    return regexMatch[0].length === fieldValue.length
                }

        }
    }
}
 //Part 1
const solve = new Solution(data, 1);
const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
console.log("[Part 1] Number of valid passports:", solve.countValidPassports(required));

//Part 2
console.log("[Part 2] Number of valid passports:", solve.countValidPassportsPart2(required));
