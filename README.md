# Weather Open API Vs Weather UI
* This exercise is to check UI &amp; API temparature sync for a same location
* For this exercise the test framework used is Playwright 

## Installation 
* This is a node.js project. Here, We assume that node & npm are installed on your local env
* install

`npm i `

## Running tests
How to run tests?

* First, for weather API call, API_KEY needs to be set/replaced with your **own API_KEY** in `libs/constants.ts`
* The Playwright Documentation is [here](https://playwright.dev/docs/running-tests) to help.
* Couple of the CLI, I used most:
  * run against Chromium with `headed` mode on to see the user flow within the browser

```
npx playwright test --project chromium --headed
```
  * adding the debug mode (step by step)

```
npx playwright test --project chromium --headed --debug
```

## Variances case
* The 2 temperatures data used to chek that comparison between UI & API are the Real Temperature & the Feel Temperature of the day.
* Rule is for each of those 2 temperatures;
  * (If the difference between the UI Temp and the API temp. (In °F) is > VARIANCE) => throw an error
  * (If the difference between the UI Temp and the API temp. (In °F) is <= VARIANCE) =>  give a pass

* the VARIANCE value can be modified in `libs/constants.ts` file (default val = 2)

### gists of output example

* not in VARIANCE range: https://gist.github.com/dreuxl/cfb01017a35ec132b099969a4b1ab77e
* in VARIANCE range: https://gist.github.com/dreuxl/ff257a50f7c51942cf090e03a18111b1

## spec files description

* `tests/search-city.spec.ts` is all inline and with mostly no `expect`
* `tests/searchPO-city.spec.ts` is using the PageObject concept and contains the VARIANCE case.









