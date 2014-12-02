/**
 * Created by eon on 25/11/14.
 */

var myApp = angular.module("mySpider", []);

myApp.config(['$interpolateProvider', '$httpProvider', function($interpolateProvider, $httpProvider){
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

}]);

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
            $http.get('http://api.wordnik.com:80/v4/word.json/'+palabra+'/definitions?limit=200&includeRelated=true&sourceDictionaries='+'gcide'+'&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5')
                .success(function (data) {
                    deferred.resolve(data)
                }).error(function (error) {
                    deferred.reject(error)
                });
            return deferred.promise;
        },
        putDiccionario: function (data,id) {
            var deferred = $q.defer();
            $http.put('/rest/diccionario/'+(id+1) ,data)
                .success(function (great) {
                    deferred.resolve(great)
                }).error(function (sorry) {
                    deferred.reject(sorry)
                });
            return deferred.promise;
        },
        putDefinicion: function (data) {
            var deferred = $q.defer();
            $http.post('/rest/defpalabra/' ,data)
                .success(function (great) {
                    deferred.resolve(great)
                }).error(function (sorry) {
                    deferred.reject(sorry)
                });
            return deferred.promise;
        },
        putDefinicionDiccionario: function (data) {
            var deferred = $q.defer();
            $http.post('/rest/diccionariodefiniciones/' ,data)
                .success(function (great) {
                    deferred.resolve(great)
                }).error(function (sorry) {
                    deferred.reject(sorry)
                });
            return deferred.promise;
        }
    }
}]);

myApp.controller("busquedaCtrl", ['$scope', 'getDiccionario', function ($scope, getDiccionario) {
    $scope.obtenerPalabras = function () {
        var palabras = getDiccionario.getPalabras();
        palabras.then(
            function (palabras) {
                console.log(palabras);
                palabras.forEach(function (ele, index, array) {
                    var palabra = ele;
                    var definicionDiccionario = getDiccionario.getDefinicion(palabra.nombre.toLowerCase());
                    definicionDiccionario.then(
                        function (defini) {
                            defini.forEach(function (ele2, index2, array2) {
                                var miDef = ele2;
                                var miData = {
                                    "defin": miDef.text || 'not defin',
                                    "idioma": palabra.idioma,
                                    "palabra": palabra.url,
                                    "user_owner": 'http://localhost:8000/rest/usuario/1/',
                                    "ascii_id": palabra.id_ascii,
                                    "habilitada" : true,
                                    "diccionario" : 'http://localhost:8000/rest/diccionario/3'
                                };
                                var evento = getDiccionario.putDefinicion(miData);
                                evento.then(function (suceso) {
                                    console.log(suceso)
                                },
                                function(desepcion){
                                    console.log(desepcion)
                                })
                            })
                        },
                        function (itBad) {
                            console.log(itBad)
                        })
                })
            },
            function (not) {
                console.log(not)
            }
        )
    }

}]);