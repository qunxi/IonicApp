angular.module('mobileApp', ['ionic', 'custom-directive', 'custom-service'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'app/layout/layout.html'
        })
        .state('app.home', {
            cache: false,
            url: '/home',
            views: {
                'tab-home': {
                    templateUrl: 'app/home/home.html'
                }
            }
        })
        .state('app.account', {
            url: '/account',
            cache: false,
            views: {
                'tab-account': {
                    templateUrl: 'app/user/account.html'
                }
            },
            controller: 'AccountCtrl',
            controllerAs: 'vm'
        })
        .state('app.more', {
            url: '/more',
            cache: false,
            views: {
                'tab-more': {
                    templateUrl: 'app/more/more.html'
                }
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'app/user/login.html'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'app/user/register.html'
            /*views: {
                'tab-home': {
                    templateUrl: 'app/user/register.html'
                }
            }*/
        });

    $httpProvider.interceptors.push('authInterceptor');
    $urlRouterProvider.otherwise('/app/home');
});