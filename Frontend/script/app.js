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
        getDefiniciones: function (ids) {
            misPromesas = [];
            ids.forEach(function (ele, index, array) {
               var deferred = $q.defer();
                $http.get('rest/defin/filter/'+ele)
                    .success(function (great) {
                        deferred.resolve(great)
                    }).error(function (sorry) {
                        deferred.reject(sorry)
                    });
                misPromesas.push(deferred.promise);
            });
            var allPromises = $q.all(misPromesas);
            return allPromises;
        },
        getPalabra: function (palabras) {
            var deferred = $q.defer();
            $http.get('rest/palabras/filterby/indice/'+palabra)
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


    /******************************************
    Trozo de codigo para crear el diccionario
    *******************************************/

    var diccionarioScheme = [];
    var misPalabritas = [10,31,51,1907,2938];
    $scope.imgUrls = [
        {id: 10,name:"Cat", url:"/multimedia/img/cat.jpg"},
        {id: 31,name:"Dog", url:"/multimedia/img/dog.jpg"},
        {id: 51,name:"Rabbit", url:"/multimedia/img/rabbit.jpg"},
        {id: 1907,name:"Notebook", url:"/multimedia/img/notebook.jpg"},
        {id: 2938,name:"Red", url:"/multimedia/img/red.jpg"}
    ];

    var misdefiniciones = getDiccionario.getDefiniciones(misPalabritas);
    misdefiniciones.then(
        function (definiciones) {
            definiciones.forEach(function (ele, index, array) {
                data = {};
                var pal = $scope.imgUrls[index];
                data.id = pal.id;
                data.nombre = pal.name;
                data.url = '/multimedia/img/'+pal.name.toLowerCase()+'.jpg';
                data.diccionarios = [];
                for (var j = 0;j < ele.length; j++){
                  var g = ele[j];
                    if(!data.diccionarios[g.diccionario]){
                        data.diccionarios[g.diccionario] = []
                    }
                  data.diccionarios[g.diccionario].push({
                      defin : g.definicion,
                      example : ''
                  });
                }
                diccionarioScheme.push(data);
            });
        },
        function (error) {
            console.log(error)
        }
    );

    $scope.viendo = 'texto';
    $scope.quieroVer = function(ver){
        $scope.viendo = ver;
    };

    var dictHabilitados = [], palabraElegida;
    $scope.miPalabraForDict = function(idPalabra){
        for(var n = 0; n < diccionarioScheme.length; n++){
            if(diccionarioScheme[n].id == idPalabra){
                palabraElegida = n;
                dictHabilitados = [];
                var palabra = diccionarioScheme[n];
                palabra.diccionarios.forEach(function (ele, index, array) {
                    dictHabilitados.push(index);
                });
            }
        }

    };

     $scope.miDiccionario = function (idDiccionario) {
        var palabra = diccionarioScheme[palabraElegida];
        $scope.title = palabra.nombre;
        $scope.imagenDicUrl = palabra.url;
        $scope.defin = {};
        $scope.defin.a = (palabra.diccionarios[idDiccionario][1]) ? palabra.diccionarios[idDiccionario][1].defin : 'No tenemos definiciones. Ayudanos a construirla';
        $scope.defin.b = (palabra.diccionarios[idDiccionario][2]) ? palabra.diccionarios[idDiccionario][2].defin : 'No tenemos definiciones. Ayudanos a construirla';
        $scope.defin.c = (palabra.diccionarios[idDiccionario][3]) ? palabra.diccionarios[idDiccionario][3].defin : 'No tenemos definiciones. Ayudanos a construirla';
    };

    $scope.customArrayFilter = function (item) {
        for(var dfg = 0; dfg < dictHabilitados.length; dfg++){
              if(item.id == dictHabilitados[dfg]){
                  return true
              }
        }
    };

    $scope.dictAval = [
        {id: 1, name : 'American Heritage® Dictionary of the English Language', urlImgLogo : '/multimedia/img/ahd.png'},
        {id: 2, name : 'Wiktionary Creative Commons Attribution', urlImgLogo : '/multimedia/img/wiktionary.png'},
        {id: 3, name : 'GNU version of the Collaborative International Dictionary', urlImgLogo : '/multimedia/img/gnu.png'},
        {id: 4, name : 'WordNet 3.0 Copyright 2006 by Princeton University', urlImgLogo : '/multimedia/img/wordnet.png'},
        {id: 5, name : 'Century Dictionary and Cyclopedia', urlImgLogo : '/multimedia/img/century.jpg'},
        {id: 6, name : 'Eon Dictionary for all users', urlImgLogo : '/multimedia/img/ahd.png'},
        {id: 7, name : 'Encyclopedia Britannica Company', urlImgLogo : '/multimedia/img/webster.png'}
    ];

    /****************************************************************************************
     * ************************************************************************************/


    /**********************************
    Trozo de codigo para crear el audio
    **********************************/

    $scope.reproAudio = function (id) {
        console.log(id);
        var audio = document.createElement('audio');
        audio.src = '/multimedia/audio/'+id+'.mp3';
        audio.play();
        $scope.urlAudioImg = '/multimedia/img/stop.png';

        $scope.stopMusik = function(){
            audio.pause();
            audio.currentTime = 0;
            $scope.urlAudioImg = '/multimedia/img/play.png';

        };

        $scope.myElementRepro = function (id) {
            $scope.nameRepro = id;
        }
    };


    /**********************************
     **********************************/


    /**************************************
    Trozo de codigo para crear el Imagenes
    **************************************/

    $scope.imgsDictUrls = [
        {id: 1,name:"Dog", url:"/multimedia/img/perro1.jpg"},
        {id: 2,name:"Dog2", url:"/multimedia/img/perro2.jpg"},
        {id: 3,name:"Dog3", url:"/multimedia/img/perro3.png"},
        {id: 4,name:"Dog4", url:"/multimedia/img/perro4.jpg"}
    ];

    $scope.mostrarImagen = function (id) {
        $scope.MostrarEstaImagen = id;
    };

    /**********************************
     **********************************/
 }]);