# Northcoders News API

### Check the app on Heroku:
https://backend-project-news-api.herokuapp.com/api

<p>The purpose of this API is to access application data programmatically.</br>
The intention is to mimic the building of a real world backend service which should provide this information to the front end architecture.</p>
<p>The users are able to sort, filter the articles based on topics, order by ASC or DESC, comment and vote on them.</p>

<ul>
<li>The api is build using TDD process </li>
<li>The database is PSQL and will interact with it using node-postgress.</br>
There are two databases in this project. One for real looking dev data and another for simpler test data.
</li>
<li>The server application is built using Express</li>
<li> The API implements MVC pattern</li>
</ul>

### Dependencies used in this project
```
dotenv, express, pg, pg-format, jest, supertest
```
### TO USE THE PROJECT:
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

```
npm run setup-dbs
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
##### *** You can make requests to the endpoints in the browser or in the applications such as Postman, Insomnia.
</li>

<li>Node.js and Postgres </br>
This project was created using:</p>

```
node -v | v17.5.0
psql -V | 12.9
```
</li>
</ol>




