function ausencias(){

	this.id_tipo
	this.nombre
	this.descripcion
	this.foto
    this.id_notificacion
    this.id_usuario


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
        	if(this.status == 200){
                if(this.response && JSON.parse(this.response)){
                	var json = JSON.parse(this.response);
                    var now = +(new Date);
                    var inc = '';
                    for(var i = 0; i < json.length; i++ ){
                    	inc += "<li data-icon='false' onclick='setAusencia("+json[i].id_tipo_ausencia+","+sessionStorage.getItem('id_notificacion')+","+localStorage.getItem('id')+");'>";
                    	inc += "<a href='#'>";
                    	inc += "<img src='jquerymobile/img-dportes/justificacion/"+json[i].foto+'?timestamp=' + now + "'>";
                    	inc += "<h2>"+json[i].nombre+"</h2>";
                    	inc += "<p>"+json[i].descripcion+"</p>";
                    	inc += "</a>";
                    	inc += "</li>";
                    }
                    $("#just-content").html(inc).listview('refresh');
                }
            }
        }
	}

    this.setAusencia = function(){
        var xhr = new XMLHttpRequest();
        var add = new FormData();
        add.append('id_tipo',this.id_tipo);
        add.append('id_notificacion',this.id_notificacion);
        add.append('id_usuario',this.id_usuario);
        xhr.open('POST', path + 'app/setAusencia');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(add);
        xhr.timeout = 10000;
        xhr.onprogress = function(e){
            $.mobile.loading('show');
        }
        xhr.ontimeout = function(e){
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');   
        }
        xhr.onload = function(e){
            $.mobile.loading('hide');
            if(this.status == 200){
                $.mobile.navigate("#asistencias", {transition: "fade"});    
            }
        }
    }
}


function setAusencia(id,notifica,usuario){
    var ausencia = new ausencias();
    ausencia.id_tipo = id;
    ausencia.id_notificacion = notifica;
    ausencia.id_usuario = usuario;
    ausencia.setAusencia();
    delete ausencia;

}