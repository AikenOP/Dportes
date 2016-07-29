function votaciones(){
	this.id_usuario
	this.id_equipo
	this.id_evento
	this.fecha



	this.getVotaciones = function(){
		var xhr = new XMLHttpRequest();
        var send = new FormData();
        send.append('id_equipo',this.id_equipo);
		xhr.open('POST', path + 'app/getVotaciones');
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
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
        };
        xhr.onload = function(e){
        	$.mobile.loading('hide');
        	if(this.status == 200){
        		if(this.response && JSON.parse(this.response)){
        			var json = JSON.parse(this.response);
        			var inc = '';
        			var logo = '';
        			for(var i = 0; i < json.length; i++ ){
                        if(json[i].logo != null){
                            logo = path + 'equipos/' + json[i].id_equipo + '/logos/' + json[i].logo;
                        } else {
                            logo = "jquerymobile/img-dportes/logo-encuentro.png";
                        }
        				inc += "<li data-icon='false'>";
        				inc += "<a href='#podio' data-transition='fade' class='fechas' id='contenedor-fechas' style='background-color:transparent;'>";
        				inc += "<div class='contenedor-fechas'>";
        				inc += "<div class='centrado-fechas'>";
        				inc += "<div class='block'><img src='"+logo+"' style='border:solid 1px #25421d;'><p class='nombre-equipo-blanco'>"+localStorage.getItem('nombre_equipo')+"</p></div>";
        				inc += "<div class='vs-blanco'>VS</div>";
        				inc += "<div class='block'><img src='jquerymobile/img-dportes/logo-encuentro.png' style='border:solid 1px #25421d;'><p class='nombre-equipo-blanco'>"+json[i].nombre+"</p></div>";
        				inc += "</div>";
        				inc += "</div>";
        				inc += "</a>";
        				inc += "</li>";
        			}

        			$('#votaciones-list').append(inc).listview('refresh');
        		}
        	}          
        };
	}
}