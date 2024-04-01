import calculateDiscount from "./helpers"

interface RoomInterface {
    name: string
    bookings: Booking[] 
    rate: number
    discount: number
}

export class Room implements RoomInterface{
    name: string
    bookings: Booking[] 
    rate: number
    discount: number

    constructor({name, bookings, rate, discount}:RoomInterface){
        this.name = name
        this.bookings = bookings
        this.rate = rate
        this.discount = discount
    }

    rateCentDiscount():number {
        return calculateDiscount(this.rate, this.discount)
        
    }
    
    

    isOccupied(date: string): boolean{
        if(isNaN(Date.parse(date))) throw new Error('Invalid Values');
        const dateTransformed = new Date(date).getTime();

        return this.bookings.some(booking => {
            const dateIn = new Date(booking.checkIn).getTime();
            const dateOut = new Date(booking.checkOut).getTime();
            return dateIn <= dateTransformed && dateOut > dateTransformed;
        });
       
    }
    occupancyPercentage(startDate: string, endDate: string): number{
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


    static totalOccupancyPercentage(rooms: Room[], startDate: string, endDate: string): number {
        let totalPercentage = 0
        rooms.forEach(room => {totalPercentage += room.occupancyPercentage(startDate,endDate)})
        return Math.round(totalPercentage)
    }

    static availableRooms(rooms: Room[], startDate: string, endDate: string): Room[]{
        const roomsAvailable = rooms.filter(room => (room.occupancyPercentage(startDate, endDate) === 0))
        return roomsAvailable

    }
}

interface BookingInterface {
    name: string
    email: string
    checkIn: string
    checkOut: string
    discount: number
    room: Room 
}

export class Booking implements BookingInterface{
    name: string
    email:string
    checkIn: string
    checkOut: string
    discount: number
    room: Room 

    constructor({name, email, checkIn, checkOut, discount, room}: BookingInterface){
        this.name = name
        this.email = email
        this.checkIn = checkIn
        this.checkOut = checkOut
        this.discount = discount
        this.room = room
    }

    getFee():number{
        const room = this.room
        const roomRate = calculateDiscount(room.rate, room.discount)
        const fixedDiscount = this.discount ? Math.max(0, this.discount) : 0
        return Math.round(roomRate - (roomRate * fixedDiscount / 100));
        
    }
}