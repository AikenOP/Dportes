document.getElementById("eq-region").addEventListener('change', function(){
	var xhr = new XMLHttpRequest();
	var send = new FormData();
    send.append('id_region',this.value);
    xhr.open('POST', path + 'app/getCiudades');
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(send);
    $.mobile.loading('show');
    xhr.timeout = 10000;

    xhr.ontimeout = function () {
        $.mobile.loading('hide');
        navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
    };

    xhr.onerror = function(e){
        $.mobile.loading('hide');
        navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
    };
    
    xhr.onload = function(e){
    	if(this.status == 200){
            if(this.response && JSON.parse(this.response)){
            	var json = JSON.parse(this.response);
        		var inc = '<option value="0">Seleccione una ciudad</option>';
        		for(var i = 0; i < json.length; i++ ){
        			inc += "<option value='"+json[i].id_ciudad+"'>"+json[i].nombre+"</option>";
        		}
        		document.getElementById('eq-ciudad').innerHTML = inc;
        		$('#eq-ciudad').selectmenu('refresh');
                $.mobile.loading('hide');
            }
        }
    }

});

document.getElementById("eq-ciudad").addEventListener('change', function(){
	var xhr = new XMLHttpRequest();
	var send = new FormData();
    send.append('id_ciudad',this.value);
    xhr.open('POST', path + 'app/getComunas');
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(send);
    $.mobile.loading('show');
    xhr.timeout = 10000;

    xhr.ontimeout = function () {
        $.mobile.loading('hide');
        navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
    };

    xhr.onerror = function(e){
        $.mobile.loading('hide');
        navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
    };

    xhr.onload = function(e){
    	if(this.status == 200){
            if(this.response && JSON.parse(this.response)){
            	var json = JSON.parse(this.response);
        		var inc = '<option value="0">Seleccione una comuna</option>';
        		for(var i = 0; i < json.length; i++ ){
        			inc += "<option value='"+json[i].id_comuna+"'>"+json[i].nombre+"</option>";
        		}
        		document.getElementById('eq-comuna').innerHTML = inc;
        		$('#eq-comuna').selectmenu('refresh');
                $.mobile.loading('hide');
            }
        }
    }

});


document.getElementById("mi-eq-region").addEventListener('change', function(){
    var xhr = new XMLHttpRequest();
    var send = new FormData();
    send.append('id_region',this.value);
    xhr.open('POST', path + 'app/getCiudades');
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(send);
    $.mobile.loading('show');
    xhr.timeout = 10000;

    xhr.ontimeout = function () {
        $.mobile.loading('hide');
        navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
    };

    xhr.onerror = function(e){
        $.mobile.loading('hide');
        navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
    };
    
    xhr.onload = function(e){
        if(this.status == 200){
            if(this.response && JSON.parse(this.response)){
                var json = JSON.parse(this.response);
                var inc = '<option value="0">Seleccione una ciudad</option>';
                for(var i = 0; i < json.length; i++ ){
                    inc += "<option value='"+json[i].id_ciudad+"'>"+json[i].nombre+"</option>";
                }
                document.getElementById('mi-eq-ciudad').innerHTML = inc;
                $('#mi-eq-ciudad').selectmenu('refresh');
                $.mobile.loading('hide');
            }
        }
    }

});

document.getElementById("mi-eq-ciudad").addEventListener('change', function(){
    var xhr = new XMLHttpRequest();
    var send = new FormData();
    send.append('id_ciudad',this.value);
    xhr.open('POST', path + 'app/getComunas');
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(send);
    $.mobile.loading('show');
    xhr.timeout = 10000;

    xhr.ontimeout = function () {
        $.mobile.loading('hide');
        navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
    };

    xhr.onerror = function(e){
        $.mobile.loading('hide');
        navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
    };

    xhr.onload = function(e){
        if(this.status == 200){
            if(this.response && JSON.parse(this.response)){
                var json = JSON.parse(this.response);
                var inc = '<option value="0">Seleccione una comuna</option>';
                for(var i = 0; i < json.length; i++ ){
                    inc += "<option value='"+json[i].id_comuna+"'>"+json[i].nombre+"</option>";
                }
                document.getElementById('mi-eq-comuna').innerHTML = inc;
                $('#mi-eq-comuna').selectmenu('refresh');
                $.mobile.loading('hide');
            }
        }
    }

});

document.getElementById("reg-eq-region").addEventListener('change', function(){
    var xhr = new XMLHttpRequest();
    var send = new FormData();
    send.append('id_region',this.value);
    xhr.open('POST', path + 'app/getCiudades');
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(send);
    $.mobile.loading('show');
    xhr.timeout = 10000;

    xhr.ontimeout = function () {
        $.mobile.loading('hide');
        navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
    };

    xhr.onerror = function(e){
        $.mobile.loading('hide');
        navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
    };
    
    xhr.onload = function(e){
        if(this.status == 200){
            if(this.response && JSON.parse(this.response)){
                var json = JSON.parse(this.response);
                var inc = '<option value="0">Seleccione una ciudad</option>';
                for(var i = 0; i < json.length; i++ ){
                    inc += "<option value='"+json[i].id_ciudad+"'>"+json[i].nombre+"</option>";
                }
                document.getElementById('reg-eq-ciudad').innerHTML = inc;
                $('#reg-eq-ciudad').selectmenu('refresh');
                $.mobile.loading('hide');
            }
        }
    }

});

document.getElementById("reg-eq-ciudad").addEventListener('change', function(){
    var xhr = new XMLHttpRequest();
    var send = new FormData();
    send.append('id_ciudad',this.value);
    xhr.open('POST', path + 'app/getComunas');
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(send);
    $.mobile.loading('show');
    xhr.timeout = 10000;

    xhr.ontimeout = function () {
        $.mobile.loading('hide');
        navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
    };

    xhr.onerror = function(e){
        $.mobile.loading('hide');
        navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
    };

    xhr.onload = function(e){
        if(this.status == 200){
            if(this.response && JSON.parse(this.response)){
                var json = JSON.parse(this.response);
                var inc = '<option value="0">Seleccione una comuna</option>';
                for(var i = 0; i < json.length; i++ ){
                    inc += "<option value='"+json[i].id_comuna+"'>"+json[i].nombre+"</option>";
                }
                document.getElementById('reg-eq-comuna').innerHTML = inc;
                $('#reg-eq-comuna').selectmenu('refresh');
                $.mobile.loading('hide');
            }
        }
    }

});