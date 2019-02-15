/*
 * SEGS - Super Entity Game Server
 * http://www.segs.io/
 * Copyright (c) 2006 - 2018 SEGS Team (see AUTHORS.md)
 * This software is licensed under the terms of the 3-clause BSD License. See LICENSE.md for details.
 */

function makeRequest(m_elementId, m_page, m_function) {
	var httpRequest;
	var m_docElement = document.getElementById(m_elementId);
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(){
		if (this.readyState === 4 && this.status === 200){
			m_function(m_docElement, httpRequest);
		}
	};
    httpRequest.open('GET', m_page);
    httpRequest.send();
}
	
function showContents(m_docElement, m_httpRequest) {
	m_docElement.innerHTML = m_httpRequest.responseText;
}

function updateMain(m_pageName) {
    var m_view_file;
    m_view_file = 'assets/views/' + m_pageName + '.php'
    makeRequest('main-content', m_view_file, showContents);
    setCookie("CurrentPage", m_pageName, 1);
}

function updateModal(m_pageName) {
    var m_include_file;
    m_include_file = 'assets/includes/' + m_pageName + '.php'
    makeRequest('modal-content', m_include_file, showContents);
}

function doLogin(){
    var form_data = document.getElementById("modal_form_login");
    var body_content = { 'username' : form_data.modal_login_username.value,
                    'password' : form_data.modal_login_password.value};
	$("#modal-login").modal('hide');
    fetch("assets/includes/doLogin.php",{
        method: 'POST',
        headers:{
            'charset': 'utf-8',
            'content-type':'application/json'
        },
        body: JSON.stringify(body_content)
    }).then(function(myBlob){
        return myBlob.json();
    }).then(function(result){
        try{
            $("#modal-result").html(result.return_message);
            $("#modal-message").modal('show');
        } catch(e) {
            window.location.reload();
        }
    });
    return false;
}

function doRefresh(){
    console.log("I'm here!");
    try{
        window.location.reload();
    } catch {
        window.location.replace('/');
    }
    return false;
}

function doLogout(){
    fetch("assets/includes/doLogout.php",{
        method: 'GET'
    }).then(function(myBlob){
        return myBlob.json();
    }).then(function(result){
        try{
            $("#modal-result").html(result.return_message);
            $("#modal-message").modal('show');
        } catch(e) {
            window.location.reload();
        }
    });
    return true;
}

function doSignup(){
    var form_data = document.getElementById('form_register');
    var resultbox = document.getElementById('register-result');
    var body_content = "username=" + form_data.desired_username.value + "&password1=" + form_data.password1.value + "&password2=" + form_data.password1.value;
	$("#modal-login").modal('hide');
    fetch("/assets/includes/createUser.php",{
        method: 'POST',
        headers: {
            'charset': 'utf-8',
            'content-type':'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(body_content)
    }).then(function(myBlob){
        return myBlob.json();
    }).then(function(result){
        try{
            $("#modal-result").html(result.return_message);
            $("#modal-message").modal('show');
        } catch(e) {
            window.location.reload();
        }
    });
}

/*
//function accountsInfo(){
//    var elementAccts = document.getElementById("num_accts");
//    var elementChars = document.getElementById("num_chars");
//    fetch("/WebUI2/src/acc_count.php",
//          {method: 'GET'
//          }).then(function(myBlob){
//              return myBlob.json();
//          }).then(function(data){
//              console.log(data);
//              elementAccts.innerHTML = data.num_accts;
//              elementChars.innerHTML = data.num_chars;
//          });
//}
*/

/*menu handler*/
//$(function(){
function stripTrailingSlash(str) {
    if(str.substr(-1) == '/') {
        return str.substr(0, str.length - 1);
    }
    return str;
}

var url = window.location.pathname;
var activePage = stripTrailingSlash(url);

/*
  $('.nav li a').each(function(){  
    var currentPage = stripTrailingSlash($(this).attr('href'));

    if (activePage == currentPage) {
      $(this).parent().addClass('active'); 
    } 
  });
*/
//});

function setActiveItem(){
    var path = window.location.pathname;
    console.log(path);
    path = path.replace(/\/$/,"");
    console.log(path);
    path = decodeURIComponent(path)
}

function getCookie(cookieName) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x === cookieName) {
            return unescape(y);
        }
    }
}

