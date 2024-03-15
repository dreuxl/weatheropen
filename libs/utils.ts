/**
 * function convertKtoF
 *   to convert temperature from Kelvin(API) to F(from UI)
 */
module.exports.convertKtoF = function (temp) {
  return ((temp - 273.15) * 1.8 + 32);
};

/**
* function checkVariance
* @param {Number} tempUI temperature from UI
* @param {Number} tempApi temperature from API
* @param {Number} variance max diff accepted beteween temp
@ @param {Boolean} diffOK diff temperature acceptable
*/
module.exports.checkVariance = function (tempUI, tempApi, variance) {
  try {
    let diffOK = true;
    if (Math.abs(tempUI - tempApi) > variance) {
      console.log(
        '!!! Temp Difference => for temp ',
        Math.abs(tempUI - tempApi),
        ', Variance Acceptable =>', variance
      );
      diffOK = false;
      throw new RangeError('delta too big between UI & API temperatures');
    } else {
      console.log(
        'UI & API temperatures are in acceptable variance',
        variance, '/',
        tempUI, '/',
        tempApi
      );
    }
    return diffOK;
  } catch (e) {
    console.log(e);
  }
};
