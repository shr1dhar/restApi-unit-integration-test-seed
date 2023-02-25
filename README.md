# twitter clone using typescript
User & tweet endpoints are available.

<br>

### requirements
- docker & docker-compose
- ports: 3000 27017
- nodeJs 14.8 or above

<br>

### Instructions to run the app

1. To build the docker image, run the following command from root folder
`docker-compose build`

2. Start the docker using `docker-compose up`.

3. After mongodb is avilable through the container run `bash setup.sh` from the root folder.
You should see a prompt `Started at http://localhost:3000`

4. All the available endpoints, request & response parameters are availabe through swagger. Please Go to 
```
http://localhost:3000/docs/
```

<br>

### Test cases
To run them make sure the docker is running & the `setup.sh` script has completed.

1. run `yarn test:unit` from root folder
