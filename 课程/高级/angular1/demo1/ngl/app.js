/**
 * Created by Administrator on 2016/9/20.
 */
var comeApp=angular.module('commeApp',['ngRoute','ngMessages']);
comeApp.controller('indexCtrl',ctrl.indexCtrl);
comeApp.controller('allClass',ctrl.allClass);
comeApp.controller('myClass',ctrl.myClass);
comeApp.controller('files',ctrl.files);
comeApp.controller('appDown',ctrl.appDown);
comeApp.controller('appLogin',ctrl.appLogin);
comeApp.directive('showHotCourse',direct.hotCourse);
    comeApp.config(['$routeProvider',function($routeProvider){
        $routeProvider
            .when('/',{templateUrl:'index.html',controller:'indexCtrl'})
            .when('/allClass',{templateUrl:'allClass.html',controller:'allClass'})
            .when('/myClass',{templateUrl:'myClass.html',controller:'myClass'})
            .when('/appDown',{templateUrl:'appDown.html',controller:'appDown'})
            .when('/files',{templateUrl:'files.html',controller:'files'})
            .when('/login',{templateUrl:'login.html',controller:'appLogin'})
            .otherwise({
                redirectTo: '/'
            })
    }]);

angular.bootstrap( window.document.body, ['commeApp']);