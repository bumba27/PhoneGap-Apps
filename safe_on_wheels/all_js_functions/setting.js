function setting(){
    // Wait for Cordova to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    // Creating a Database named Database
    function onDeviceReady() {
        var db = window.openDatabase("sow_db", "1.0", "safe on wheels", 200000);
        db.transaction(queryDB, errorCB, successCB);
    }


    // Selecting Data from the database "Person_data"
    function queryDB(tx) {
        tx.executeSql('SELECT * FROM user_inf', [], querySuccess, errorCB);
    }

    // Showing result from the table "Person_data"
    function querySuccess(tx, results) {
        var len = results.rows.length;
		//alert(len);
		if(len==0)
		{
			//alert("Sorry No User !!");
			window.location   = 'user_info.html';
		}
		else if(len == 1)
		{   
			//alert("inside else if");
			var login_status = results.rows.item(0).login_status;
			//alert("login_status :  "+login_status);

			if(login_status == 0)
			{    
				alert("Your have been loged out !!");	
				//window.location = 'user_info.html';
			}
			else if(login_status == 1)
			{
				//alert("One user status is 1");
				window.location   = 'user_info_update.html';
			}
		}
    }

    // If error encountered show here
    function errorCB(err) {
        console.log("Error processing SQL: "+err.code);
    }

    // Transaction success callback
    //
    function successCB() {
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
        db.transaction(queryDB, errorCB);
    }
    // Cordova is ready
    //
    function onDeviceReady() {
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
        db.transaction(populateDB, errorCB, successCB);
    }

}