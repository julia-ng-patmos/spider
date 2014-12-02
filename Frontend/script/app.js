/**
 * Created by eon on 25/11/14.
 */

var myApp = angular.module("mySpider", ['eonModal']);

myApp.config(['$interpolateProvider', '$httpProvider', function($interpolateProvider, $httpProvider){
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

}]);

myApp.factory('getDiccionario', ['$http', '$q', function ($http, $q) {
    return {
        getDefinicion: function (id) {
            var deferred = $q.defer();
            $http.get('rest/defin/filter/'+id)
                .success(function (great) {
                    deferred.resolve(great)
                }).error(function (sorry) {
                    deferred.reject(sorry)
                });
            return deferred.promise;
        },
        getPalabra: function (palabra) {
            var deferred = $q.defer();
            $http.get('rest/palabras/filterby/equal/'+palabra)
                .success(function (exito) {
                    deferred.resolve(exito)
                })
                .error(function (error) {
                    deferred.reject(error)
                });
            return deferred.promise;
        }
    }
}]);

myApp.controller("busquedaCtrl", ['$scope', 'getDiccionario', function ($scope, getDiccionario) {
    $scope.miDiccionario = function (palabra) {
        var pal = palabra.toLowerCase();
        var miPalabra = getDiccionario.getPalabra(pal);
        $scope.title = palabra;
        $scope.imagenDicUrl = '/multimedia/img/'+pal+'.jpg';
        $scope.defin = {};
        miPalabra.then(
            function (verywell) {
                var definiciones = getDiccionario.getDefinicion(verywell.id);
                definiciones.then(
                    function (great) {
                        $scope.defin.a = great[0].definicion;
                        $scope.defin.b = great[1].definicion;
                        $scope.defin.c = great[2].definicion;
                    },
                    function (bad) {
                        console.log(bad)
                    })
            },
            function (wrong) {
                console.log(wrong)
            }
        );
    };

    $scope.imgUrls = [
        {name:"Cat", url:"/multimedia/img/cat.jpg"},
        {name:"Dog", url:"/multimedia/img/dog.jpg"},
        {name:"Rabbit", url:"/multimedia/img/rabbit.jpg"},
        {name:"Notebook", url:"/multimedia/img/notebook.jpg"},
        {name:"Red", url:"/multimedia/img/red.jpg"}
    ]
}]);