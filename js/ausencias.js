function ausencias(){

	this.id_tipo
	this.nombre
	this.descripcion
	this.foto


	this.getTiposAusencias = function(){
		var xhr = new XMLHttpRequest();
		xhr.open('POST', path + 'app/getTiposAusencias');
	    xhr.setRequestHeader('Cache-Control', 'no-cache');
	    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send();
        xhr.timeout = 10000;
        xhr.onprogress = function(e){
            $.mobile.loading('show');
        }
        xhr.ontimeout = function(e){
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');   
        }
        xhr.onload = function(e){
        	$.mobile.loading('hide');
        	alert(this.response);
        }
	}
}