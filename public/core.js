// Angular.js

(function (angular) {
    'use strict';
   
    var app = angular.module('BevPricingApp', []);

    app.config(function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads
            'self',
            // Allow loading from API
            'https://api.twitter.com/**'
        ]);
    });

	app.controller('AppController', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {
        
    }]);

})(window.angular);