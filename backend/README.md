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