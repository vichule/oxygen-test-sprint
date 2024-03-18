    const {Room, Booking} = require('./index.js')

    const roomTemplate = {name: 'roomA', bookings: [], rate:10, discount: 0};
    const bookingTemplate = {name: 'Javi C.D', email: 'fakeemail@gmail.com'};

    const room = new Room({...roomTemplate})
    const bookingA = new Booking({...bookingTemplate, checkIn: '2024-10-10', checkOut:'2024-10-15', room})
    const bookingB = new Booking({...bookingTemplate, checkIn: '2024-10-15', checkOut:'2024-10-20', room})
    const bookingC = new Booking({...bookingTemplate, checkIn: '2024-10-20', checkOut:'2024-10-30', room})
    room.bookings = [bookingA, bookingB, bookingC]


    test('Rooms is occupied inside range', () => {
        expect(room.isOccupied('2024-10-12')).toBeTruthy();
    });

    test('Rooms is occupied inside range', () => {
        expect(room.isOccupied('2024-10-20')).toBeTruthy();
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
        expect(room.occupancyPercentage('2024-11-30','2024-12-20')).toBe(0);
    });

    test('Return correct percentage of days within range of dates given', () => {
        expect(room.occupancyPercentage('2024-10-08','2024-10-11')).toBe(50);
    });



    test('Return correct total occupancy percentage for all rooms', () => {
        expect(Room.totalOccupancyPercentage()).toBeTruthy();
    });


    test('Return available rooms between date1 & date2', () => {
        expect(Room.availableRooms()).toBe(3);
    });



    test('Return a total fee of for the booking: ', () => {
        expect(booking.getFee().toBe(100));
    });

