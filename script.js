
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
    	console.log(details.url);
        if( details.url.toString().indexOf("main_out.js") > -1 && details.url.toString().indexOf("pass") == -1){
        	console.log("Blocked: " + details.url)
            //return {redirectUrl: "https://agar.io/js/jquery.js" };
        }else if(details.url.toString() == "http://agar.io/"){
            return {redirectUrl:"https://agar.io"};
            console.log("close")
        }
    },
    {urls: ["*://agar.io/*.*","*://agar.io/"]},
    ["blocking"]);