const data = require("./data");

class Solution {
    constructor(data) {
        this.tickets = data.split("\n");
    }

    parseTicket(ticket) {
        const row = this.getRow(ticket);
        const column = this.getColumn(ticket);
        const seatId = (row * 8) + column;
        return {
            row, 
            column, 
            seatId 
        }
    };

    getRow(ticket) {
        const ticketRowNumber = ticket.slice(0, 7);
        let rows = Array.from(Array(128).keys());
        for (let letter of ticketRowNumber) {
            rows = letter === 'F' ? this.removeTop(rows) : this.removeBottom(rows)
        }
        return rows[0]
    };

    getColumn(ticket) {
        const ticketColumnNumber = ticket.slice(7); 
        let columns = Array.from(Array(8).keys());
        for (let letter of ticketColumnNumber) {
            columns = letter === 'L' ? this.removeTop(columns) : this.removeBottom(columns)
        }
        return columns[0]
    };

    removeTop(array) {
        return array.slice(0, array.length / 2)
    };

    removeBottom(array) {
        return array.slice(array.length / 2)
    };

    answerPart1() {
        const parsedTickets = this.tickets.map(t => this.parseTicket(t));
        return parsedTickets.reduce((max, next) => {
            return next.seatId > max ? next.seatId : max
        }, 0)
    };

    answerPart2() {
        const maxSeatId = this.answerPart1();
        const seats = Array.from(Array(maxSeatId).keys());
        const takenSeats = this.tickets.map(t => this.parseTicket(t).seatId);
        return seats.filter(s => !takenSeats.includes(s));
    }
}

// Part 1
const solver = new Solution(data);
console.log(`[Part 1] Max seatId is:`, solver.answerPart1())

// Part 2
console.log(`[Part 2] Missing seats are:`, solver.answerPart2())