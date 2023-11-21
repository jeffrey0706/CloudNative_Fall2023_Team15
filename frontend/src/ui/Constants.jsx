// Testing constants, which shold be removed after backend is implemented
export const userId = 1;
export const reservationId = 1;

// Production constants, which may still need to be changed
export const BASE_URL = 'http://localhost:5000';
export const API_PATTERNS = {
    PROFILE: /profile/,
    PARKING_LOT: /parking_lot[^s]/,
    PARKING_LOTS: /parking_lots/,
    AREA: /area/,
    PARKING_SPOT: /parking_spot/,
    RESERVATION: /reservation/,
    MY_CAR: /my_car/,
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