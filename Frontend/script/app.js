/**
 * Created by eon on 25/11/14.
 */

var myApp = angular.module("mySpider", []);

myApp.factory('getDiccionario', ['$http', '$q', function ($http, $q) {
    return {
        getPalabras: function () {
            var deferred = $q.defer();
            $http.get('/rest/palabras/')
                .success(function (data) {
                    deferred.resolve(data)
                }).error(function (error) {
                    deferred.reject(error)
                });
            return deferred.promise;
        },
        getDefinicion: function (palabra) {
            var deferred = $q.defer();
            $http.get('http://api.wordnik.com:80/v4/word.json/' + palabra + '/definitions?limit=200&includeRelated=true&sourceDictionaries=all&useCanonical=true&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5')
                .success(function (data) {
                    deferred.resolve(data)
                }).error(function (error) {
                    deferred.reject(error)
                });
            return deferred.promise;
        }
    }
}]);

myApp.controller("busquedaCtrl", ['$scope', 'getDiccionario', function ($scope, getDiccionario) {
    $scope.obtenerPalabras = function () {
        var palabras = getDiccionario.getPalabras();
        palabras.then(function (great) {
            console.log(great)
            var definicion = getDiccionario.getDefinicion('dog');
            definicion.then(function (yes) {
                console.log(yes)
            }, function (not) {
                console.log(not)
            })
        }, function (reason) {
            console.log(reason)
        }, function (update) {
            console.log(update)
        });
    }

}]);