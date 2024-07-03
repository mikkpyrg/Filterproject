# Filter project
## FE
Made in React. Made the most simplest I could, while still keeping some semblence of UI
### Instructions
```console
cd FE
npm i
npm start
```
### TODO, to raise the quality to work level
- should probably use typescript and use actual models
- add .env to gitignore. Currently more convinient for reviewer
- create proper components, though it was fun building things out of default html elements
- use scss or other preprocessors
- make it look pretty
- loader spinner
- some validation plugin
- proper API exception handling
- proper API response handling, giving users a proper response, that something happened
- config to keep all the API URLs

## BE
Java, Spring boot, in memory h2 db, lombok
### TODO, if I knew what I was doing
- for repositories use async pattern, interface them, dependency inject them, JpaRepository probably has some weird lazy loading going on and who knows what else
- for validation use some product (i.e. fluentvalidation) or java specific pattern to either move it to somewhere else as a configuration or just make it more readable
- for response and exceptions figure out a standard pattern, how to send proper info to the FE
- tests
- handle enums in db as human readable strings for the sake of admins
- proper null handling with entities, currently using lombok, so going the easiest way out
- data sanitization, i.e. when amount not used, because type is date, then set amount null, also probably trim or something for strings
- put business logic somewhere outside the controller, probably support single responsibility pattern
- use dtos
- paging
- probably there's a bug with date format vs localization, I.E. USA will get another date then Estonia. Should properly use UTC or just the date part
- cross origin to be moved to a proper config location, shouldn't be on top of controller
- no clue why import.sql(insert data on db create) doesn't support multiline query (single query has to be on a single lien). And it only works with create or dropAndCreate DB init, so no update schema
- after create,update,update, returning modified model instead of getting new from db, cuz cache doesn't recognize child deletes and inserts. Probably just using ORM wrong
