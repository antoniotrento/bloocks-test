//https://nodejs.dev/learn/modern-asynchronous-javascript-with-async-and-await
var currencyPath = 'data.rates.';
var storecurrency='USD'
var money=2015 // Amount of money to change
var api='https://api.coinbase.com/v2/exchange-rates?currency=USD';
var rounding = 'HALF_DOWN';
var convertedValue
var language
var country
var locale
var currency
var rate
var rates



function convert(value, priceclass) {
  function converter(amount, finalcurrency, basecurrency, apiendpoint, jsonPath, roundingType, rates) {
    var convertervalue = Dinero({ amount: amount })
      .convert(currency, {
        endpoint: new Promise(resolve => resolve(rates)),
        if(roundingType) {
          roundingMode: roundingType // The rounding mode to use: 'HALF_ODD', 'HALF_EVEN', 'HALF_UP', 'HALF_DOWN', 'HALF_TOWARDS_ZERO', 'HALF_AWAY_FROM_ZERO' or 'DOWN'
        }
      }).then(dinero => {
          return dinero.getAmount()
      })
      .catch(err => {
        // handle errors
      })
      return convertervalue
    }

  console.log('Valore var Value:' + value);
    if(document.cookie && document.cookie.match('language') && document.cookie.match('rate')){
        //   it is set, so no redirect
              language = Cookies.get('language');
              currency = Cookies.get('currency');
              country = Cookies.get('country'); 
              locale = Cookies.get('locale');
              rate = Cookies.get('rate');
              Dinero().setLocale(locale);
              rates = {
                  rates: {
                    [currency]: parseFloat([rate][0])
                  }
                }
            converter(value, currency, storecurrency, api, currencyPath, rounding, rates).then(result => {
              console.log('Valore Result:' + result);
            var number = Dinero({amount:result}).toRoundedUnit(2, rounding)
            var formatted= Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(number)
            convertedValue = formatted;
            console.log('Converterd Value:' + convertedValue);
            //document.querySelector(priceclass).innerHTML = convertedValue;
            var y = document.getElementsByClassName(priceclass);
            var x;
            for (x = 0; x < y.length; x++) {
              document.getElementsByClassName(priceclass)[x].innerHTML = convertedValue;
             
            }
          
          })
          
          }
          else{
              
              // The cookie is not set, so set it, and redirect
              // var userLang = navigator.language || navigator.userLanguage;
              // var langstring = userLang.split('-')[0];
              var navigatorLanguages = navigator.languages;
              var i=0;
              navigatorLanguages.forEach(function(item) {
                if (item.includes('-')){
                  if (i==0){
                    language = item.split('-')[0];
                    country = item.split('-')[1];
                    locale = item;
                    i=i+1;
                  // throw "Break";
                  }
                }
              });
              // var currency = Dinero({ currency: geoplugin_currencyCode() }).getCurrency();
              // var country = Dinero().setLocale(geoplugin_countryCode()).getLocale() 
              // var country = navigator.languages[1].split('-')[1];
              currency = countryToCurrency[ country ];
              
              async function ratefetch() {
        
              await fetch(api).then(response => {
                return response.json();
              }).then(data => {
                // Work with JSON data here
                
              console.log('dentro then');
                rate=data.data.rates[currency];
                Cookies.set('rate', rate, { expires: 365 });
                rates = {
                  rates: {
                    [currency]: parseFloat([rate][0])
                  }
                }
            converter(value, currency, storecurrency, api, currencyPath, rounding, rates).then(result => {
            var number = Dinero({amount:result}).toRoundedUnit(2, rounding)
            var formatted= Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(number)
            convertedValue = formatted;
            console.log('Converterd Value:' + convertedValue);
            //document.querySelector(priceclass).innerHTML = convertedValue;
            var y = document.getElementsByClassName(priceclass);
            var x;
            for (x = 0; x < y.length; x++) {
              document.getElementsByClassName(priceclass)[x].innerHTML = convertedValue;
             
            }
            
          })
              }).catch(err => {
                // Do something for an error here
              });
            }
            ratefetch();
              
              Cookies.set('language', language, { expires: 365 });
              Cookies.set('locale', locale, { expires: 365 });
              Cookies.set('currency', currency, { expires: 365 });
              Cookies.set('country', country, { expires: 365 });
             
          }
          return convertedValue
          /*return {
            price: convertedValue
            }*/
          
}


