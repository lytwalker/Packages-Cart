var packagesCart = angular.module('packagesCart', ["ngRoute"]);

// Config route - hash to partials linking
packagesCart.config(function($routeProvider){
	$routeProvider
		.when("/", {
			templateUrl: "partials/home.html"
		})
		.when("/packages", {
			templateUrl: "partials/packages-list.html",
			controller: "PackageCtrl"
		})
		.when("/cart", {
			templateUrl: "partials/cart.html",
			controller: "CartCtrl"
		})
		.otherwise({
			redirectTo: "/packages"
		});
});

// Dependencies
// -- Packages
packagesCart.factory("packageService", function(){
	var packages = [
		{
			thumb: "1",
			name: "Entry Level",
			price: 7.99
		},
		{
			thumb: "2",
			name: "Bronze Level",
			price: 9.99
		},
		{
			thumb: "3",
			name: "Silver Level",
			price: 14.99
		},
		{
			thumb: "4",
			name: "Gold Level",
			price: 29.99
		}
	];

	// Get all packges function
	return {
		getPackages: function(){
			return packages;
		}
	}
});
// -- Cart
packagesCart.factory("cartService", function(){
	var cart = [];

	// Get all packges function
	return {
		getCart: function(){
			return cart;
		},
		addToCart: function(package){
			cart.push(package);
		},
		buy: function(package) {
			alert("Congrats. You successfully signed up.");
		}
	}
});


// Header controller
packagesCart.controller("HeaderCtrl", function($scope, $location) {
	$scope.appDetails = {};
	$scope.appDetails.title = "TelOne Packages";
	$scope.appDetails.tagline = "We keep you connected";

	$scope.nav = {};
	$scope.nav.isActive = function(path){
		if (path === $location.path()) {
			return true;
		}
		return false;
	}
});

// Packages list controller
packagesCart.controller("PackageCtrl", function($scope, packageService, cartService) {
	$scope.packages = packageService.getPackages();	

	$scope.addToCart = function(package) {
		cartService.addToCart(package);
	}
});

// Packages list controller
packagesCart.controller("CartCtrl", function($scope, cartService) {
	$scope.cart = cartService.getCart();

	$scope.buy = function(package) {
		cartService.buy(package);
	}
});