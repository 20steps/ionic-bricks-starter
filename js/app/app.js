// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var servicesModule = angular.module('starter.services', ['bricks', 'LocalStorageModule']);
var controllerModule = angular.module('starter.controllers', []);
var interceptorsModule = angular.module('starter.interceptors', []);
var directivesModule = angular.module('starter.directives', []);

var db = null;

angular.module('starter', [
  'ionic',

  'ngCordova',
  'pascalprecht.translate',

  'bricks',
  'bricks.basic.pages',
  'bricks.basic.found',
  'bricks.basic.shop',
  'bricks.basic.advertisement',
  'bricks.basic.control',

  'ngLoadScript',
  'ngCollapseBox',
  'ngAsyncRenderPages',
  'youtube-embed',

  'starter.services',
  'starter.interceptors',
  'starter.controllers',
  'starter.directives'

])

  .run([
    '$ionicPlatform', '$rootScope', '$timeout', '$translate', '$log', '$window',
    '$cordovaDevice', '$cordovaInAppBrowser', '$cordovaGeolocation', '$cordovaGlobalization',
    '$cordovaSQLite', '$cordovaStatusbar',
    'bricksKernel',  'bricksTrackingService', 'bricksConnectionService', 'youTubeService',
    function (
        $ionicPlatform, $rootScope, $timeout, $translate, $log, $window,
        $cordovaDevice, $cordovaInAppBrowser, $cordovaGeolocation, $cordovaGlobalization,
        $cordovaSQLite, $cordovaStatusbar,
        bricksKernel, bricksTrackingService,  bricksConnectionService, youTubeService
        ) {

      // for developing only
      bricksKernel.setLocale('en');

      // tell bricks app service about preferred locale determined by $translate using browser settings (cp. below)
      $translate.use( bricksKernel.getLocale() );

      $rootScope.history = { entries: [] };

      $rootScope.loadUrlInline = function (url) {
        $cordovaInAppBrowser.open(url, '_blank');
      };

      window.app_config.init(bricksKernel);

      bricksTrackingService.trackApp();
      bricksTrackingService.trackGoogleAnalyticsPageChanges();

      $window.initYouTubeService = function() {
        youTubeService.init();
      }

      $ionicPlatform.ready(function () {

        console.log('ionicPlatform.ready');

        if (window.StatusBar) {
          window.StatusBar.hide();
          $timeout(function () {
            window.navigator.splashscreen.hide();
          }, 1500);
        }

        if (window.cordova) {

          $log.debug('window.cordova detected');

          if (window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          }

          document.addEventListener("offline", function() {
            bricksConnectionService.checkNetworkStatus(true);
          }, false);

          document.addEventListener("deviceready", function () {
            var platform = $cordovaDevice.getPlatform();
            $log.debug('Device Platform', platform);
            ionic.Platform.fullScreen();
          });

        } else {

          $log.debug('no window.cordova detected');

        }

      });

    }])

  .config(function ($stateProvider, $urlRouterProvider, $translateProvider, localStorageServiceProvider) {

    localStorageServiceProvider.setPrefix('lcbrazil');

    window.app_ui_router.init($stateProvider, $urlRouterProvider);
    window.app_translations.init($translateProvider);

  });

