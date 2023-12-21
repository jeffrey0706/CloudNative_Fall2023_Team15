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
export const fakeReservation = [
        { parkingLot: "F1", floor: 2, area: "A", spot: 3, license: "ABC-1234", overtime: "1d 3h 3m" },
        { parkingLot: "F2", floor: 1, area: "B", spot: 5, license: "DEF-5678", overtime: "2d 12h 45m" },
        { parkingLot: "F3", floor: 3, area: "C", spot: 2, license: "GHI-9012", overtime: "3d 6h 18m" },
        { parkingLot: "F4", floor: 2, area: "A", spot: 1, license: "JKL-3456", overtime: "4d 18h 59m" },
        { parkingLot: "F5", floor: 1, area: "B", spot: 4, license: "MNO-7890", overtime: "5d 9h 32m" },
        { parkingLot: "F6", floor: 3, area: "C", spot: 6, license: "PQR-1234", overtime: "6d 3h 5m" },
        { parkingLot: "F7", floor: 2, area: "A", spot: 2, license: "STU-5678", overtime: "7d 14h 48m" },
        { parkingLot: "F8", floor: 1, area: "B", spot: 3, license: "VWX-9012", overtime: "8d 8h 21m" },
        { parkingLot: "F9", floor: 3, area: "C", spot: 5, license: "YZA-3456", overtime: "9d 1h 54m" },
        { parkingLot: "F10", floor: 2, area: "A", spot: 4, license: "BCD-7890", overtime: "10d 17h 37m" },
        { parkingLot: "F11", floor: 1, area: "B", spot: 1, license: "EFG-1234", overtime: "11d 11h 10m" },
        { parkingLot: "F12", floor: 3, area: "C", spot: 3, license: "HIJ-5678", overtime: "12d 4h 43m" },
        { parkingLot: "F13", floor: 2, area: "A", spot: 6, license: "KLM-9012", overtime: "13d 22h 26m" },
        { parkingLot: "F14", floor: 1, area: "B", spot: 2, license: "NOP-3456", overtime: "14d 16h 59m" },
        { parkingLot: "F15", floor: 3, area: "C", spot: 4, license: "QRS-7890", overtime: "15d 9h 32m" },
    ];

export const allFakeGuardAnalysisData = [];

for (let i = 0; i < 10; i++) {
    let row = [];
    for (let j = 0; j < 4; j++) {
        let component = [
            Array.from({ length: 9 }, () => Math.floor(50 + Math.random() * 50)),
            Array.from({ length: 9 }, () => Math.floor(40 + Math.random() * 40)),
            Array.from({ length: 9 }, () => Math.floor(20 + Math.random() * 30)),
            Array.from({ length: 9 }, () => Math.floor(10 + Math.random() * 20))
        ]
        row.push(component);
    }
    allFakeGuardAnalysisData.push(row);
}


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

export const UserStatusTransfer = (code) => {
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
// export const BASE_URL = 'http://localhost:5000';
// export const BASE_URL = 'https://cloudnativefuncv1.azurewebsites.net';
export const BASE_URL = 'https://cloudnativefuncv1.azure-api.net/CloudNativeFuncV1';