function setCookie(cookieName, cookieValue, expirationInDays) {
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationInDays);
    var newCookieValue = escape(cookieValue) + ((expirationInDays == null) ? "" : "; expires=" + expirationDate.toUTCString());
    document.cookie = cookieName + "=" + newCookieValue;
}

$(function() {
	// retrieve cookie value on page load
	var activePage = getCookie("CurrentPage");
	var $menuItem;
	// if cookie is empty, set to dashboard
	if (activePage === null || activePage === "" || typeof activePage === "undefined") {
		activePage = 'dashboard';
	}
	// create element id variable
	$menuItem = "#menu_" + activePage;
	// load page
    // updateMain(activePage);
	// set page active
	$($menuItem).addClass('active');
});

function cityListPopulate(currentCity){
    //document.getElementById('zoneswitch').style.display = "block";
    var cities = ["Outbreak", "Atlas Park", "King's Row", "Galaxy City",
                  "Steel Canyon", "Skyway City", "Talos Island", "Independence Port",
                  "Founders' Falls", "Brickstown", "Peregrine Island"];
    var hazard = ["Perez Park", "Boomtown", "Dark Astoria", "Crey's Folly",
                  "Enviro Nightmare", "Elysium"];
    var trials = ["Abandoned Sewer Network", "Sewer Network", "Faultline",
                  "Terra Volta", "Eden", "The Hive", "Rikti Crash Site"];
    var cs = document.getElementById('zoneSelector');
    cs.innerHTML = "<option disabled>- Cities</option>";
    var iterator = 0;
    for(var j = 0; j < cities.length; j++){
        var citystr = document.createElement('option');
        citystr.value = iterator;
        citystr.innerText = cities[j];
        cs.appendChild(citystr);
        iterator++;
    }
    cs.innerHTML += "<option disabled>- Hazards</option>";
    for(var j = 0; j < hazard.length; j++){
        var citystr = document.createElement('option');
        citystr.value = iterator;
        citystr.innerText = hazard[j];
        cs.appendChild(citystr);
        iterator++;
    }
    cs.innerHTML += "<option disabled>- Trials</option>";
    for(var j = 0; j < trials.length; j++){
        let citystr = document.createElement('option');
        citystr.value = iterator;
        citystr.innerText = trials[j];
        cs.appendChild(citystr);
        iterator++;
    }
    cs.value = currentCity;
}

var entities;

function doZoneSwitch() 
{
    var bodycontent = {
        'user': ''
    }
    fetch(window.location.origin + "/assets/includes/getCharacters.php",{
        method: 'POST',
        headers: {
            'charset': 'utf-8',
            'content-type': 'application/json'
        },
        body: JSON.stringify(bodycontent)
    }).then(function(myBlob){
        return myBlob.json();
    }).then(function(results){
        if(results.length == 0){
            document.getElementById('switchbox').innerHTML = "You do not currently have any heroes on this server.<br>Once you have logged in and created one, you will see them here.";
        } else {
            entities = results;
            var myForm = document.createElement('form');
            myForm.name = "zonemove";
            myForm.id = "zonemove";
            myForm.setAttribute("onSubmit", "return moveCharacter()");
            myForm.method = "POST";
            
            var formgroup = document.createElement('div');
            formgroup.className = "form-row align-items-center";
            myForm.appendChild(formgroup);

            var formgroupcol1 = document.createElement('div');
            formgroupcol1.className = "col-sm-3 my-1";
            formgroup.appendChild(formgroupcol1);

            var charselect = document.createElement('select');
            charselect.id = "characterSelect";
            charselect.name = "character";
            charselect.className = "custom-select mr-sm-2";
            for(let i = 0; i < results.length; i++) {
                let character = JSON.parse(results[i]);
                let entitydata = JSON.parse(character.entityData);
                var charopt = document.createElement('option');
                charopt.value = i;
                charopt.innerText = character.name;
                charselect.appendChild(charopt);
            }
            formgroupcol1.appendChild(charselect);
                  
            var formgroupcol2 = document.createElement('div');
            formgroupcol2.className = "col-sm-3 my-1";
            formgroup.appendChild(formgroupcol2);

            var zoneSel = document.createElement('select');
            zoneSel.id = "zoneSelector";
            zoneSel.name = "city";
            zoneSel.className = "custom-select mr-sm-2";
            formgroupcol2.appendChild(zoneSel);
                 
            var formgroupcol3 = document.createElement('div');
            formgroupcol3.className = "col-sm-3 my-1";
            formgroup.appendChild(formgroupcol3);

            let button = document.createElement('input');
            button.value = "Move";
            button.type = "button";
            button.className = "btn btn-primary";
            button.addEventListener("click", moveCharacter);
            formgroupcol3.appendChild(button);

            document.getElementById('switchbox').innerHTML = "";
            document.getElementById('switchbox').appendChild(myForm);
            cityListPopulate(1);
        }
    }, function(){
        document.getElementById('switchbox').innerHTML = "We are unable to display any characters at this time.";
    });
}

