import { BASE_URL } from "./Constants";
import axios from "axios";

const profile = {
    get: (userId) => axios.get(BASE_URL + '/profile/' + userId),
    post: (preference, role, priority) => axios.post(BASE_URL + '/profile', {
        preference: preference,
        role: role,
        priority: priority,
    }),
    put: (userId) => axios.put(BASE_URL + '/profile/' + userId),
}

const parking_lot = {
    get: (parkingLotId) => axios.get(BASE_URL + '/parking_lot/' + parkingLotId),
}

const parking_lots = {
    get: () => axios.get(BASE_URL + '/parking_lots'),
}

const area = {
    get: (areaId) => axios.get(BASE_URL + '/area/' + areaId),
}

const parking_spot = {
    get: (parkingSpotId) => axios.get(BASE_URL + '/parking_spot/' + parkingSpotId),
}

const reservation = {
    get: (reservationId) => axios.get(BASE_URL + '/reservation/' + reservationId),
    post: (userId, carId) => axios.post(BASE_URL + '/reservation', {
        user_id: userId,
        car_id: carId,
    }),
    delete: (reservationId) => axios.delete(BASE_URL + '/reservation/' + reservationId),
}

const my_car = {
    get: (userId) => axios.get(BASE_URL + '/my_car/' + userId),
}

const user_status = {
    get: (userId) => axios.get(BASE_URL + '/user_status/' + userId),
}

export const API = {
    profile: profile,
    parking_lot: parking_lot,
    parking_lots: parking_lots,
    area: area,
    parking_spot: parking_spot,
    reservation: reservation,
    my_car: my_car,
    user_status: user_status,
};