/*
const getratetest = async () => {
  const response = await fetch(api) // get users list
  const json = await response.json() // parse JSON
  const rate = json.data.rates[currency]
  
  Cookies.set('rate', rate, { expires: 365 });
  rates = {
    rates: {
      [currency]: parseFloat([rate][0])
    }
  }
  return rates
}*/

/*
https://stackoverflow.com/questions/65256680/how-to-set-a-js-variable-depending-on-the-duration-of-an-asynchronous-call

https://dmitripavlutin.com/javascript-fetch-async-await/


https://www.freecodecamp.org/news/async-await-javascript-tutorial/

async function fetchRate() {
  const response = await fetch('/movies');
  const movies = await response.json();
  return movies;
}

fetchMoviesJSON().then(movies => {
  movies; // fetched movies
});

*/



/*
const ratefetch = async () => {
  await fetch(api).then(response => {
    return response.json();
  }).then(data => {
    // Work with JSON data here
    
  console.log('dentro then');
    rate=data.data.rates[currency];
    Cookies.set('rate', rate, { expires: 365 });
    rates = {
      rates: {
        [currency]: parseFloat([rate][0])
      }
    }
  }).catch(err => {
    // Do something for an error here
  });
  return rates
}

const converter = (amount, finalcurrency, basecurrency, apiendpoint, jsonPath, roundingType, rates) => {
  var convertervalue = Dinero({ amount: amount })
  .convert(currency, {
    endpoint: new Promise(resolve => resolve(rates)),
    if(roundingType) {
      roundingMode: roundingType // The rounding mode to use: 'HALF_ODD', 'HALF_EVEN', 'HALF_UP', 'HALF_DOWN', 'HALF_TOWARDS_ZERO', 'HALF_AWAY_FROM_ZERO' or 'DOWN'
    }
  }).then(dinero => {
      return dinero.getAmount()
  })
  .catch(err => {
    // handle errors
  })
  return convertervalue
}


if(document.cookie && document.cookie.match('language') && document.cookie.match('rate')){
}
else {
  await
}



const promiseToDoSomething = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve('I did something'), 10000)
  })
}

const watchOverSomeoneDoingSomething = async () => {
  const something = await promiseToDoSomething()
  return something + '\nand I watched'
}

const watchOverSomeoneWatchingSomeoneDoingSomething = async () => {
  const something = await watchOverSomeoneDoingSomething()
  return something + '\nand I watched as well'
}

watchOverSomeoneWatchingSomeoneDoingSomething().then(res => {
  console.log(res)
})


*/


/*




function converter(amount, finalcurrency, basecurrency, apiendpoint, jsonPath, roundingType, currencyrates) {
  console.log('dentro converter, valore amount' + amount);
  var convertervalue = Dinero({ amount: amount })
    .convert(currency, {
      endpoint: new Promise(resolve => resolve(currencyrates)),
      if(roundingType) {
        roundingMode: roundingType // The rounding mode to use: 'HALF_ODD', 'HALF_EVEN', 'HALF_UP', 'HALF_DOWN', 'HALF_TOWARDS_ZERO', 'HALF_AWAY_FROM_ZERO' or 'DOWN'
      }
    }).then(dinero => {
        return dinero.getAmount()
    })
    .catch(err => {
      // handle errors
    })
    return convertervalue
  }

async function ratefetch() {
  await fetch(api).then(response => {
    return response.json();
  }).then(data => {
    // Work with JSON data here
    
  console.log('dentro then');
  console.log(' alore api' + api);
  console.log('rate value' + data.data);
    rate=data.data.rates[currency];
    Cookies.set('rate', rate, { expires: 365 });
    rates = {
      rates: {
        [currency]: parseFloat([rate][0])
      }
    }
  }).catch(err => {
    // Do something for an error here
  });
}


async function setcookie(){
  if(document.cookie && document.cookie.match('language') && document.cookie.match('rate')){
    var language = Cookies.get('language');
    var currency = Cookies.get('currency');
    var country = Cookies.get('country'); 
    var locale = Cookies.get('locale');
    var rate = Cookies.get('rate');
    Dinero().setLocale(locale);
    rates = {
        rates: {
          [currency]: parseFloat([rate][0])
        }
      }
  }
  else{
    var navigatorLanguages = navigator.languages;
    var i=0;
    navigatorLanguages.forEach(function(item) {
      if (item.includes('-')){
        if (i==0){
          language = item.split('-')[0];
          country = item.split('-')[1];
          locale = item;
          i=i+1;
        // throw "Break";
        }
      }
    });
    // var currency = Dinero({ currency: geoplugin_currencyCode() }).getCurrency();
    // var country = Dinero().setLocale(geoplugin_countryCode()).getLocale() 
    // var country = navigator.languages[1].split('-')[1];
    currency = countryToCurrency[ country ];
    await ratefetch();
      
    Cookies.set('language', language, { expires: 365 });
    Cookies.set('locale', locale, { expires: 365 });
    Cookies.set('currency', currency, { expires: 365 });
    Cookies.set('country', country, { expires: 365 });
  
  }

}



async function convertit(value){
  console.log('Prima di setcookie value:' + value);
  await setcookie();
      
    converter(value, currency, storecurrency, api, currencyPath, rounding, rates).then(result => {
      
      console.log('Result value:' + result + 'Value:' + value);
      var number = Dinero({amount:result}).toRoundedUnit(2, rounding)
      var formatted= Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(number)
      convertedValue = formatted;
      console.log('Converterd Value:' + convertedValue);
      
    })

  return convertedValue
}




*/

