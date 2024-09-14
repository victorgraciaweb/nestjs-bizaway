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

## Production build

1. Build
```
yarn build
```

2. Run production
```
yarn start:prod
```

## Stack usado
* MongoDB
* Nest
* Docker
