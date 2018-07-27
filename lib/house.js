let Room = require('./room.js')

// let room = new Room(chatspot)

module.exports = class House {
    constructor() {
        this.allRooms = [];
        
    }
    
    roomWithId(roomName) {
        let roomFound = this.allRooms.find((room) => {
            return room.id === roomName;
        })
        if (roomFound) {
            return roomFound;
        } else {
            let newRoom = new Room(roomName);
            this.allRooms.push(newRoom);
            return newRoom;
        }
    }
    allRoomIds() {
       return this.allRooms.map(room => room.id);
    }
    sendMessageToRoom(id, options ={}){
        let room = this.roomWithId(id);
        room.messages.push(options);
    }


}