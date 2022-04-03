# Northcoders News API

#### Check the app:
https://backend-project-news-api.herokuapp.com/api

<p>The purpose of this API is to access application data programmatically.
The intention is to mimic the building of a real world backend service which should provide this information to the front end architecture.</p>
<p>The users are able to sort, filter the articles based on topics, order by ASC or DESC, comment and vote on them.</p>
    
  <ul>
  <li>The api is build using TDD process </li>
  <li>The database is PSQL and will interact with it using node-postgress.</li>
  <li>There are two databases in this project. One for real looking dev data and another for simpler test data.</li>
  <li>The server application is built using Express</li>
  <li> The API implements MVC pattern</li>
  </ul>

### Dependencies used in this project
```
dotenv, express, pg, pg-format, jest, supertest
```
### CLONE THE REPO

```
git clone
cd <my folder>
```

### Install dependencies
```
npm install
```
### DOTENV
<p>Create two <strong>.env</strong> files locally in order to access the database</p>
<p>This will connect the databases.</p>

<ol>
  <li>.env.development should contain:</br>
      <code>
        PGDATABASE=nc_news
      </code>
    </li>
    <li>.env.test should contain:</br>
      <code>
        PGDATABASE=nc_news_test
      </code>
    </li>
</ol>

  ### SEED THE LOCAL DATABASE
  ```
  npm run setup-dbs
  npm run seed
  ```

  ### RUN TESTS
  ```
  npm test
  ```

  ### Server
  ```
  npm start
  ```

 ** You can make requests to the endpoints in the browser or in the applications such as Postman, Insomnia.

  ### Node & Postgres used in this project

  ```
  node -v | v17.5.0
  psql -V | 12.9
  ```




