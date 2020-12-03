const data = require("./data");
const dataArr = data.split('\n');

const parseRuleAndPassword = (string) => {
    const splitString = string.split(" ");
    const min = Number(splitString[0].split("-")[0]);
    const max = Number(splitString[0].split("-")[1]);
    const letter = splitString[1][0];
    const pass = splitString[2];
    return {
        rule: {letter, min, max},
        password: pass
    }
}

const validPasswordPart1 = (password, rule) => {
    const letterMatches = [].filter.call(password, letter => letter === rule.letter);
    return letterMatches.length >= rule.min && letterMatches.length <= rule.max
}

const validPasswordPart2 = (password, rule) => {
    const first = password[rule.min-1] === rule.letter;
    const second = password[rule.max-1] === rule.letter;
    return first ^ second
}

const parsedPasswords = dataArr.map(p => parseRuleAndPassword(p));

const numValidPasswordsPart1 = parsedPasswords.reduce((sum, pass) => {
    return validPasswordPart1(pass.password, pass.rule) ? sum + 1 : sum
}, 0)

const numValidPasswordsPart2 = parsedPasswords.reduce((sum, pass) => {
    return validPasswordPart2(pass.password, pass.rule) ? sum + 1 : sum
}, 0)

console.log("Part 1: num valid passwords", numValidPasswordsPart1)
console.log("Part 2: num valid passwords", numValidPasswordsPart2)