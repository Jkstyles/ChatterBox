let Message = require('./message.js')

// let message = new Message()
// console.log(message)

module.exports = class Room {
    constructor(id, name) {
        let messages;
        messages = []
        // console.log(messages)
        let regEx = /[A-Z\-\s]/

        if (!id) {
            throw "room id required"

        } else if (id.match(regEx)) {
            throw 'room id must contain only lowercase letters'
        } else {
            this.id = id;
            this.name = name || id.charAt(0).toUpperCase() + id.slice(1);
        }
        this.messages = []

    }

    messageCount() {
        return this.messages.length
    }
    sendMessage(message) {
        this.messages.push(message)
    }
    messagesSince(sinceTime) {
        return this.messages.filter(message => message.when > sinceTime)
    }
}