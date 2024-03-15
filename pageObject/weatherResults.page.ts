import { expect, type Locator, type Page } from '@playwright/test';

export class WeatherResultsPage {
  // readonly page: Page;
  // readonly inputSearch: Locator;
  // readonly resultSearch: Locator;
  // readonly tempReal: Locator;
  // readonly tempFeel: Locator;
  page: Page;
  inputSearch: Locator;
  resultSearch: Locator;
  tempReal: Locator;
  tempFeel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputSearch = page.locator('.search-input');
    this.resultSearch = page.locator('.results-container .search-result');
    this.tempReal = page.locator('.forecast-container .temp');
    this.tempFeel = page.locator('.forecast-container .real-feel');
  }

  async goto() {
    await this.page.goto('https://www.accuweather.com/');
  }

  async searchCity(cityName) {
    await this.inputSearch.pressSequentially(cityName, { delay: 50 });
    await this.resultSearch.first().click();
    await expect(this.page).toHaveURL(/en\/us\/san-francisco\/94103\/weather-forecast\/347629/);
  }

  async getTempReal() {
    await this.tempReal.textContent();
    await expect(this.tempReal).toContainText(/-*\d+/g);
    return await this.tempReal.textContent();
  }  
  async getTempFeel() {
    await this.tempFeel.textContent();
    await expect(this.tempFeel).toContainText(/-*\d+/g);
    return await this.tempFeel.textContent();
  }
}
