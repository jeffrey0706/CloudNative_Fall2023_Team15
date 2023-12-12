// Testing constants, which shold be removed after backend is implemented
export const userId = 1;
export const reservationId = 1;
export const fakeLocations = [
    {
        parkinglot_id: 0,
        name: 'Parking Lot 2',
        current_capacity: 34,
        maximum_capacity: 70,
        priority: true,
    },
    {
        parkinglot_id: 1,
        name: 'Parking Lot 3',
        current_capacity: 32,
        maximum_capacity: 40,
    },
    {
        parkinglot_id: 2,
        name: 'Parking Lot 4',
        current_capacity: 30,
        maximum_capacity: 100,
    },
    {
        parkinglot_id: 3,
        name: 'Parking Lot 5',
        current_capacity: 28,
        maximum_capacity: 280,
        priority: true,
    },
    {
        parkinglot_id: 4,
        name: 'Parking Lot 6',
        current_capacity: 22,
        maximum_capacity: 75,
    },
    {
        parkinglot_id: 5,
        name: 'Parking Lot 7',
        current_capacity: 20,
        maximum_capacity: 30,
    },
    {
        parkinglot_id: 6,
        name: 'Parking Lot 8',
        current_capacity: 3,
        maximum_capacity: 100,
        priority: true,
    },
]
export const fakeMapCenter = {
    lat: 25.0330,
    lng: 121.5654
};
export const fakeLocationsCoordinate = [
    {
        name: 'Parking Lot 1',
        lat: 25.0330,
        lng: 121.6033,
        maximum_capacity: 60,
        current_capacity: 30,
    },
    {
        name: 'Parking Lot 3',
        lat: 25.0330,
        lng: 121.6233,
        maximum_capacity: 60,
        current_capacity: 56,
    },
    {
        name: 'Parking Lot 4',
        lat: 25.0330,
        lng: 121.6833,
        maximum_capacity: 60,
        current_capacity: 50,
    }
]
export const fakeAddress = "No. 8, Lixing 6th Road, East District, Hsinchu City 300"


// Testcase setup constants
export const API_PATTERNS = {
    MY_CAR: /my_car/,
    PARKING_LOTS: /parking_lots/,
    PROFILE: /profile/,
    RESERVATION: /reservation/,
    HISTORY: /history/,
    USER_STATUS: /user_status/,
};
export const getApiType = (url) => {
    for (const [key, value] of Object.entries(API_PATTERNS)) {
        if (value.test(url)) {
            return key;
        }
    }
    return undefined;
};

// Production constants, which may still need to be changed
export const BASE_URL = 'http://localhost:5000';