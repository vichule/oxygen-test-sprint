    const {Room, Booking} = require('./index.js')

    const roomTemplate = {name: 'Single', bookings: [], rate:100, discount: 10};
    const bookingTemplate = {name: 'Javi C.D', email: 'fakeemail@gmail.com'};

    const room = new Room({...roomTemplate})
    const roomA = new Room({...roomTemplate})
    const roomB = new Room({...roomTemplate})
    const roomsList = [room,roomA,roomB]

    const bookingA = new Booking({...bookingTemplate, checkIn: '2024-10-10', checkOut:'2024-10-15', room})
    const bookingB = new Booking({...bookingTemplate, checkIn: '2024-10-15', checkOut:'2024-10-20', room})
    const bookingC = new Booking({...bookingTemplate, checkIn: '2024-10-20', checkOut:'2024-10-30', roomA})
    const bookingD = new Booking({...bookingTemplate, checkIn: '2024-06-12', checkOut:'2024-06-16', roomA})
    const bookingE = new Booking({...bookingTemplate, checkIn: '2024-08-01', checkOut:'2024-08-10', roomB})
    const bookingF = new Booking({...bookingTemplate, checkIn: '2024-08-10', checkOut:'2024-10-20', roomB})

    room.bookings = [bookingA, bookingB]
    roomA.bookings = [bookingC, bookingD]
    roomB.bookings = [bookingE, bookingF]
    
    describe('Rooms Occupancy', ()=>{

        test('Rooms is occupied inside range', () => {
            expect(room.isOccupied('2024-10-12')).toBeTruthy();
        });
    
        test('Rooms is occupied inside range', () => {
            expect(room.isOccupied('2024-10-19')).toBeTruthy();
        });
    
        test('Rooms is occupied outside range', () => {
            expect(room.isOccupied('2024-12-02')).toBeFalsy();
        });
    
        test('Rooms is occupied outside range', () => {
            expect(room.isOccupied('2024-09-02')).toBeFalsy();
        });
    
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
    
    
        test('Return correct total occupancy percentage for all rooms', () => {
            expect(Room.totalOccupancyPercentage(roomsList,'2024-08-01','2024-08-20')).toBe(100);
        });

        test('Return correct total occupancy percentage for all rooms', () => {
            expect(Room.totalOccupancyPercentage(roomsList,'2024-06-12','2024-06-19')).toBe(50);
        });

        test('Return correct total occupancy percentage for all rooms', () => {
            expect(Room.totalOccupancyPercentage(roomsList,'2024-06-10','2024-10-18')).toBe(70);
        });
    })

    describe('Rooms Availability', ()=>{
        
        test('Return available rooms between date1 & date2', () => {
            expect(Room.availableRooms()).toBe(3);
        });
    })


    describe('Fee Methods', ()=>{
        test('Return a total fee of for the booking: ', () => {
            expect(bookingA.getFee().toBe(100));
        });

        test('Return a total fee of for the booking: ', () => {
            expect(bookingC.getFee().toBe(50));
        });
    })




    