function getAccountsInfo(){
    var elementAccts = document.getElementById("num_accts");
    var elementChars = document.getElementById("num_chars");
    //fetch("https://segs.verybadpanda.com/assets/includes/getAccounts.php",
    fetch(window.location.origin + "/assets/includes/getAccounts.php",
          {method: 'GET'
          }).then(function(myBlob){
              return myBlob.json();
          }).then(function(data){
              elementAccts.innerHTML = data.num_accts;
              elementChars.innerHTML = data.num_chars;
          });
}

function moveCharacter()
{
    var moveForm = document.getElementById('zonemove');
    var selectedCharacter = moveForm.characterSelect;
    var selectedZone = moveForm.zoneSelector;
    console.log("Character: " + selectedCharacter.value);
    console.log("Zone     : " + selectedZone.value);
    var postBody = {'char' : selectedCharacter.value, 'map' : selectedZone.value};
    //     var CS = moveForm.zoneSelector;
    fetch(window.location.origin + "/assets/includes/moveCharacter.php",{
        method: 'POST',
        headers:{
            'charset': 'utf-8',
            'content-type':'application/json'
        },
        body : JSON.stringify(postBody)
    }).then(function(myBlob){
        return myBlob.json();
    }).then(function(results){
        var return_message = "";
        if(results.value == 0){
            return_message = "You have successfully moved " + 
                selectedCharacter.options[selectedCharacter.selectedIndex].text + " to " + 
                selectedZone.options[selectedZone.selectedIndex].text;
            
            // var sb = document.getElementById('switchbox');
            // var textbox = document.createElement('div');
            // textbox.innerText = "You successfully moved to ";
            // var cityname = document.createElement('SPAN');
            // cityname.style.color = "DarkGreen";
            // cityname.style.fontWeight = "bold";
            // cityname.innerText = CS.options[CS.selectedIndex].text;
            // textbox.append(cityname);
            // sb.append(textbox);
            // setTimeout(function (){
            //     sb.removeChild(textbox);
            // }, 2000);
        } else {
            return_message = "There was an problem moving " + 
                selectedCharacter.options[selectedCharacter.selectedIndex].text + " to " + 
                selectedZone.options[selectedZone.selectedIndex].text;
        }
        
        try{
            $("#modal-result").html(return_message);
            $("#modal-message").modal('show');
        } catch(e) {
            window.location.reload();
        }
        

    });
    return false;
}


var passwordMinLength = 6;

function checkUsername(usernameMinLength)
{
    var formdata = document.getElementById('form_register');
    var username = formdata.desired_username.value;
    var isAvailable = false;
    var isLongEnough = false;
    var isValid = false;

    // Check username length
    if(username.length >= usernameMinLength)
    {
        isLongEnough = true;
    }
    changeStatusById("username-requirements-length", isLongEnough);

    console.log(new Date().toUTCString() + " isAvailable: (PRIOR) " + isAvailable.toString());
    
    var request = checkUsernameAvailability(username);
    
    $.when(request).done(function(data)
    {
        if(data === 'true')
        {
            isAvailable = true;
        }
        console.log(new Date().toUTCString() + " isAvailable: (DURING) " + isAvailable.toString());

        console.log(new Date().toUTCString() + " isAvailable: (END) " + isAvailable.toString());
        changeStatusById("username-requirements-unique", isAvailable);
        
        if(isAvailable && isLongEnough)
        {
            isValid = true;
        }
        changeStatusById("username-requirements", isValid);
    });
}

function checkUsernameAvailability(username)
{
    var username = "username=" + username;
    var result = "";
    var isAvailable = false;

    var ajaxCall = {
        url: "/assets/includes/checkAvailability.php",
        data: username,
        type: "POST",
        success:function(data){
            if(data !== null)
            {
                result = data;
            } 
            
            if(result === 'true')
            {
                isAvailable = true;
            }
            return isAvailable;
        },
        error:function(data){
            $("#user-availability-status").html('Error:' + data.responseText);
            return isAvailable;
        }
    }
    return $.ajax(ajaxCall);
}

