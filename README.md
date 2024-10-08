<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Bizaway

RESTful API with NestJS, TypeScript, Docker, and MongoDB, along with other libraries

## Development execution

1. Clone repository
```
git clone git@github.com:victorgraciaweb/nestjs-bizaway.git
```

2. Navigate folder project
```
cd nestjs-bizaway
```

3. Clone file ```.env.template``` and rename to ```
.env```

```
cp .env.template .env
```

4. Fill enviroment variables in ```.env```

5. Install dependencies
```
yarn install
```

6. Up Mongo Database
```
docker compose up -d
```

7. Up app in dev (watch mode):
```
yarn start:dev
```

8. Install Nest CLI (Optional)
```
npm i -g @nestjs/cli
```

## API Documentation

This project includes API documentation using Swagger. You can access it to explore the available endpoints and test them.

### Swagger URL

After starting the application, you can access the Swagger documentation at the following URL:

[http://localhost:3000/api/v1](http://localhost:3000/api/v1)

Make sure to replace `<PORT>` with the actual port defined in your `.env` file (e.g., `3000` if using the default port).

Swagger provides a convenient interface to view all available routes and schemas.

## Run Tests

To execute the tests, use the following commands (without and with coverage):

```
yarn test
```
```
yarn test:cov
```

## Production build

1. Build
```
yarn build
```

2. Run production
```
yarn start:prod
```

## Postman Collection

To test the API, you can use the provided Postman collection. It includes a set of predefined requests and examples for interacting with the API.

### How to Import

1. Open Postman.
2. Click on the "Import" button in the top left corner.
3. Choose the `Bizaway.postman_collection.json` file from the `postman` directory of the repository.
4. Click "Open" to import the collection.

### Collection Details

The collection includes requests for all major endpoints of the API and examples of different responses. You can use these requests to explore and test the API's functionality.

## Stack usado
* MongoDB
* Nest
* Docker
