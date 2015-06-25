var instructionsHidden = false;
var connectShown = false;
var settingsShown = false;
function toggleConnect() {
	if(settingsShown){
		$("#settings").toggle();
		settingsShown = !settingsShown;
	}
	$("#connect").toggle();
	connectShown = !connectShown;
	if(connectShown == false){
		if(instructionsHidden){
			$("#instructions").toggle();
			instructionsHidden = false;
		}
	}else{
		if(!instructionsHidden){
			$("#instructions").toggle();
			instructionsHidden = true;
		}
	}
}
function toggleSettings() {
	if(connectShown){
		$("#connect").toggle();
		connectShown = !connectShown;
	}
	if(!instructionsHidden){
		$("#instructions").toggle();
		instructionsHidden = true;
	}
	$("#settings").toggle();
	settingsShown = !settingsShown;
	if(settingsShown == false){
		if(instructionsHidden){
			$("#instructions").toggle();
			instructionsHidden = false;
		}
	}else{
		if(!instructionsHidden){
			$("#instructions").toggle();
			instructionsHidden = true;
		}
	}
}
var aborting = false;
var connectionRunning = false;
function forceConnect() {
	if(connectionRunning && $("#connectToIP").html() != "Connect"){
		aborting = true;
		connectionRunning = false;
		return;
	}else if($("#connectToIP").html() != "Connect"){
		connectionRunning = false;
	}
	connectionRunning = true;
	var UserOption = $("#connectionType").val();
	var ServerIP = $("#serverIP").val();
	if(UserOption == null){
		alert("Please slection an option from the selector.")
	}else{
		if(UserOption.toString().toLowerCase() == "private"){
			$("#connectToIP").html("Connected")
			connect("ws://" + ServerIP, "FakeAuth");
			setTimeout(resetConnectButton, 3000)
		}else{
			$("#connectToIP").html("Connecting")
			searchForIP(ServerIP, UserOption);
		}
	}
}
function searchForIP(ip, region){
	if(aborting){
		resetConnectButton();
		aborting = false;
		return;
	}
	var noSearch = false;
	if(ip == null||ip == ""){
		noSearch = true;
	}
    $.ajax("http://m.agar.io/", {
        /**
         * @return {undefined}
         */
        error: function() {
            setTimeout(function(){searchForIP(ip)}, 5000);
        },
         /**
         * @param {string} status
             * @return {undefined}
             */
            success: function(status) {
                status = status.split("\n");
                console.log(status[0]);
                if(noSearch) {
                	$("#connectToIP").html("Connected")
                    connect("ws://" + status[0], status[1]);
                    setTimeout(resetConnectButton, 3000)
                } else if(OfficialIP == status[0].replace(/ /g, "")) {
                	$("#connectToIP").html("Connected")
                    connect("ws://" + status[0], status[1]);
                    setTimeout(resetConnectButton, 3000)
                }else{
                    setTimeout(function(){searchForIP(ip, region)}, 5000)
                }
            },
            dataType: "text",
            method: "POST",
            cache: false,
            crossDomain: true,
            data: region,
            async: false
        });
    }
function resetConnectButton() {
	$("#connectToIP").html("Connect")
}