function checkAvailability(usernameMinLength)
{
    var formdata = document.getElementById('form_register');
    var username = formdata.desired_username.value;
    username = username.replace(/^\s+|\s+$/g, "");
    var isAvailable = false;
    var isLongEnough = false;
    var isValid = false;

    // Check username length
    if(username.length >= usernameMinLength)
    {
        isLongEnough = true;
    }
    changeStatusById("username-requirements-length", isLongEnough);

    // If username length is OK, check username availability
    username = "username=" + username;
    jQuery.ajax({
        url: "/assets/includes/checkAvailability.php",
        data: username,
        type: "POST",
        success:function(data){
            //returns false if username exists.
            console.log(new Date().toUTCString() + " data       : " + data);
            if(data !== null)
            {
                result = data;
            } else {
                result = "";
            }
            console.log(new Date().toUTCString() + " result     : " + result);
            
            if(result === 'true')
            {
                isAvailable = true;
                console.log(new Date().toUTCString() + " isAvailable: true");
            }
            else
            {
                isAvailable = false;
                console.log(new Date().toUTCString() + " isAvailable: false");
            }
            console.log(new Date().toUTCString() + " isAvailable: (SUCCESS) " + isAvailable.toString());
        },
        error:function(data){
            isAvailable = false;
            console.log(new Date().toUTCString() + " isAvailable: (ERROR) " + isAvailable.toString());
            $("#user-availability-status").html('Error:' + data.responseText);
        }
    });
    console.log(new Date().toUTCString() + " isAvailable: (END) " + isAvailable.toString());
    changeStatusById("username-requirements-unique", isAvailable);

    
    if(isAvailable && isLongEnough)
    {
        isValid = true;
    }
    changeStatusById("username-requirements", isValid);
}

function changeStatusById(entityId, isEnabled)
{   
    divEntityId = "#" + entityId
    iconEntityId = "#icon-" + entityId;
    if(isEnabled)
    {
        $(iconEntityId).removeClass("fa-square");
        $(iconEntityId).addClass("fa-check-square");
        $(divEntityId).removeClass("text-danger");
        $(divEntityId).addClass("text-success");
    }
    else
    {
        $(iconEntityId).removeClass("fa-check-square");
        $(iconEntityId).addClass("fa-square");
        $(divEntityId).removeClass("text-success");
        $(divEntityId).addClass("text-danger");
    }
}

function checkPassword(str)
{
    //var pattern = "^(?=.*\\d).{" + passwordMinLength.toString() + ",}$";
    var pattern = "^^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{" + passwordMinLength.toString() + ",}$";
    //^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,50}$
    //var pattern = "^(?=.*\\d).{6,}$"; //[!@#$%^&*(),.?":{}|<>]
    //var re = /^(?=.*\d).{6,}$/;
    var re = new RegExp(pattern);
    return re.test(str);
}

function checkPasswords()
{
    var username1 = document.getElementById('desired_username');
    username1.value = username1.value.replace(/^\s+|\s+$/g, "");
    var password1 = document.getElementById('password1');
    var password2 = document.getElementById('password2');
    var passwordIsLongEnough = true;
    var passwordIsNotEmpty = true;
    var passwordsMatch = true;
    var passwordIsNotUserName = true;
    var passwordIsValid = true;

    var isSuccess = true;
    
    var message = "";
    if(username1 === null)
    {
        username1 = "";
    }

    if(password1.value === "" ) 
    {
        passwordIsNotEmpty = false;
        isSuccess =  false;
    }
        
    if(password2.value === "" ) 
    {
        passwordIsNotEmpty = false;
        isSuccess =  false;
    }

    /*
        DIV: id="username-unique"    ICON: id="icon-username-unique" 
        DIV: id="passwords-match"    ICON: id="icon-passwords-match" 
        DIV: id="password-complex"   ICON: id="icon-password-complex"
        DIV: id="password-status"    ICON: id="icon-password-status" 
        DIV: id="password1-status"   ICON: id="icon-password1-atatus"
        DIV: id="password2-status"   ICON: id="icon-password2-status"
        .switchClass( removeClassName, addClassName [, duration ] [, easing ] [, complete ] )
        $("#password-status").html("");
    */
    
    if(!passwordIsNotEmpty || password1.value.length < passwordMinLength)
    {
        passwordIsLongEnough = false;
        isSuccess =  false;
    } 
    changeStatusById("password-complex-length", passwordIsLongEnough);
        
    if(!passwordIsNotEmpty || password1.value !== password2.value)
    {
        passwordsMatch = false;
        isSuccess =  false;
    }
    changeStatusById("passwords-match", passwordsMatch);

    if(password1.value.toLowerCase() === username1.value.toLowerCase())
    {
        passwordIsNotUserName = false;
        isSuccess =  false;
    }
    changeStatusById("password-complex-not-username", passwordIsNotUserName);

    if(!passwordIsNotEmpty || !checkPassword(password1.value))
    {
        passwordIsValid = false;
        isSuccess = false;
    }
    changeStatusById("password-complex-special", passwordIsValid);

    changeStatusById("password-complex", isSuccess);
    // console.log(message);
    return isSuccess;
}

