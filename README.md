create .env file in root of the folder with the following parameters (standards filled in):

BASE_URL=localhost
PORT=8000
HOST=127.0.0.1
DB_USER=postgres
DB_PASSWORD=123456
DB_NAME=memorizer
DB_PORT=5432
SECRET=test

install nodemon:
npm i nodemon -g

install sequelize cli:
npm install --save-dev -g sequelize-cli

run migration:
sequelize db:migrate

to start backend server run in root:
nodemon

to start react app run in /client folder:
npm run start