angular.module('mobileApp', ['ionic', 'ngCordova', 'angular-cache', 'custom-directive', 'custom-service'])

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
       
        if($state.current.name === 'app.login'){
            $state.go('app.home');
        }
        else if($ionicHistory.backView()){
            $ionicHistory.goBack();
        }
    }, 101);
})

//.constant('API_URL', 'https://dry-badlands-9547.herokuapp.com/api/')
.constant('API_URL', 'http://localhost:3000/api/')
.config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider, CacheFactoryProvider) {
   
    //setup local storage
    angular.extend(CacheFactoryProvider.defaults, {maxAge: 30 * 24 * 60 * 60 * 1000});
    
    configRouterProvider($stateProvider, $urlRouterProvider);


    configIonicDefaultTheme($ionicConfigProvider);
   
    //
    $httpProvider.interceptors.push('authInterceptor');
   
});

function configRouterProvider($stateProvider, $urlRouterProvider){
     $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'app/layout/layout.html'
        })
        .state('app.home', {
            url: '/home',
            cache: false,
            //controller: 'HomeCtrl as vm',
            //controllerAs: 'vm',
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
        .state('app.about', {
            url: '/more/about',
            views: {
                'tab-more': {
                    templateUrl: 'app/more/about.html'
                }
            }
        })
        .state('app.feedback', {
            url: '/more/feedback',
            views: {
                'tab-more': {
                    templateUrl: 'app/more/feedback.html'
                }
            }
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
                    templateUrl: 'app/finance/favorStocks.html'
                }
            }
        })
        .state('app.search', {
            url: '/finance/search',
            cache: false,
            views: {
                'tab-finance': {
                    templateUrl: 'app/finance/search.html'
               }
            }
        })
        .state('app.rss', {
            url: '/rss',
            cache: false,
            views: {
                'tab-rss': {
                    templateUrl: 'app/rss/catelog.html'
                }
            }
        })
        .state('app.rssFeeds', {
            url: '/rss/feeds/:catelogId/:catelogTitle',
            cache: false,
            views: {
                'tab-rss': {
                    templateUrl: 'app/rss/rssFeeds.html'
                }
            }
        })
        .state('app.feedDetails', {
            url: '/rss/feedDetails/:title/:id/:link',
            cache: false,
            views: {
                'tab-rss': {
                    templateUrl: 'app/rss/feedDetails.html'
                }
            }
        })
        .state('app.rssSearch', {
            url: '/rss/rssSearch/:query',
            views:{
                'tab-rss':{
                    templateUrl: 'app/rss/rssSearch.html'
                }
            }
        })
        .state('app.rssSubcrible', {
            url: '/rss/subcrible',
            cache: false,
            views: {
                'tab-rss': {
                    templateUrl: 'app/rss/rssSubcrible.html'
                }
            }
        })
        .state('app.login', {
            url: '/login',
            cache: false,
            views:{
                'tab-account':{
                    templateUrl: 'app/user/login.html'
                }
            }
        })
        .state('register', {
            url: '/register',
            templateUrl: 'app/user/register.html'
        });

    $urlRouterProvider.otherwise('/app/home');
}

function configIonicDefaultTheme($ionicConfigProvider){
     //change default platform setup for android
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');

}