// ///var wsUri = "wss://segs.aruin.com";
// ///
// ///
// /// var output;
// /// var available_services = ["helloServer", "getVersion", "ping"]; // To add a new service, add to this list.
// /// 
// /// function add_services() {
// ///     var table = document.getElementById("button_table");
// ///     var i;
// ///     for (i = 0; i < available_services.length; i++) {
// ///         var row = table.insertRow(0);
// ///         var cell1 = row.insertCell(0);
// ///         var pre = document.createElement("button");
// ///         pre.setAttribute("id", available_services[i]);
// ///         pre.setAttribute("class", "service_button");
// ///         pre.addEventListener('click', function() {
// ///             makeCall(this.id);
// ///         }, false);
// ///         var buttonText = available_services[i];
// ///         pre.innerHTML = buttonText;
// ///         cell1.appendChild(pre);
// ///     }
// /// }
// /// 
// /// function initRpc() {
// ///     add_services();//
// ///     output = document.getElementById("output");
// ///     //openWebSocket();
// /// }
// /// 
// /// function openWebSocket() {
// ///     websocket = new WebSocket(wsUri);
// ///     websocket.onopen = function(evt) {
// ///         onOpen(evt)
// ///     };
// ///     websocket.onclose = function(evt) {
// ///         onClose(evt)
// ///     };
// ///     websocket.onmessage = function(evt) {
// ///         onMessage(evt)
// ///     };
// ///     websocket.onerror = function(evt) {
// ///         onError(evt)
// ///     };
// /// }
// /// 
// /// function onOpen(evt) {
// ///     writeToScreen("CONNECTED TO: " + wsUri);
// /// }
// /// 
// /// function makeCall(message) {
// ///     doSend(message);
// /// }
// /// 
// /// function onClose(evt) {
// ///     writeToScreen("DISCONNECTED");
// /// }
// /// 
// /// function onMessage(evt) {
// ///     writeToScreen('<span style="color: blue;">SERVER RESPONSE: ' + evt.data + '</span>');
// ///     processResponse(evt.data);
// /// }
// /// 
// /// function onError(evt) {
// ///     writeToScreen('<span style="color: red;">SERVER ERROR:</span> ' + evt.data);
// /// }
// /// 
// /// function processResponse(response) {
// ///     var obj = JSON.parse(response);
// ///     result = obj.result;
// ///     writeToScreen('<span style="color: green;">PROCESSED RESPONSE:</span> ' + result);
// ///     websocket.close();
// /// }
// /// 
// /// function doSend(message) {
// ///     var timestamp = new Date().getTime();
// ///     var request_payload = JSON.stringify({
// ///         jsonrpc: "2.0",
// ///         method: message,
// ///         params: {},
// ///         id: timestamp
// ///     });
// ///     websocket.send(request_payload);
// ///     writeToScreen("SENT: " + request_payload);
// /// }
// /// 
// /// function writeToScreen(message) {
// ///     var pre = document.createElement("p");
// ///     pre.style.wordWrap = "break-word";
// ///     pre.innerHTML = message;
// ///     output.appendChild(pre);
// /// }

//document.addEventListener("load", add_services(), false);
//document.getElementById("rpc-connect").onclick = function() {
//    initRpc();
//};


$(".nav .nav-item").on("click", function(){
    var path = window.location.pathname;
    path = path.replace(/\/$/,"");
    path = decodeURIComponent(path)
    $(".nav").find('.active').removeClass("active");
    $(this).addClass("active");
});

// Login form validation