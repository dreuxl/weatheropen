# weatheropen
exercise to check UI &amp; API temparature sync for a same location
For this ercise, the test framework used is Playwright 

Objective:
1) get 



## installation 
this is a node.js project install 

`npm i `

## running tests
how to run tests?

* First, weather API call, need to set/replace with your API_KEY your **own API_KEY** in `libs/constants.ts`

The Playwright Documentation is here to help : https://playwright.dev/docs/running-tests
Couple of the CLI, I used most:

* run against Chromium with `headed` mode on to see the user flow within the browser

```
npx playwright test --project chromium --headed
```
* adding the debug mode (step by step)
```
npx playwright test --project chromium --headed --debug
```

## Variance case
* The 2 temperature datas used to chek that comparison between UI & API are the Real Temperature & the Feel Temperature of the day.
* Rule is for each of those 2 temperatures;
** (If the difference between the UI Temp and the API temp. (In °F) is > VARIANCE) => throw an error
** (If the difference between the UI Temp and the API temp. (In °F) is <= VARIANCE) =>  give a pass

* the VARIANCE value can be modified in `libs/constants.ts` file (default val = 2)

## specs file description

* `tests/search-city.spec.ts` is all inline and with mostly no `expect`
* `tests/searchPO-city.spec.ts` is using the PageObject concept and contains the VARIANCE case.









