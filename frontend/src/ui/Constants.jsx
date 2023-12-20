// Testing constants, which shold be removed after backend is implemented
export const userId = 1;
export const reservationId = 1; // It should be carId
export const fakeLocations = [
    {
        parkinglot_id: 0,
        name: 'Parking Lot 2',
        longitude: 122.1,  
        latitude: 25.1,  
        current_capacity: 34,
        maximum_capacity: 70,
        current_handicap_capacity: 2,  
        maximum_handicap_capacity: 5,
    },
    {
        parkinglot_id: 1,
        name: 'Parking Lot 3',
        longitude: 122.1,  
        latitude: 25.1,  
        current_capacity: 32,
        maximum_capacity: 40,
        current_handicap_capacity: 2,  
        maximum_handicap_capacity: 5,
    },
    {
        parkinglot_id: 2,
        name: 'Parking Lot 4',
        longitude: 122.1,  
        latitude: 25.1,  
        current_capacity: 30,
        maximum_capacity: 100,
        current_handicap_capacity: 2,  
        maximum_handicap_capacity: 5,
    },
    {
        parkinglot_id: 3,
        name: 'Parking Lot 5',
        longitude: 122.1,  
        latitude: 25.1,  
        current_capacity: 28,
        maximum_capacity: 280,
        current_handicap_capacity: 2,  
        maximum_handicap_capacity: 5,
    },
    {
        parkinglot_id: 4,
        name: 'Parking Lot 6',
        longitude: 122.1,  
        latitude: 25.1,  
        current_capacity: 22,
        maximum_capacity: 75,
        current_handicap_capacity: 2,  
        maximum_handicap_capacity: 5,
    },
    {
        parkinglot_id: 5,
        name: 'Parking Lot 7',
        current_capacity: 20,
        maximum_capacity: 30,
        current_handicap_capacity: 2,  
        maximum_handicap_capacity: 5,
    },
    {
        parkinglot_id: 6,
        name: 'Parking Lot 8',
        current_capacity: 3,
        maximum_capacity: 100,
        current_handicap_capacity: 0,  
        maximum_handicap_capacity: 0,
    },
]
export const fakeMapCenter = {
    lat: 24.77330624179132,
    lng: 121.01276808736742
};
export const fakeLocationsCoordinate = [
    {
        name: 'Parking Lot 1',
        lat: 24.767768461439623,
        lng: 121.01101130255014,
        maximum_capacity: 60,
        current_capacity: 30,
    },
    {
        name: 'Parking Lot 3',
        lat: 24.766365616228974,
        lng: 121.00877970463625,
        maximum_capacity: 60,
        current_capacity: 56,
    },
    {
        name: 'Parking Lot 4',
        lat: 24.773691410943822,
        lng: 120.9968492388658,
        maximum_capacity: 60,
        current_capacity: 50,
    }
]
export const fakeAddress = "No. 8, Lixing 6th Road, East District, Hsinchu City 300"
export const fakeApiKey = 'fakeApiKey';
export const fakeHistory = [
    {
        car_plate: 'ABC-1234',
        employee_id: 1,
        start_time: '2023-12-01 12:00:00',
        end_time: '2023-12-01 18:00:00',
    }]

export const fakeGuardAnalysisData = [
    Array.from({ length: 9 }, () => Math.floor(50 + Math.random() * 50)),
    Array.from({ length: 9 }, () => Math.floor(40 + Math.random() * 40)),
    Array.from({ length: 9 }, () => Math.floor(20 + Math.random() * 30)),
    Array.from({ length: 9 }, () => Math.floor(10 + Math.random() * 20))
]

// Testcase setup constants
export const API_PATTERNS = {
    LOGIN: /login/,
    MY_CAR: /mycar/,
    PARKING_LOTS: /parkinglots/,
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

export const UserStatusTransfer = (code) =>  {
    switch (code) {
        case 1: 
            return "RESERVED";
        case 2:
            return "PARKED";
        case 3:
            return "EXPIRED";
        default:
            return "NONE";
    }
}

// Production constants, which may still need to be changed
export const BASE_URL = 'http://localhost:5000';
// export const BASE_URL = 'https://cloudnativefuncv1.azurewebsites.net';