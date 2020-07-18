// Angular.js
/*global console*/
/* eslint no-console: "off" */

(function (angular) {
    'use strict';
   
    var app = angular.module('BevPricingApp', []);

    app.config(function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads
            'self',
            // Allow loading from API
            'https://api.untappd.com/**'
        ]);
    });

	app.controller('AppController', ['$scope', '$http', function ($scope, $http) {
        $scope.beer_list = [];

		// Model for search criteria
        $scope.api_search = {
            q: ''
        };
        
        
        // Called when search form is submitted
        $scope.submit = function (submit_type) {
            // Start loading indicator
            $scope.loading_message = 'Loading...';
            console.log(submit_type);
            /* Submit to appropriate endpoint */
            if (submit_type === 'apisearch') {
                // Format search query
                var data = {
                    q: $scope.apisearch.q
                };

                // Send request to backend
                // Start loading results
                $scope.loading_message = 'Loading...';
                $http.post('/app/apisearch', data)
                    .then(function onSuccess(response) {
                        $scope.beers = response.data;
                        console.log($scope.beers);
                        $scope.loading_message = `${$scope.beers.count} results for ${data.q}!`;

                    }, function onError(response) {
                        $scope.loading_message = 'Failed to load!';

                    });
            }
        };
    }]);

}(window.angular));