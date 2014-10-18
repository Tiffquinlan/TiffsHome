var MainCtrl = app.controller('MainCtrl', function($rootScope, $scope, $routeParams, $location, $http, config, userService, dataService){
	function setup(){
		$scope.$on('$viewContentLoaded', function(event) {
			// ga('send', 'pageview', $location.path());
		});
	}

	var tools = {
		user: userService
	}

	it.MainCtrl=$scope;
});








	// var allMissions = $q.defer();
	// userService.user().then(function(user){
	// 	var liveId = $rootScope.user.objectId;
	// 	var timestamp = new Date().getTime();
	// 	var missionResource = new dataService.resource(
	// 		'Missions',
	// 		'missionList/'+liveId,
	// 		true,
	// 		true,
	// 		{timestamp: timestamp}
	// 	);
	// 		// ar.setQuery('');
	// 	allMissions.resolve(missionResource);
	// 	missionResource.item.list().then(function(data){
	// 		$scope.missions = data;
	// 	})
	// 	$rootScope.$on(missionResource.listenId, function(event, data){
	// 		$scope.missions = data;
	// 	})
	// });
	// var allMissionsPromise = allMissions.promise;




var AdminCtrl = app.controller('AdminCtrl', function($rootScope, $scope, $http, $q, config, initSetupService, roleService){
	var tools = {
		email:function(fun){
			$http.post(config.parseRoot+'functions/'+fun, {}).success(function(data){
				$scope.response = data;
			}).error(function(error, data){
				$scope.response = {error:error,data:data};
			});
		},
		setup:function(){
			roleService.detailedRoles().then(function(roles){
				$rootScope.data.roles = roles;
				roleService.unassigned().then(function(unassigned){
					$rootScope.data.unassigned = unassigned;
				})
			})
		},
		userRoles:roleService,
		user:{
			editRoles:function(user){
				$rootScope.temp.user = user;
				$('#adminUserModal').modal('show');
				// ga('send', 'event', 'admin', 'editRoles');
			}
		},
		roles:{
			setup:function(){	//This is a one time only thing - used to initiate the website roles.
				initSetupService.setup($rootScope.user,config.roles).then(function(results){
					$rootScope.data.roles = results;
				})
			}
		}
	}

	tools.setup();
	$scope.$on('authenticated', function() {
		tools.setup();
	})
	$rootScope.$on('role-reassigned', function(event,unassigned){
		$rootScope.data.unassigned = unassigned;
	})
	$scope.tools = tools;
	it.AdminCtrl=$scope;
});