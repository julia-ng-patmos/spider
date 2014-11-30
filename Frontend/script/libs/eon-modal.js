/**
 * Created by eon-1 on 10/23/14.
 */

var myApp = angular.module('eonModal',['ui.bootstrap','ngSanitize']);

myApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });

myApp.controller('modalCtrl', ['$scope', '$modal', '$log', function($scope, $modal, $log) {

        $scope.open = function (size,contenido) {
            var modalInstance = $modal.open({
                templateUrl: 'views/'+contenido+'.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
}]);

myApp.directive('eonModal', function($rootScope) {
        return {
            restrict:'A',
            replace: true,
            transclude : true,
            controller: 'modalCtrl',
            template: function(ele, attr){
                if (attr.url && attr.type == "video"){
                    if(navigator.vendor.indexOf("Opera")!=-1){
                        $rootScope.url = attr.url+".webm";
                    }else{
                        $rootScope.url = attr.url+".mp4";
                    }
                }
                switch (attr.type){
                    case 'button':
                        return '<button class="btn btn-default" ng-click="open(\'lg\',\''+attr.contenido+'\')" ng-transclude></button>';
                    case 'link':
                        return '<a class="btn btn-default" ng-click="open(\'lg\',\''+attr.contenido+'\')" ng-transclude></a>';
                    case 'video':
                        return '<a class="btn btn-default" ng-click="open(\'lg\',\'video\')" ng-transclude></a>';
                    case 'popover':
                        if(attr.contenido && attr.pos && attr.disparador && attr.titulo && attr.retraso){
                            return '<button popover-placement="'+attr.pos+'" popover="'+attr.contenido+'" popover-trigger="'+attr.disparador+'" popover-popup-delay="'+attr.retraso+'" popover-title="'+attr.titulo+'" class="btn btn-default" ng-transclude></button>'
                        }else if(attr.contenido && attr.pos && attr.disparador && attr.titulo){
                            return '<button popover-placement="'+attr.pos+'" popover="'+attr.contenido+'" popover-trigger="'+attr.disparador+'" popover-title="'+attr.titulo+'" class="btn btn-default" ng-transclude></button>'
                        }else if(attr.contenido && attr.pos && attr.disparador){
                            return '<button popover-placement="'+attr.pos+'" popover="'+attr.contenido+'" popover-trigger="'+attr.disparador+'"class="btn btn-default" ng-transclude></button>'
                        }else if(attr.contenido && attr.pos){
                            return '<button popover-placement="'+attr.pos+'" popover="'+attr.contenido+'" class="btn btn-default" ng-transclude></button>'
                        }else if(attr.contenido){
                            return '<button popover="'+attr.contenido+'" class="btn btn-default" ng-transclude></button>'
                        }else{
                            return '<button popover-placement="top" popover="Agrega attr contenido" popover-trigger="mouseenter" popover-popup-delay="500" popover-title="Agrega titulo (opcional)" class="btn btn-default" ng-transclude></button>'
                        }
                }
            }
        };
    });