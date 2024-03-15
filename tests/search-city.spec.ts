// @ts-check

import { test, expect } from '@playwright/test';

const weatherAPI = require('../api/weatherapi');
const utils = require('../libs/utils');

let temprealUI;
let tempfeelUI;

test('search City - inline', async ({ page }) => {
  await page.goto('https://www.accuweather.com/');
  const input = page.locator('.search-input');
  await input.pressSequentially('San Francisco', { delay: 50 });
  await page.waitForSelector('.results-container .search-result');
  await page.click('.results-container .search-result');

  // Here, ensuring the redirect post search happened
  await expect(page).toHaveURL(/en\/us\/san-francisco\/94103\/weather-forecast\/347629/);

  const lctemp = page.locator('.forecast-container .temp');
  const lctempFeel = page.locator('.forecast-container .real-feel');

  temprealUI = await lctemp.textContent();
  tempfeelUI = await lctempFeel.textContent();

  tempfeelUI = tempfeelUI.match(/-*\d+/g);
  temprealUI = temprealUI.match(/-*\d+/g);

  console.log(
    'Inline: temp / temp RealFeel from UI =>  ',
    Number(temprealUI[0]), Number(tempfeelUI[0])
  );
});

test('API call temp city', async ({ request }) => {
  const myRespAPI = await weatherAPI.dataAPI();

  const tempRealAPI = Math.round(utils.convertKtoF(myRespAPI.main.temp));
  const tempFeelsLikeAPI = Math.round(utils.convertKtoF(myRespAPI.main.feels_like));

  console.log(
    'Inline: temp K /F from API ',
    myRespAPI.main.temp,
    tempRealAPI
  );
  console.log(
    'Inline: temp feel K/F from API',
    myRespAPI.main.feels_like,
    tempFeelsLikeAPI
  );
});
