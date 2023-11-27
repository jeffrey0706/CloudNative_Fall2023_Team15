## Build and Run Docker Container for MySQL Database
```
cd database
sudo docker build -f Dockerfile -t image_name .
sudo docker run --name container_name -it -p 3307:3306 image_name
```
## Run Backend Server
```
python setup.py install
python api/server.py
```

## Test API
1. use curl in command line
2. use PostMan 