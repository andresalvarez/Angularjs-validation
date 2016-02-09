
var app= angular.module("IB", ["ionic", "tabSlideBox", "ionic-native-transitions"]);

 

app.run(function ($ionicPlatform) {

    $ionicPlatform.ready(function () {

        if (window.cordova && window.cordova.plugins.Keyboard) {

            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);

            cordova.plugins.Keyboard.disableScroll(true);

        }

 

        if (window.StatusBar)

            StatusBar.styleDefault();

    });

})

 



 

app.directive('currencyInput', function() {

    return {

        restrict: 'A',

        require: 'ngModel',

        link: function(scope, element, attrs, ctrl) {

 

            // this is to test for "32" = SPACEBAR

            // and "101" = e (Chrome for some reason let's E go through in type="number"

           

            return ctrl.$parsers.push(function(inputValue) {

                var inputVal = element.val();

                if (inputVal.split(",").length > 2)

                {

                    inputVal = inputVal.substring(0, inputVal.length - 1)

 

                }

                //clearing left side zeros

                while (inputVal.charAt(0) == '0') {

                    inputVal = inputVal.substr(1);

                }

 

                if (inputVal.length == 1) {

                    inputVal = '0,0' + inputVal;

                }

                inputVal = inputVal.replace('(', '');

                inputVal = inputVal.replace(')', '');

                inputVal = inputVal.replace('/', '');

                inputVal = inputVal.replace('*', '');

                inputVal = inputVal.replace('#', '');

                inputVal = inputVal.replace('*', '');

                inputVal = inputVal.replace(';', '');

                inputVal = inputVal.replace('+', '');

                inputVal = inputVal.replace(' ', '');

                inputVal = inputVal.replace('-', '');

                inputVal = inputVal.replace(/\./g, '')

                inputVal = inputVal.replace('N', '');

 

 

                var point = inputVal.indexOf(",");

                if (point >= 0) {

                    inputVal = inputVal.slice(0, point + 4);

                }

 

                var decimalSplit = inputVal.split(",");

                if (decimalSplit.length == 2) {

                    if (decimalSplit[1].length < 2) {

                        var intPart = decimalSplit[0];

                        var decPart = decimalSplit[1];

                        decPart = decimalSplit[0].substring(intPart.length, decimalSplit[0].length - 1) + decPart;

                        intPart = decimalSplit[0].substring(0, intPart.length-1);

                    }

                    else {

                        if (decimalSplit[1].length == 2) {

                            var intPart = decimalSplit[0];

                            var decPart = decimalSplit[1];

                        }

                        else

                        {

                            var intPart = decimalSplit[0];

                            var decPart = decimalSplit[1];

                            intPart += decimalSplit[1].substring(0, 1);

                            decPart = decimalSplit[1].substring(1, decPart.length);

                        }

                    }

                }

 

                //str.substring(1, 4);

                intPart = intPart.replace(/[^\d]/g, '');

                if (intPart.length > 3) {

                    var intDiv = Math.floor(intPart.length / 3);

                    while (intDiv > 0) {

                        var lastComma = intPart.indexOf(".");

                        if (lastComma < 0) {

                            lastComma = intPart.length;

                        }

 

                        if (lastComma - 3 > 0) {

                            intPart = intPart.slice(0, lastComma - 3) + "." + intPart.slice(lastComma - 3);

                        }

                        intDiv--;

                    }

                }

 

                if (intPart == "")

                {

                    intPart = 0;

                }

                if (decPart === undefined) {

                    decPart = "";

                }

                else {

                    decPart = "," + decPart;

                }

                var res = intPart + decPart;

 

 

                if (res != inputValue) {

                    ctrl.$setViewValue(res);

                    ctrl.$render();

                }

 

            });

 

        }

    };

});

 

 

aplicativo.directive('numberOnly', function () {

   

        return {

            restrict: 'A',

            require: 'ngModel',

            link: function (scope, element, attrs, ctrl) {

                // make sure we're connected to a model

                if (!ctrl) {

                    return;

                }

 

                ctrl.$parsers.push(function (val) {

                    // this is a test for whether it's undefined (from textbox)

                    // or null when using type="number"

                    if (val === undefined || val === null) {

                        val = '';

                    }

 

                    // here we try and clean it to make sure it's only numbers

                    var clean = val.toString().replace(/[^0-9]+/g, '');

 

                    // if a letter/etc got in there, set the model to the "cleaned" number value

                    if (val !== clean) {

                        ctrl.$setViewValue(clean);

                        ctrl.$render();

                    }

                    return clean;

                });

 

                // this is to test for "32" = SPACEBAR

                // and "101" = e (Chrome for some reason let's E go through in type="number"

                element.bind('keypress', function (e) {

                    var code = e.keyCode || e.which;

 

                    // Remove code === 101 part if you want 'e' to go through

                    if (code === 101 || code === 32 || code == 46 || code === 48|| code === 44) {

                        e.preventDefault();

                    }

                });

            }

        };

    });

 

     