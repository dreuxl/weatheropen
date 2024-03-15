// @ts-check

import { test, expect } from '@playwright/test';
import { WeatherResultsPage } from '../pageObject/weatherResults.page';

const weatherAPI = require('../api/weatherapi');
const utils = require('../libs/utils');
const { VARIANCE } = require('../libs/constants');

test('search City - PageObject', async ({ page }) => {
  const resultPage = new WeatherResultsPage(page);

  await resultPage.goto();
  await resultPage.searchCity('San Francisco');

  let temprealUI = await resultPage.getTempReal();
  let tempfeelUI = await resultPage.getTempFeel();

  if (tempfeelUI) { tempfeelUI = tempfeelUI.match(/-*\d+/g); }
  if (temprealUI) { temprealUI = temprealUI.match(/-*\d+/g); }

  const myRespAPI = await weatherAPI.dataAPI();
  const tempRealAPI = Math.round(utils.convertKtoF(myRespAPI.main.temp));
  const tempFeelsLikeAPI = Math.round(utils.convertKtoF(myRespAPI.main.feels_like));

  console.log('#############################');
  console.log('temp Real / temp Feel (F) from UI    => ', Number(temprealUI[0]), '/', Number(tempfeelUI[0]));
  console.log('temp Real (in K and F) from API      => ', myRespAPI.main.temp, '/', tempRealAPI);
  console.log('temp Feel (in K and F) from API      => ', myRespAPI.main.feels_like, '/', tempFeelsLikeAPI);
  console.log('#############################');

  const diffRealTemp = utils.checkVariance(Number(temprealUI[0]), tempRealAPI, VARIANCE);
  expect(diffRealTemp).toBeTruthy();

  const diffFeelTemp = utils.checkVariance(Number(tempfeelUI[0]), tempFeelsLikeAPI, VARIANCE);
  expect(diffFeelTemp).toBeTruthy();

  // let crazyTempDiff = utils.checkVariance(Number(40,70,DELTA_TEMP_ACCEPTABLE);
  // expect(crazyTempDiff).toBeTruthy();
});
