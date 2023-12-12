## Build and Run Docker Container for MySQL Database
```
cd database
sudo docker build -f Dockerfile -t image_name .
sudo docker run --name container_name -it -p 3307:3306 image_name
```
## Run Backend Server
```
python main.py
```

## Test API
1. use curl in command line
2. use PostMan 

## Unittest
```
export FLASK_APP=main.py
flask test
```

## API Spec

### Profile

```js
GET: /profile/{user_id}
{
    'id': int,
    'preference_lot_id': int,
    'preference_lot_name': string,
    'preference_area_id': int,
    'preference_area_name': string,
    'role': string,
    'priority': string,
    'expired': timestamp,
}
// Error code
404: Profile not found
503: Duplicate uuid, please check database

PUT: /profile/{user_id}
// request
{
    'preference': string,
    'role': string,
    'priority': string,
    'expired': timestamp, (optional)
}
// response
{
    'id': int,
    'preference': string,
    'role': string,
    'priority': string,
    'expired': timestamp,
}
// Error code
400: expired time should be in `%Y-%m-%d %H:%M:%S` format
404: Profile not found
503: Duplicate uuid, please check database

POST: /profile
// request
{
    'preference': string,
    'role': string,
    'priority': string,
    'expired': timestamp, (optional)
}
// response
{
    id: int,
}
// Error code
400: expired time should be in `%Y-%m-%d %H:%M:%S` format
503: Failed to create new profile
```

### Parking Lots

```js
GET: /parking_lots
[
    {
        parkinglot_id: int,
        name: string,
        current_capacity: int,
        maximum_capacity: int,
        current_handicap_capacity: int,
        maximum_handicap_capacity: int,
    }
]
```

### Reservation

```js
GET: /reservation/{car_id}
{
    car_id: int,
    parking_spot_number: int,
    area_name: string,
    area_floor: int,
    parking_lot_name: string,
    reservation_time: datetime,
    expired_time: datetime, 
}
// Error code
404: Car or Reservation not found

DELETE: /reservation/{car_id}
{
    message: string,
}
// Error code
404: Car or Reservation not found
503: Failed to delete reservation

POST: /reservation
// request
{
    car_id: int,
    parking_spot_id: int,
}
// response
{
    reservation_id: int,
}
// Error code:
400: Missing required parameter: 'car_id' or 'parking_spot_id'
503: Failed to create new reservation
```

### My Car

```js
GET: /mycar/{user_id}
{
    car_id: int,
    parking_spot_number: int,
    area_name: string,
    area_floor: int,
    parking_lot_name: string,
    start_time: datetime,
}
// Error code
200: Car not parked
404: User not found or This user does not have a car
```

### User Status
```js
GET: /user_status/{user_id}
{
    status: string, // NONE(0), RESERVED(1), PARKED(2), EXPIRED(3)
}
// Error code
404: User not found or This user does not have a car
```

### Spot History
```js
GET /history/{spot_id}
[
    {
        type: string,       // ATTENDANCE, RECORD
        user_id: int,
        license: string,
        start_time: datetime,
        end_time: datetime,
    }
]
// Error code
404: spot id does not exist
503: length of cars is not same as length records
```