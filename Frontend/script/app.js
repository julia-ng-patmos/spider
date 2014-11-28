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
        },
        putDiccionario: function (data) {
            var deferred = $q.defer();
            $http.put('http://localhost:8000/rest/diccionarios/',data)
                .success(function (great) {
                    deferred.resolve(great)
                }).error(function (sorry) {
                    deferred.reject(sorry)
                })
            return deferred;
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
//                for(var i = 0; i < yes.length; i++){
//                    var miData = {
//                        "public_name": yes[i].sourceDictionary,
//                        "private_name": "",
//                        "description": yes[i].text,
//                        "estado": "http://localhost:8000/rest/estado/3/",
//                        "tipo": "http://localhost:8000/rest/tipodiccionario/3/",
//                        "idioma": "http://localhost:8000/rest/idioma/1/"
//                    };
//                    var addDiccionario = getDiccionario.putDiccionario(miData);
//                    console.log(addDiccionario);
//                    addDiccionario.then(function (fine) {
//                        console.log(fine);
//                    }, function (itsbad) {
//                        console.log(itsbad);
//                    })
//                }
                console.log(yes);
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