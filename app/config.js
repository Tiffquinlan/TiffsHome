app.factory('config', function ($rootScope, $http) {
	var config = {
		fireRoot: 			'https://tiffshome.firebaseio.com/',
		fireRef: 			new Firebase('https://tiffshome.firebaseio.com/'),
		parseRoot: 			'https://api.parse.com/1/',
	 	parseAppId: 		'p918BfxQ8RsKAWQAkvwsse95Wr45XAlW1rTXsUQG',
	 	parseJsKey: 		'n4PcOFgtMvRF04oGNIj0vkbSSlr8meOwgnYIhmAH',
	 	parseRestApiKey: 	'OwymuextZlaIWy60vCx8YZuDwcYCfPxgyY8rFoj9',
	 	// googleApiKey: 		'AIzaSyB9AkOI2pK5WLEFHoQJDL9JokBio0KmTOo',
	 	roles: 				['Admin','Captain','Crew','Marooned']
	};

	Parse.initialize(config.parseAppId, config.parseJsKey);
	 $http.defaults.headers.common['X-Parse-Application-Id'] = config.parseAppId;
	 $http.defaults.headers.common['X-Parse-REST-API-Key'] = config.parseRestApiKey;
	 $http.defaults.headers.common['Content-Type'] = 'application/json';

	return config;
});