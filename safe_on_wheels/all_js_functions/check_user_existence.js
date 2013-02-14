	var user;
	var state;
	var email_add ;
	var password;
	var phone_no ;
	
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
        //tx.executeSql('DROP TABLE IF EXISTS user_inf');
        tx.executeSql('CREATE TABLE IF NOT EXISTS user_inf (email_add, password, phone_no, user_salutation, user_first_name, user_last_name, login_status)');
    }

    // Selecting Data from the database "user_inf"
    function queryDB(tx) {
        tx.executeSql('SELECT * FROM user_inf', [], querySuccess, errorCB);
    }

    // Showing result from the table "user_inf"
    function querySuccess(tx, results) {
        var len = results.rows.length;
		//alert("length in index page: "+len);
		if(len == 0)
		{
			user = 0;
			//alert(user);
			document.getElementById("button").innerHTML = "Sign In";
			document.getElementById("enter").style.visibility="hidden";		
		}
		else if(len == 1)
		{   
			user = 1;
			var status = results.rows.item(0).login_status;
			
			if(status == 1)
			{
				document.getElementById("button").innerHTML = "Sign Out";
				//alert(results.rows.item(0).user_first_name);
				var username = results.rows.item(0).user_first_name;
				var lastName = results.rows.item(0).user_last_name;
				var salutation = results.rows.item(0).user_salutation;
				//show username & Welcome Message
				document.getElementById("welcome_msg").innerHTML = "Welcome  "+salutation+"  ";
				document.getElementById("user_name").innerHTML = username +  " " + lastName;
				email_add  = results.rows.item(0).email_add;
				password = results.rows.item(0).password;
				phone_no  = results.rows.item(0).phone_no;
			}
			else if(status == 0)
			{
				document.getElementById("enter").style.visibility="hidden";		
				document.getElementById("setting").style.visibility="hidden";
				document.getElementById("button").innerHTML = "Sign In";
				state = 0;
			}
			else
			{
				alert("Status is nither 0 nor 1 !");
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

<!-- END DataBase Access-->