## Tennis API
tennis application to find and challenge players

## Technologies
- NestJS
- RabbitMQ
- MongoDB
- Mongoose
- JWT
- AWS Cognito
- AWS S3
- AWS SES
- Docker
- Docker compose

## Installation

```bash
$ yarn install
```

## Copy .env.example for each microservice
```bash
# ms api gateway
$  cp apps/api/.env.example apps/api/.env 

# ms backoffice
$  cp apps/backoffice/.env.example apps/backoffice/.env 

# ms challenges
$  cp apps/challenges/.env.example apps/challenges/.env 

# ms notifications
$  cp apps/notifications/.env.example apps/notifications/.env 

# ms rankings
$  cp apps/rankings/.env.example apps/rankings/.env 
```


## Running the app with Docker

NOTE: in these environment variable change:
- RABBITMQ_URI=amqp://localhost:5672  => <code>amqp://rabbitmq:5672</code>
- MONGODB_URI=mongodb://localhost:27017/tennis  => <code>mongodb://mongo:27017/tennis</code>

change this in all environment variables of each microservice.

```bash
# run docker-compose.yml
$  docker compose up -d
```






## Running the app without Docker

```bash
# ms api gateway
$  yarn start:dev api

# ms backoffice
$  yarn start:dev backoffice 

# ms challenges
$  yarn start:dev challenges 

# ms notifications
$  yarn start:dev notifications 

# ms rankings
$  yarn start:dev rankings
```

NOTE: In the docker-compose.yml file comment the containers: 
- api
- backoffice
- challenges
- notifications
- rankings

```bash
# run docker-compose.yml
$  docker compose up -d
```
