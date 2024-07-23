## How to Use

This project use turbo repo for management implement with Nest.js

app location is in `apps/backend` just `cd apps/backend` 

if you want to run this servise with docker just following below

```bash

$ docker build -t restaurant-service:dev -f apps/backend/Dockerfile  .

$ docker run --publish 8080:8080 restaurant-service:dev
```