/*



async function convertit(value){
  
function converter(amount, finalcurrency, basecurrency, apiendpoint, jsonPath, roundingType, currencyrates) {
  console.log('dentro converter, valore amount' + amount);
  var convertervalue = Dinero({ amount: amount })
    .convert(currency, {
      endpoint: new Promise(resolve => resolve(currencyrates)),
      if(roundingType) {
        roundingMode: roundingType // The rounding mode to use: 'HALF_ODD', 'HALF_EVEN', 'HALF_UP', 'HALF_DOWN', 'HALF_TOWARDS_ZERO', 'HALF_AWAY_FROM_ZERO' or 'DOWN'
      }
    }).then(dinero => {
        return dinero.getAmount()
    })
    .catch(err => {
      // handle errors
    })
    return convertervalue
  }

async function ratefetch() {
  await fetch(api).then(response => {
    return response.json();
  }).then(data => {
    // Work with JSON data here
    
  console.log('dentro then');
  console.log(' alore api' + api);
  console.log('rate value' + data.data);
    rate=data.data.rates[currency];
    Cookies.set('rate', rate, { expires: 365 });
    rates = {
      rates: {
        [currency]: parseFloat([rate][0])
      }
    }
  }).catch(err => {
    // Do something for an error here
  });
}
async function setcookie(){
  if(document.cookie && document.cookie.match('language') && document.cookie.match('rate')){
    var language = Cookies.get('language');
    var currency = Cookies.get('currency');
    var country = Cookies.get('country'); 
    var locale = Cookies.get('locale');
    var rate = Cookies.get('rate');
    Dinero().setLocale(locale);
    rates = {
        rates: {
          [currency]: parseFloat([rate][0])
        }
      }
  }
  else{
    var navigatorLanguages = navigator.languages;
    var i=0;
    navigatorLanguages.forEach(function(item) {
      if (item.includes('-')){
        if (i==0){
          language = item.split('-')[0];
          country = item.split('-')[1];
          locale = item;
          i=i+1;
        // throw "Break";
        }
      }
    });
    // var currency = Dinero({ currency: geoplugin_currencyCode() }).getCurrency();
    // var country = Dinero().setLocale(geoplugin_countryCode()).getLocale() 
    // var country = navigator.languages[1].split('-')[1];
    currency = countryToCurrency[ country ];
    await ratefetch();
      
    Cookies.set('language', language, { expires: 365 });
    Cookies.set('locale', locale, { expires: 365 });
    Cookies.set('currency', currency, { expires: 365 });
    Cookies.set('country', country, { expires: 365 });
  
  }

}
  console.log('Prima di setcookie value:' + value);
  await setcookie();
      
    converter(value, currency, storecurrency, api, currencyPath, rounding, rates).then(result => {
      
      console.log('Result value:' + result + 'Value:' + value);
      var number = Dinero({amount:result}).toRoundedUnit(2, rounding)
      var formatted= Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(number)
      convertedValue = formatted;
      console.log('Converterd Value:' + convertedValue);
      
    })

  return convertedValue
}

*/