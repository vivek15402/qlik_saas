var config = {
    host: 'gachm8uu6azq33y.sg.qlikcloud.com',
    prefix: '/',
    port: 443,
    isSecure: true,
    webIntegrationId: 'sXyaw6hTUmPa_ONq32daAvdZUu2CwHDn'
};

//Redirect to login if user is not logged in
async function login() {
      function isLoggedIn() {
        return fetch("https://"+config.host+"/api/v1/users/me", {
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'qlik-web-integration-id': config.webIntegrationId,
          },
        }).then(response => {
          return response.status === 200;
        });
      }
      return isLoggedIn().then(loggedIn => {
        if (!loggedIn) {	  
            window.location.href = "https://"+config.host+"/login?qlik-web-integration-id=" + config.webIntegrationId + "&returnto=" + location.href;
            throw new Error('not logged in');
        }
      });
    }
login().then(() => {
    require.config( {
    baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources",
    webIntegrationId: config.webIntegrationId
} );			

require( ["js/qlik"], function ( qlik ) {
	qlik.on( "error", function ( error ) {
		$( '#popupText' ).append( error.message + "<br>" );
		$( '#popup' ).fadeIn( 1000 );
	} );
	$( "#closePopup" ).click( function () {
		$( '#popup' ).hide();
	} );
	
	//var global = qlik.getGlobal(config);
	//global.getAuthenticatedUser(function (reply) {
	//	try {
	//		var tmp_user_name = reply.qReturn;
	//		
	//		var user = (((tmp_user_name.split(';')[1]).split('=')[1]).replace('.',' '));
	//		console.log(user);
	//		var user_name = user.replace(/(?:^|\s)\S/g, function(match) {
	//			return match.toUpperCase();
	//		});
	//	} catch {
	//		user_name = 'Error!'
	//	}
	//	
	//	document.getElementById("Authenticated-User").innerHTML = 'Welcome, ' + user_name;
	//});
	
    //open apps -- inserted here --
	var app = qlik.openApp( '7c03e3b5-0d10-4304-a4e1-d9e6c76a6a6f', config );
	
    //get objects -- inserted here --
	app.visualization.get('CSxZqS').then(function(vis){
    	vis.show("QV01");	
	} );
	
	app.visualization.get('PAppmU').then(function(vis){
    	vis.show("QV02");	
	} );
    
} );});