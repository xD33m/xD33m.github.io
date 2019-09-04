$(document).ready(function() {
    var trex = document.getElementById("main-frame-error");
    var touchtime = 0;
    $("#letterT").on("click", function() {
        if (touchtime == 0) {
            // set first click
            touchtime = new Date().getTime();
        } else {
            // compare first click to this click and see if they occurred within double click threshold
            if (((new Date().getTime()) - touchtime) < 800) {
                // double click occurred
                trex.style.visibility="visible";
                touchtime = 0;
            } else {
                // not a double click so set as a new first click
                touchtime = new Date().getTime();
            }
        }
    });

    $("#letterO").on("click", function() {
        if (touchtime == 0) {
            touchtime = new Date().getTime();
        } else {
            if (((new Date().getTime()) - touchtime) < 800) {
                trex.style.visibility="hidden";
                touchtime = 0;
            } else {
                touchtime = new Date().getTime();
            }
        }
    });

    $("#letterG").on("click", function() {
        if (touchtime == 0) {
            touchtime = new Date().getTime();
        } else {
            if (((new Date().getTime()) - touchtime) < 800) {
                document.getElementById("randomDiv").style.display="block";
                if(document.getElementById("randomDiv").style.display == "block"){
                    $('#randomCityInput').val('')
                    document.getElementById("randomCityInput").style.display = "block";
                    $("#randomCityLabel").empty();
                    $("#randomCityLabel").append("Enter: Region/City");
                }
                touchtime = 0;
            } else {
                touchtime = new Date().getTime();
            }
        }
    });

    $("#letterY").on("click", function() {
        if (touchtime == 0) {
            touchtime = new Date().getTime();
        } else {
            if (((new Date().getTime()) - touchtime) < 800) {
                document.getElementById("randomDiv").style.display="none";
                touchtime = 0;
            } else {
                touchtime = new Date().getTime();
            }
        }
    });

    var randomCityName = null;
    var validCity = function() {
        randomCityName = $('#randomCityInput').val();
        if(randomCityName != null){
            if(moment.tz.zone(randomCityName) != null){
                randomCity = moment().tz(randomCityName).format('HH:mm:ss');
                document.getElementById('randomCityTime').innerHTML = randomCity;
                return true;
            }else {
                return false;
            }
        }
    }
    moment.locale("de");   
    var update = function () {
        tokyo = moment().tz('Asia/Tokyo').format('HH:mm:ss');
        germany = moment().tz('Europe/Paris').format('HH:mm:ss');
        la = moment().tz('America/Los_Angeles').format('HH:mm:ss');
        ny = moment().tz('America/New_York').format('HH:mm:ss');
        if(validCity()){
            document.getElementById('randomCityTime').style.display = "block";
            document.getElementById('randomCityTime').innerHTML = randomCity;
        }else {
            document.getElementById('randomCityTime').style.display = "none";
        }
        document.getElementById('tokyoTime').innerHTML = tokyo
        document.getElementById('germanyTime').innerHTML = germany
        document.getElementById('laTime').innerHTML = la
        document.getElementById('nyTime').innerHTML = ny
    }
    $('#randomCityInput').keypress(function(evt){
            evt = evt || window.event;
            if(evt.keyCode == 13){
                if(validCity()){
                    var inputField = document.getElementById("randomCityInput");
                    inputField.style.display="none";
                    var regexStr = randomCityName.match(/\/([A-z])\w+/g)[0].substring(1).replace('_', ' ');
                    $.ajax({
                        url: 'https://api.openweathermap.org/data/2.5/weather?q='+ regexStr +'&APPID=9ded4d8a3ca84e83be4462cc2ae065b2',
                        dataType: 'json',
                        success: function(data){
                            var tempInGrad= (data.main.temp - 273.15);
                            var htmltoadd = "<sup>" +tempInGrad.toFixed(0) + "°C</sup>";
                            document.getElementById('randomCityLabel').insertAdjacentHTML("beforeend", htmltoadd);
                            }
                    })
                    $("#randomCityLabel").empty();
                    $("#randomCityLabel").append(regexStr);
                }else {
                    $("#randomCityLabel").empty();
                    $("#randomCityLabel").append("Region/City is invalid");
                }
                
            }
    })

	function twitchOnlineCheck() {
        // Jake
        $.ajax({ // jakes user ID 11249217
            url: 'https://api.twitch.tv/helix/streams?client_id=11249217&user_login=jakenbakelive',
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Client-ID', 'kzkjmy0i3yp6hb814robifymb365rb')
            }, 
            success: function(data){
                if(Object.keys(data.data).length == 0){
                    $(function() {
                        $('#jakeStatus').html('Jake is <span style="color: red"> OFFLINE </span>');
                    });
                }else{
                    $(function() {
                        $('#jakeStatus').html('Jake is <span style="color: green"> ONLINE </span>');
                    });
                }
            }
        });
        // Grimmmz
        $.ajax({
            url: 'https://api.twitch.tv/helix/streams?user_login=grimmmz',
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Client-ID', 'kzkjmy0i3yp6hb814robifymb365rb')
            }, 
            success: function(data){
                if(Object.keys(data.data).length == 0){
                    $(function() {
                        $('#grimmmzStatus').html('Grimmmz is <span style="color: red"> OFFLINE </span>');
                    });
                }else{
                    $(function() {
                        $('#grimmmzStatus').html('Grimmmz is <span style="color: green"> ONLINE </span>');
                    });
                }
            }
        }); 
    }

    function getWeather() {
        // Tokyo
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather?q=Tokyo&APPID=9ded4d8a3ca84e83be4462cc2ae065b2',
            dataType: 'json',
            success: function(data){
                var tempInGrad= (data.main.temp - 273.15);
                var htmltoadd = "<sup>" +tempInGrad.toFixed(0) + "°C</sup>"
                document.getElementById('tokyoLabel').insertAdjacentHTML("beforeend", htmltoadd)
            }
        }) 
        // Germany
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather?q=stuttgart&APPID=9ded4d8a3ca84e83be4462cc2ae065b2',
            dataType: 'json',
            success: function(data){
                var tempInGrad= (data.main.temp - 273.15);
                var htmltoadd = "<sup>" +tempInGrad.toFixed(0) + "°C</sup>"
                document.getElementById('germLabel').insertAdjacentHTML("beforeend", htmltoadd)
            }
        }) 
        // Los Angeles
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather?id=5368381&APPID=9ded4d8a3ca84e83be4462cc2ae065b2',
            dataType: 'json',
            success: function(data){
                var tempInGrad= (data.main.temp - 273.15);
                var htmltoadd = "<sup>" +tempInGrad.toFixed(0) + "°C</sup>"
                document.getElementById('laLabel').insertAdjacentHTML("beforeend", htmltoadd)
            }
        }) 
        // New York
        $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather?id=5128581&APPID=9ded4d8a3ca84e83be4462cc2ae065b2',
        dataType: 'json',
        success: function(data){
                var tempInGrad= (data.main.temp - 273.15);
                var htmltoadd = "<sup>" +tempInGrad.toFixed(0) + "°C</sup>"
                document.getElementById('nyLabel').insertAdjacentHTML("beforeend", htmltoadd)
            }
        }) 
    }
    getWeather();

    update();
    setInterval(update, 1000)
    twitchOnlineCheck();
    setInterval(twitchOnlineCheck, 60000)
});