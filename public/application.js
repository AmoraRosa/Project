var mainApplicationModuleName = 'shopofhorrors';
var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute','users','example']);
mainApplicationModule.config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);
angular.element(document).ready(function() {
	angular.bootstrap(document, [mainApplicationModuleName]);
});