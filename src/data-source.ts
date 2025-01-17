import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

const dbConfig = {
  development: {
    type: 'sqlite',
    database: 'devDB.sqlite',
    entities: [User, Report],
    synchronize: false,
    migrations: ['src/migration_dev/*.js'],
  } as DataSourceOptions,
  test: {
    type: 'sqlite',
    database: 'testDB.sqlite',
    entities: [User, Report],
    synchronize: false,
    migrations: ['src/migration_dev/*.js'], // Because the DB type at both the `test` and `dev` environments were equal, we used the same directory for migration.
    migrationsRun: true,
  } as DataSourceOptions,
  production: {
    //#region DOCKER PRODUCTION
    // ****** -if you want to have production on docker use this configs.
    // ****** -docker command to create postgres on local docker: `docker run --name postgres -d --rm -e POSTGRES_USER=root -e POSTGRES_PASSWORD=mehdi -p 5432:5432 postgres -c ssl=on -c ssl_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem -c ssl_key_file=/etc/ssl/private/ssl-cert-snakeoil.key`

    // type: 'postgres',
    // host: 'localhost',
    // port: 5432,
    // migrations: ['src/migration_prod/*.js'],
    // migrationsRun: true,
    // entities: [User, Report],
    // ssl: {
    //   rejectUnauthorized: false,
    // },
    // username: 'root',
    // password: 'mehdi',

    //#endregion


    //#region HEROKU PRODUCTION
    // ****** -for deploying on heroku follow this instructions.
    // ****** -We are going to use the Heroku CLI to deploy our application.
    // ****** -Please follow the instructions here https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up to set up the Heroku CLI on your machine.
    // step01) Install `Heroku CLI` on your local machine.
    // step02) Open Terminal(CMD in windows) in the same root directory of the project.
    // step03) Type `heroku login` to log in.
    // step04) Type `heroku auth:whoami` to ensure that you have logged in correctly; it should return your email address.
    // step05) Type `heroku create` or `heroku create {your app name}` to create a new project on heroku, and it should return something like this=> "Creating app... done, ⬢ my-cv-heroku"
    // step06) Save the name of the created project in the previous step. In my case, it is "my-cv-heroku".
    // step07) Type `heroku addons:create heroku-postgresql:hobby-dev --app {enter project name}` to add postgresDB addon to created project on Heroku.
    //         In my case, it is `heroku addons:create heroku-postgresql:hobby-dev --app my-cv-heroku`.
    // step08) Type `heroku pg:credentials:url --app {enter project name}` to see created DB credentials.
    //         In my case, it is `heroku pg:credentials:url --app my-cv-heroku`
    // step09) Save the value of the Connection URL in step08 as "url" in the config below.
    // step10) run the command `npm run migration:prod:generate -name=MigrationName`.
    // step11) run the command `npm run migration:prod:run`.
    // step12) If you type the command `heroku pg:info --app {enter project name}`, you should see the number of the tables has been equal to 3.
    // step13) Copy the value of the "COOKIE_KEY" property in the ".production.env" file.
    // step14) Type `heroku config:set COOKIE_KEY={Paste the value that is copied in step 13} --app {enter project name}`
    //         In my case, it gets like this: "heroku config:set COOKIE_KEY=mehdip@r@st@r_prod --app my-cv-heroku"
    // step15) Type `heroku config:set NODE_ENV=production --app {enter project name}`
    //         In my case, it gets like this: "heroku config:set NODE_ENV=production --app my-cv-heroku" 
    // step16) Type `git add .`
    // step17) Type `git commit -m "pre production commit (updated)"` and then type `git push`
    // step18) Type `heroku git:remote --app {enter project name}`. 
    //         In my case, it gets like this: "heroku git:remote --app my-cv-heroku"
    // step19) Type `git push heroku master` to deploy and run our application. :)

    type: 'postgres',
    migrations: ['src/migration_prod/*.js'],
    migrationsRun: true,
    entities: [User, Report],
    ssl: {
      rejectUnauthorized: false,
    },
    // Put the saved value in step 09 as the "url" property value.
    url: 'postgres://njndqjdzjqidrn:edb189bb12111dc212cf0c88802b23bcba01eb272fae042b340b0f7e1a28e0d4@ec2-54-160-200-167.compute-1.amazonaws.com:5432/dbs6cleepjkkem',
    //#endregion
  } as DataSourceOptions,
};

export const AppDataSource = new DataSource(
  dbConfig[`${process.env.NODE_ENV}`],
);
