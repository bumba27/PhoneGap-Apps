function resetIt()
{
var result = confirm("Are you sure !!");
	if (result==true) {
		// Wait for Cordova to load
		document.addEventListener("deviceready", onDeviceReady, false);
	
		// Cordova is ready
		// Creating a Database named Database
		function onDeviceReady() {
			var db = window.openDatabase("sow_db", "1.0", "safe on wheels", 200000);
			db.transaction(populateDB, errorCB, successCB);
		}
	
		// Populate the database 
		// Running some query
		function populateDB(tx) {
			tx.executeSql('DROP TABLE IF EXISTS user_inf');
			alert("Reset Done !!");
		}
	
		// If error encountered show here
		function errorCB(err) {
			console.log("Error processing SQL: "+err.code);
		}
	
		// Transaction success callback
		//
		function successCB() {
			var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
			window.location = 'user_info.html';
			db.transaction(queryDB, errorCB);
		}
		// Cordova is ready
		//
		function onDeviceReady() {
			var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
			db.transaction(populateDB, errorCB, successCB);
		}
	}
	else(result == false)
	{
		$.mobile.hidePageLoadingMsg();
	}
}