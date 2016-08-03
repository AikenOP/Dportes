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
        				inc += "<a href='#' data-transition='fade' class='fechas' id='contenedor-fechas' onclick='setParametrosPodio("+json[i].id_evento+")' style='background-color:transparent;'>";
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

    this.getJugadoresVotaciones = function(){
        var xhr = new XMLHttpRequest();
        var send = new FormData();
        send.append('id_equipo',this.id_equipo);
        send.append('id_evento',this.id_evento);
        xhr.open('POST', path + 'app/getJugadoresVotaciones');
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
            if(this.status == 200){
                alert(this.response);
            }
        };    
    }

    this.setVotaciones = function(){
        var xhr = new XMLHttpRequest();
        var send = new FormData();
        send.append('id_equipo',this.id_equipo);
        send.append('id_evento',this.id_evento);
        send.append('id_usuario',this.id_usuario);
        xhr.open('POST', path + 'app/setVotaciones');
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
            if(this.status == 200){
                alert(this.response);
            }
        }; 
    }

	this.getPodio = function(){
		var xhr = new XMLHttpRequest();
        var send = new FormData();
        send.append('id_equipo',this.id_equipo);
        send.append('id_evento',this.id_evento);
		xhr.open('POST', path + 'app/getPodio');
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
            alert(this.response);
        	$.mobile.loading('hide');
        	if(this.status == 200){
        		if(this.response && JSON.parse(this.response)){
        			var json = JSON.parse(this.response);
        			var inc = '';
        			var foto = '';
        			for(var i = 0; i < json.length; i++ ){
        				inc += "<div class='div-general'>";
        				inc += "<div id='cinta-de-oro'></div>";
        				inc += "<div class='contenedor-img-posicion'>";
        				inc += "<img src='jquerymobile/img-dportes/reserva2.jpg' class='mascara-podio'>";
        				inc += "<div class='contenedor-posicion'>1º</div>";
        				inc += "</div>";
        				inc += "<div class='contenedor-jugador-posicion'>Nombre de Prueba alvarez</div>";
        				inc += "</div>";
        				inc += "<hr style='border-color: #3aa535;'>";
        			}
        		}
        	}
        };	
	}
}

function setParametrosPodio(evento){
    sessionStorage.evento = evento;
    //$.mobile.navigate("#podio", {transition: "fade"});
    $.mobile.navigate("#votaciones", {transition: "fade"});
}