const {Room, Booking} = require('./index.js')

const roomTemplate = {name: 'Single', bookings: [], rate:100};
const bookingTemplate = {name: 'Javi C.D', email: 'fakeemail@gmail.com'};

const room = new Room({...roomTemplate, discount: 10}) 
const roomA = new Room({...roomTemplate, discount: 5}) 
const roomB = new Room({...roomTemplate, discount: 25}) 

const bookingA = new Booking({...bookingTemplate, checkIn: '2024-10-10', checkOut:'2024-10-15',discount: 20,room: room}) 
const bookingB = new Booking({...bookingTemplate, checkIn: '2024-10-15', checkOut:'2024-10-20',discount: 10,room: room}) 
const bookingC = new Booking({...bookingTemplate, checkIn: '2024-10-20', checkOut:'2024-10-30',discount: 5,room: roomA})
const bookingD = new Booking({...bookingTemplate, checkIn: '2024-06-12', checkOut:'2024-06-16',discount: 10,room: roomA}) 
const bookingE = new Booking({...bookingTemplate, checkIn: '2024-08-01', checkOut:'2024-08-10',discount: 8,room: roomB}) 
const bookingF = new Booking({...bookingTemplate, checkIn: '2024-08-10', checkOut:'2024-08-20',discount: -1,room: roomB})

room.bookings = [bookingA, bookingB]
roomA.bookings = [bookingC, bookingD]
roomB.bookings = [bookingE, bookingF]

const roomsList = [room,roomA,roomB]

describe('Rooms Occupancy', ()=>{

    describe('isOccupied method', ()=>{
        test('Rooms is occupied inside range', () => {
            expect(room.isOccupied('2024-10-12')).toBe(true);
        });
    
        test('Rooms is occupied inside range', () => {
            expect(room.isOccupied('2024-10-19')).toBe(true);
        });
    
        test('Rooms is occupied outside range', () => {
            expect(room.isOccupied('2024-12-02')).toBe(false);
        });
    
        test('Rooms is occupied outside range', () => {
            expect(room.isOccupied('2024-09-02')).toBe(false);
        });
    })

    

    describe('occupancyPercentage method', ()=>{
        test('Return correct percentage of days within range of dates given', () => {
            expect(room.occupancyPercentage('2024-10-10','2024-10-15')).toBe(100);
        });
    
        test('Return correct percentage of days within range of dates given', () => {
            expect(roomA.occupancyPercentage('2024-10-20','2024-10-30')).toBe(100);
        });
    
        test('Return correct percentage of days within range of dates given', () => {
            expect(room.occupancyPercentage('2024-11-30','2024-12-20')).toBe(0);
        });
    
        test('Return correct percentage of days within range of dates given', () => {
            expect(room.occupancyPercentage('2024-10-08','2024-10-11')).toBe(50);
        });
    
        test('Return correct percentage of days within range of dates given', () => {
            expect(() => room.occupancyPercentage('2024-10-18','2024-10-11')).toThrow('Invalid Values. Start Date cant be greater than End Date');
        });
    
        test('Return correct percentage of days within range of dates given', () => {
            expect(() => room.occupancyPercentage('WRONG','2024-10-11')).toThrow('Invalid Values');
        });
    })
    
    describe('totalOccupancyPercentage method', ()=>{
        test('Return correct total occupancy percentage for all rooms', () => {
            expect(Room.totalOccupancyPercentage(roomsList,'2024-10-10','2024-10-30')).toBe(100);
        });

        test('Return correct total occupancy percentage for all rooms', () => {
            expect(Room.totalOccupancyPercentage(roomsList,'2024-06-12','2024-06-19')).toBe(50);
        });

        test('Return correct total occupancy percentage for all rooms', () => {
            expect(Room.totalOccupancyPercentage(roomsList,'2024-06-10','2024-10-18')).toBe(25);
        });

        test('Return correct total occupancy percentage for all rooms', () => {
            expect(() => Room.totalOccupancyPercentage(roomsList,'2025-06-10','2024-10-18')).toThrow('Invalid Values. Start Date cant be greater than End Date');
        });

        test('Return correct total occupancy percentage for all rooms', () => {
            expect(() => Room.totalOccupancyPercentage(roomsList,'WRONG','WRONG')).toThrow('Invalid Values');
        });
    })

    
})

describe('Rooms Availability', ()=>{

    test('Return available rooms between date1 & date2', () => {
        expect(Room.availableRooms(roomsList, '2024-05-01', '2024-05-09')).toMatchObject(roomsList);
    });

    test('Return available rooms between date1 & date2', () => {
        expect(Room.availableRooms(roomsList, '2024-10-10', '2024-10-15')).toMatchObject([roomA, roomB]);
    });

    test('Return available rooms between date1 & date2', () => {
        expect(Room.availableRooms(roomsList, '2024-06-12', '2024-08-20')).toMatchObject([room]);
    });

    test('Return available rooms between date1 & date2', () => {
        expect(Room.availableRooms(roomsList, '2024-01-12', '2024-12-16')).toMatchObject([]);
    });
})


describe('Fee Methods', ()=>{

    test('Returns the fee, including discounts on room and booking', () => {
        expect(bookingA.getFee()).toBe(7200);
        
    });

    test('Returns the fee, including discounts on room and booking', () => {
        expect(bookingD.getFee()).toBe(8550);
    });

    test('Returns the fee, including discounts on room and booking', () => {
        expect(bookingE.getFee()).toBe(6900);
    });

    test('Returns the fee, including discounts on room and booking', () => {
        expect(bookingF.getFee()).toBe(7500);
    });
})



    

