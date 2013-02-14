function update(){
	alert("hi");
        var email_add    = document.getElementById("email_add").value;
        var password     = document.getElementById("password").value;
        var phone_no     = document.getElementById("phone_no").value;
        var salutation   = document.getElementById("salutation").value;
        var first_name   = document.getElementById("first_name").value;
        var last_name    = document.getElementById("last_name").value;
		
		alert(email_add+password+phone_no+salutation+first_name+last_name);
	if(email_add != "" && phone_no != "" && salutation != " " && first_name != "" && last_name != "" )
	{
		// Wait for Cordova to load
		document.addEventListener("deviceready", onDeviceReady, false);
	
		// Cordova is ready
		// Creating a Database named Database
		function onDeviceReady() {
			//alert("onDeviceReady");
			var db = window.openDatabase("sow_db", "1.0", "safe on wheels", 200000);
			db.transaction(populateDB, errorCB, successCB);
		}
	
	
		// Selecting Data from the database "Person_data"
		function populateDB(tx) {
			//alert("populateDB");
			tx.executeSql('CREATE TABLE IF NOT EXISTS user_inf (email_add, password, comp_id, user_salutation, user_first_name, user_last_name, login_status)');
	
			var status       = "1";
			//alert(password);
			if(password != "")
			{
				var update = "UPDATE user_inf SET email_add = '"+email_add+"',password = '"+password+"',comp_id = '"+phone_no+"',user_salutation = '"+salutation+"',user_first_name = '"+first_name+"',user_last_name = '"+last_name+"',login_status = "+status;
				tx.executeSql(update);   
			}
			else if(password == "")
			{
				var update = "UPDATE user_inf SET email_add = '"+email_add+"',comp_id = '"+phone_no+"',user_salutation = '"+salutation+"',user_first_name = '"+first_name+"',user_last_name = '"+last_name+"',login_status = "+status;
				tx.executeSql(update);   
			}
			}
	
		function queryDB(tx) {
			//alert("queryDB");
			tx.executeSql('SELECT * FROM user_inf', [], querySuccess, errorCB);
		}
	
		// Showing result from the table "user_inf"
		function querySuccess(tx, results) {
			var len = results.rows.length;
			//alert(len);
			if(len==1)
			{   
				//alert(results.rows.item(0).email_add);
				//alert(results.rows.item(0).password);
				//alert(results.rows.item(0).user_first_name);
				var email_add1  = results.rows.item(0).email_add;
				var password1   = results.rows.item(0).password;
				var comp_id1    = results.rows.item(0).comp_id;
				window.location = 'index.html';
			}
			else
			{
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
	else
	{
		alert("Fill up all information !!");
		$.mobile.hidePageLoadingMsg();
	}
}