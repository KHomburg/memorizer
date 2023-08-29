create .env file in root of the folder with the following parameters (standards filled in):

BASE_URL=localhost
PORT=8080
HOST=127.0.0.1
DB_USER=postgres
DB_PASSWORD=123456
DB_NAME=memorizer
DB_PORT=5432
SECRET=test
SENDER_MAIL=test@test.de

install nodemon:
`npm i nodemon -g`

install sequelize cli:
`npm install -g sequelize-cli`

run `npm install` in root folder and in /client

run migration:
`sequelize-cli db:migrate`

to start backend server run in root:
`nodemon`

to start react app run in /client folder:
`npm run start`


works on node v18.17.1

create default Docker postgres db:

docker run -d \
	--name memorizer-postgres \
  -d -p 5432:5432 \
	-e POSTGRES_PASSWORD=123456 \
	-e POSTGRES_USER=postgres \
  -e POSTGRES_DB=memorizer \
	postgres