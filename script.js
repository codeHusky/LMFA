
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if(details.url.toString() == "http://agar.io/"){
            return {redirectUrl:"https://agar.io"};
            console.log("close")
        }else if(details.url.indexOf(".js") > -1 && details.url.indexOf("https://agar.io/") == 0){
            var test = chrome.extension.getURL("lokio_" + details.url.substring(0,details.url.indexOf(".js")+3).replace("https://agar.io/",""));
            console.log(test);
            return {redirectUrl: test};
        }
    },
    {urls: ["*://agar.io/*.*","*://agar.io/"]},
    ["blocking"]);