angular.module('mobileApp', ['ionic', 'custom-directive', 'custom-service'])

.run(function($ionicPlatform, $state, $ionicHistory) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    $ionicPlatform.registerBackButtonAction(function(e){
        //e.preventDefault();
        if($state.current.name === 'app.login'){
            $state.go('app.home');
        }
        else if($ionicHistory.backView()){
            $ionicHistory.goBack();
        }
    }, 101);
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'app/layout/layout.html'
        })
        /*.state('app.home2', {
            url: '/home2',
            cache: false,
            views: {
                'tab-home2': {
                    templateUrl: 'app/home/home2.html'
                }
            }
        })*/
        .state('app.home', {
            url: '/home',
            cache: false,
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
            }/*,
            controller: 'AccountCtrl',
            controllerAs: 'vm'*/
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
         .state('app.finance', {
            url: '/finance',
            cache: false,
            views: {
                'tab-finance': {
                    templateUrl: 'app/finance/stock.html'
                }
            }
        })
        .state('app.login', {

            url: '/login',
            //templateUrl: 'app/user/login.html'
            views:{
                'tab-account':{
                    templateUrl: 'app/user/login.html'
                }
            }
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

    $urlRouterProvider.otherwise('/app/home');

    //change default platform setup for android
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');

    $httpProvider.interceptors.push('authInterceptor');
   
});