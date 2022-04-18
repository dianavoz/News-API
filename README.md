# NEWS API

### CHECK THE API ON HEROKU
https://backend-project-news-api.herokuapp.com/api

<p>The purpose of this API is to access application data programmatically.</br>
The intention is to mimic the building of a real world backend service which should provide this information to the front end architecture.</p>
<p>The users are able to sort, filter the articles based on topics, order by ASC or DESC, comment and vote on them.</p>

### TECHNOLOGIES AND DEPENDENCIES

<ul>
<li>TDD process using Supertest</li>
<li>PSQL database and node-postgress to interact with it.</br>

 >  *_You will find a test and a development database in this project.One for real looking dev data and another for simpler test data._*
</li>
<li>The server application is built using Express</li>
<li> The API implements MVC pattern</li>
<li> Dependencies: </br>

```
dotenv, express, pg, pg-format, jest, supertest
```
</li>
</ul>


### TO START THE PROJECT:
<ol>
    <li>CLONE THE REPO </br>

```
git clone
cd <my folder>
```
</li>

<li>INSTALL DEPENDENCIES</br>

```
npm install
```
</li>
<li> DOTENV </br>
    <p>Create two <strong>.env</strong> files locally in order to access the database</br>
    This will connect the databases.</p>
</li>

<ul>
<li>.env.development should contain:</br>

```
PGDATABASE=nc_news
```
</li>
<li>.env.test should contain:</br>

```
PGDATABASE=nc_news_test
```

</li>
</ul>
<li>SEED THE LOCAL DATABASE </br>
  The package.json file contains the script

  ```
  "seed": "node ./db/seeds/run-seed.js"
  ```
  You can run this script by using:

  ```
  npm run seed
  ```

</li>

<li>RUN TESTS </br>

```
npm test
```
</li>

<li>SERVER </br>

```
npm start
```
>  **_NOTE:_**  Postman, Insomnia can be used to test REST Clients and make sample API calls.
</li>

<li>Node.js and Postgres </br>
This project was created using:</p>

```
node -v | v17.5.0
psql -V | 12.9
```
</li>
</ol>




