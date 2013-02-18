function login()
{
email_add1 = document.getElementById("email_add").value;
password1  = document.getElementById("password").value;
phone_no1  = document.getElementById("phone_no").value;

if(email_add == email_add1 && password == password1 && phone_no == phone_no1)
{	
	// Wait for Cordova to load
    //
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
        tx.executeSql('UPDATE user_inf SET login_status = 1');
    }

    // If error encountered show here
    function errorCB(err) {
        console.log("Error processing SQL: "+err.code);
    }

    // Transaction success callback
    //
    function successCB() {
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
		
		var networkState = navigator.network.connection.type;
		if (networkState == Connection.NONE)
		{
			alert('Sorry No Internet Access !!');
			$.mobile.hidePageLoadingMsg();
		}		
		else
		{
			//window.location = 'http://crewsinfotech.com/safeonwheels/api/safe_on_wheels_app_from_server/main_menu.html';
			var urlName = "http://safeonwheels.crewsinfotech.com/api/owner/login.php";
			$.post(urlName,{email_add:email_add1,password:password1},function(data) {
				var usr = data;
				//alert(resultFromServer);
				if(resultFromServer == "1")
				{
				window.location = 'http://crewsinfotech.com/safeonwheels/api/main/main_menu.php?u_id='+usr+'&phone_no='+phone_no1;
				}
				else
				{
					alert("Please check your login info.");
					$.mobile.hidePageLoadingMsg();
				}
			});
		}
        db.transaction(queryDB, errorCB);
    }
    // Cordova is ready
    function onDeviceReady() {
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
        db.transaction(populateDB, errorCB, successCB);
    }
}
else
{
	alert("Wrong Password !!");
	$.mobile.hidePageLoadingMsg();
}

}