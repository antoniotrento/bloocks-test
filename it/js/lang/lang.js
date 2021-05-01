//https://nodejs.dev/learn/modern-asynchronous-javascript-with-async-and-await
var currencyPath = 'data.rates.';
//var storecurrency='USD'
var storecurrency='USD'
//var api='https://api.coinbase.com/v2/exchange-rates?currency=USD';
var api='https://api.coinbase.com/v2/exchange-rates?currency=USD';
var rounding = 'HALF_DOWN';
var convertedValue
var language
var country
var locale
var currency
var rate
var rates

var defvalue

function getcookielang() {
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

 }

 function converter(amount, finalcurrency, basecurrency, apiendpoint, jsonPath, roundingType, rates) {
   
  defvalue = Dinero({amount:amount}).toRoundedUnit(2, rounding)
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
    return rate
  }).catch(err => {
    // Do something for an error here
  });
}

async function convert(value, priceclass, buttonclass) {
        
  await getlanguage().then(response => {
    
  console.log('dentro return rate value: '+rate);
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
    var y = document.getElementsByClassName(buttonclass);
    for (x = 0; x < y.length; x++) {
    document.getElementsByClassName(buttonclass)[x].setAttribute('data-item-price', '{"'+storecurrency.toLowerCase()+'": '+defvalue+', "'+currency.toLowerCase()+'": '+number+'}')
    }
    
  })
    return response;
  });
}

async function printrate() {
        
  await getlanguage().then(response => {
    
  console.log('dentro return rate value: '+rate);
    return response;
  });
}

async function getlanguage() {
  if(document.cookie && document.cookie.match('language') && document.cookie.match('rate')){
    //   it is set, so no redirect
    getcookielang();
    temprate=rate;

      
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
              }
            }
          });
          currency = countryToCurrency[ country ];
          temprate=ratefetch();
          console.log('dopo ratefaech: '+ temprate);
          Cookies.set('language', language, { expires: 365 });
          Cookies.set('locale', locale, { expires: 365 });
          Cookies.set('currency', currency, { expires: 365 });
          Cookies.set('country', country, { expires: 365 });
          
         
  }
  return temprate;
}


