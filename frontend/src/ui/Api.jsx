import { BASE_URL } from "./Constants";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers['Access-Control-Allow-Credentials'] = 'true';

const my_car = {
    /**
     * @param {number} userId
     * 
     * @returns {Promise}
     *  data: {  
     *  * car_id: int,  
     *  * parking_spot_number: int,  
     *  * area_name: string,  
     *  * area_floor: int,  
     *  * parking_lot_name: string,  
     *  * start_time: datetime,  
     *  }
     */
    get: (userId) => axios.get(BASE_URL + '/mycar/' + userId, { crossdomain: true }),
}

const parking_lots = {
    /**
     * @returns {Promise}
     *  data: {  
     *  * parkinglot_id: int,  
     *  * name: string,  
     *  * current_capacity: int,  
     *  * maximum_capacity: int,  
     *  * priority: bool,
     *  }
     */
    get: () => axios.get(BASE_URL + '/parkinglots', { crossdomain: true }),
}

const profile = {
    /**
     * @param {number} userId
     * 
     * @returns {Promise}
     *  data: {  
     *  * id: int,  
     *  * preference_lot_id: int,  
     *  * preference_lot_name: string,  
     *  * preference_area_id: int,  
     *  * preference_area_name: string,  
     *  * preference: int,  
     *  * role: string,  
     *  * priority: string,  
     *  * expired: datetime,  
     *  }
     */
    get: (userId) => axios.get(BASE_URL + '/profile/' + userId, { crossDomain: true }),

    /**
     * @param {number} userId
     * @param {number} preference
     * @param {string} role
     * @param {string} priority
     * 
     * @returns {Promise}
     *  data: {  
     *  * id: int,  
     *  * preference: int,  
     *  * role: string,  
     *  * priority: string,  
     *  * expired: datetime,  
     *  }
     */
    put: (userId, preference, role, priority) => axios.put(
            BASE_URL + '/profile/' + userId,
            {
                preference: preference,
                role: role,
                priority: priority,
            },
            { crossdomain: true }
        ),
    
    /**
     * @param {number} userId
     * @param {number} preference
     * @param {string} role
     * @param {string} priority
     * 
     * @returns {Promise}
     *  data: {  
     *  * id: int,  
     *  * preference: int,  
     *  * role: string,  
     *  * priority: string,  
     *  * expired: datetime,  
     *  }
     */
    post: (userId, preference, role, priority) => axios.post(
            BASE_URL + '/profile/' + userId,
            {
                user_id: userId,
                preference: preference,
                role: role,
                priority: priority,
            },
            { crossdomain: true }
        ),
}

const reservation = {
    /**
     * @param {number} carId
     * 
     * @returns {Promise}
     *  data: {  
     *  * car_id: int,  
     *  * parking_spot_number: int,  
     *  * area_name: string,  
     *  * area_floor: int,  
     *  * parking_lot_name: string,  
     *  * reservation_time: datetime,  
     *  * expired_time: datetime,  
     *  }
     */
    get: (carId) => axios.get(BASE_URL + '/reservation/' + carId, { crossdomain: true }),

    /**
     * @param {number} carId
     * @param {number} parkingLotId
     * 
     * @returns {Promise}
     *  data: {  
     *  * reservation_id: int,  
     *  }
     */
    post: (carId, parkingLotId) => axios.post(
            BASE_URL + '/reservation',
            {
                car_id: carId,
                parking_lot_id: parkingLotId,
            },
            { crossdomain: true }
        ),
    
    /**
     * @param {number} carId
     * 
     * @returns {Promise}
     *  data: {  
     *  * message: string,  
     *  }
     */
    delete: (carId) => axios.delete(BASE_URL + '/reservation/' + carId, { crossdomain: true }),
}

const history = {
    /**
     * @param {number} spotId
     * 
     * @returns {Promise}
     *  data: {  
     *  * type: string,  
     *  * user_id: int,  
     *  * license: string,  
     *  * start_time: datetime,  
     *  * end_time: datetime,  
     *  }
     */
    get: (spotId) => axios.get(BASE_URL + '/history/' + spotId, { crossdomain: true }),
}

const user_status = {
    /**
     * @param {number} userId
     * 
     * @returns {Promise}
     *  data: {  
     *  * status: string,  
     *  }
     */
    get: (userId) => axios.get(BASE_URL + '/user_status/' + userId, { crossdomain: true }),
}

const login = {
    /**
     * @param {string} username
     * @param {string} password
     * 
     * @returns {Promise}
     *  data: {  
     *  * user_id: int,  
     *  }
     */
    post: (username, password) => axios.post(
        BASE_URL + '/login',
        {
            username: username,
            password: password,
        },
        { crossdomain: true }
    ),
}

const map = {
    /**
     * @param {number} parkinglot_id
     * @param {number} floor
     * 
     * @returns {Promise}
     * data: {
     *  * spot_id: int,
     *  * spot_number: int,
     *  * area_id: int, 
     *  * area_name: string,
     *  * status: int, //  EMPTY(0), OCCUPIED(1), APPROACHING(2), PARKED(3)
     * }
     */
    get: (parkinglot_id, floor) =>  axios.get(
        BASE_URL + '/map',
        { params: { parkinglot_id, floor }},
        { crossdomain: true }
    ),
}

export const API = {
    my_car: my_car,
    parking_lots: parking_lots,
    profile: profile,
    reservation: reservation,
    history: history,
    user_status: user_status,
    login: login,
    map: map,
};
