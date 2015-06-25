
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
    	console.log(details.url);
        if( details.url.toString().indexOf("main_out.js") > -1 && details.url.toString().indexOf("pass") == -1){
        	console.log("Blocked: " + details.url)
            return {redirectUrl: "http://agar.io/js/jquery.js" };
        }else if(details.url.toString().indexOf("magicturtle.js") > -1){
        	return {redirectUrl: "http://agar.io/main_out.js?pass" };
        }
    },
    {urls: ["*://agar.io/*.js"]},
    ["blocking"]);