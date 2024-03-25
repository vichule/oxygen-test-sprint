interface RoomInterface {
    name: string
    bookings: Booking[] | null
    rate: number
    discount: number
}

export class Room implements RoomInterface{
    name: string
    bookings: Booking[] | null
    rate: number
    discount: number

    constructor({name, bookings, rate, discount}:RoomInterface){
        this.name = name
        this.bookings = bookings
        this.rate = rate
        this.discount = discount
    }
}

interface BookingInterface {
    name: string
    email: string
    checkIn: string
    checkOut: string
    discount: number
    room: Room | null
}

export class Booking implements BookingInterface{
    name: string
    email:string
    checkIn: string
    checkOut: string
    discount: number
    room: Room | null

    constructor({name, email, checkIn, checkOut, discount, room}: BookingInterface){
        this.name = name
        this.email = email
        this.checkIn = checkIn
        this.checkOut = checkOut
        this.discount = discount
        this.room = room
    }
}