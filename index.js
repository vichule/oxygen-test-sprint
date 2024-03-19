class Room {

    constructor({name, bookings, rate, discount}){
        this.name = name
        this.bookings = bookings
        this.rate = rate
        this.discount = discount
    }

    isOccupied(date){
        // if(typeof(date) !== 'string') throw new Error('Invalid Values');
        if(isNaN(Date.parse(date))) throw new Error('Invalid Values');
        const dateTransformed = new Date(date).getTime();

        return this.bookings.some(booking => {
            const dateIn = new Date(booking.checkIn).getTime();
            const dateOut = new Date(booking.checkOut).getTime();
            return dateIn <= dateTransformed && dateOut > dateTransformed;
        });
       
    }
    occupancyPercentage(startDate, endDate){
        if((isNaN(Date.parse(startDate))) || (isNaN(Date.parse(endDate)))){
            throw new Error('Invalid Values');
        }
        if(Date.parse(startDate) > Date.parse(endDate)){
            throw new Error('Invalid Values. Start Date cant be greater than End Date');
        }

        const firstDate = new Date(startDate)
        const LastDate = new Date(endDate)
        let days = 0
        let daysOccupied = 0

        while(firstDate <= LastDate){
            days += 1
            if(this.isOccupied(firstDate.toString())){
                daysOccupied += 1
            }
            firstDate.setDate(firstDate.getDate()+1)
            
        }
        return Math.round((daysOccupied / days)* 100)

    }


    static totalOccupancyPercentage(rooms, startDate, endDate) {
        let totalPercentage = 0
        rooms.forEach(room => {totalPercentage += room.occupancyPercentage(startDate,endDate)})
        return Math.round(totalPercentage)
    }

    static availableRooms(rooms, startDate, endDate){
        const roomsAvailable = rooms.filter(room => {
            if(room.occupancyPercentage(startDate, endDate) > 0){
                return false
            }else{
                return true
            }
        })
        return roomsAvailable
    }
}

class Booking {
    constructor({name, email, checkIn, checkOut, discount, room}){
        this.name = name
        this.email = email
        this.checkIn = checkIn
        this.checkOut = checkOut
        this.discount = discount
        this.room = room
    }

    getFee(){

    }
}

module.exports = { Room, Booking}