function votaciones(){
	this.id_usuario
	this.id_equipo
	this.id_evento
	this.fecha
    this.bool = true



	this.getVotaciones = function(){
        var offset = 0;
        if ( $('#votaciones-list li').length > 0 && this.bool == false) {
            offset = $('#votaciones-list li').length;
        } else {
            $('#votaciones-list').html('').listview('refresh');
        }

		var xhr = new XMLHttpRequest();
        var send = new FormData();
        send.append('id_equipo',this.id_equipo);
        send.append('offset',offset);
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
            //alert(this.response);
        	$.mobile.loading('hide');
        	if(this.status == 200){
        		if(this.response && JSON.parse(this.response)){
        			var json = JSON.parse(this.response);
        			var inc = '';
        			var logo = '';
        			for(var i = 0; i < json.length; i++ ){
                        var date = new Date();
                        var estado = '';
                        date = getFormattedDate(date);

                        if(json[i].logo != null){
                            logo = path + 'equipos/' + json[i].id_equipo + '/logos/' + json[i].logo;
                        } else {
                            logo = "jquerymobile/img-dportes/logo-encuentro.png";
                        }
        				/*inc += "<li data-icon='false'>";
        				inc += "<a href='#' data-transition='fade' class='fechas' id='contenedor-fechas' onclick='setParametrosPodio("+json[i].id_evento+")' style='background-color:transparent;'>";
        				inc += "<div class='contenedor-fechas'>";
        				inc += "<div class='centrado-fechas'>";
        				inc += "<div class='block'><img src='"+logo+"' style='border:solid 1px #25421d;'><p class='nombre-equipo-blanco'>"+localStorage.getItem('nombre_equipo')+"</p></div>";
        				inc += "<div class='vs-blanco'>VS</div>";
        				inc += "<div class='block'><img src='jquerymobile/img-dportes/logo-encuentro.png' style='border:solid 1px #25421d;'><p class='nombre-equipo-blanco'>"+json[i].nombre+"</p></div>";
        				inc += "</div>";
        				inc += "</div>"; 
        				inc += "</a>";
        				inc += "</li>";*/
                        if(date <= json[i].date_final){
                            inc += "<li data-icon='false' style='background:#093'>";
                            estado = 'Abierto';
                            redirect = 1;
                        } else {
                            inc += "<li data-icon='false' style='background:#06675f'>";
                            estado = 'Cerrado';
                            redirect = 2;
                        }
                        
                        inc += "<a href='#' data-transition='fade' class='fechas' onclick='setParametrosPodio("+json[i].id_evento+","+redirect+")' id='contenedor-fechas' style='background-color:transparent;'>";
                        inc += "<div class='contenedor-fechas'>";
                        inc += "<div class='centrado-fechas'>";
                        inc += "<p class='estado-votaciones'>"+estado+"</p>";
                        inc += "<div class='block'><img src='"+logo+"' style='border:solid 1px #25421d;'><p class='nombre-equipo-blanco'>"+localStorage.getItem('nombre_equipo')+"</p></div>";
                        inc += "<div class='vs-blanco'>VS</div>";
                        inc += "<div class='block'><img src='jquerymobile/img-dportes/logo-encuentro.png' style='border:solid 1px #25421d;'><p class='nombre-equipo-blanco'>"+json[i].nombre+"</p></div>";
                        inc += "</div>";
                        inc += "</div>";
                        inc += "</a>";
                        inc += "</li>";
        			}

        			$('#votaciones-list').append(inc).listview('refresh');

                    if(json.length >= 5){
                        document.getElementById('vot-more').style.display = "block";
                    } else {
                        document.getElementById('vot-more').style.display = "none";
                    }
        		}
        	}          
        };
	}

    this.getJugadoresVotaciones = function(){
        var xhr = new XMLHttpRequest();
        var send = new FormData();
        send.append('id_equipo',this.id_equipo);
        send.append('id_evento',this.id_evento);
        send.append('id_usuario',this.id_usuario);
        send.append('votante',localStorage.getItem('id'));
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
            try{
            if(this.status == 200){
                if(this.response == true){
                    $('#votaciones-jg-list').html('');
                    navigator.notification.alert('Usted ya voto',function(){$.mobile.navigate("#pg-votaciones", {transition: "fade"});},'Atención','OK');
                } else {
                    if(this.response && JSON.parse(this.response)){
                        //alert(this.response);
                        var arr = JSON.parse(this.response);
                        var fecha = arr.fecha_evento;
                        var json = arr.jugadores;
                        var foto = '';
                        var now = +(new Date);
                        var inc = "<li style='background:#333; border:0px'><h4 id='countdown' style='color:#FFF; text-align:center; text-shadow:none'></h4></li>";
                        for(var i = 0; i < json.length; i++ ){
                            if(json[i].foto != null){
                                foto = path + 'perfiles/' + json[i].id_usuario + '/' + json[i].foto + '?timestamp=' + now;
                            } else {
                                foto = "jquerymobile/img-dportes/foto.png";
                            }   
                            inc += "<li class='li-padding' data-icon='false'>";
                            inc += "<a onclick='setVotacion("+json[i].id_usuario+",\""+json[i].nombre+"\")' href='#' data-rel='popup' data-position-to='window' data-transition='pop' id='4-jugador' class='quita_margenes_para_check hola'>";
                            inc += "<div class='imagen_jugador'><img src='"+foto+"'></div>";
                            inc += "<h2>"+json[i].nombre+"</h2>";
                            inc += "<p></p>";
                            inc += "</a></li>";
                        }
                        $('#votaciones-jg-list').html(inc).listview('refresh');
                        countdown('countdown',fecha);
                    }
                }  
            }
            } catch(e){
                alert(e);
            }
        };    
    }

    this.setVotacionUsuario = function(){
        var xhr = new XMLHttpRequest();
        var send = new FormData();
        send.append('id_equipo',this.id_equipo);
        send.append('id_evento',this.id_evento);
        send.append('id_usuario',this.id_usuario);
        send.append('id_votante',localStorage.getItem('id'));
        xhr.open('POST', path + 'app/setVotacionUsuario');
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
        	$.mobile.loading('hide');
            //alert(this.response);
        	if(this.status == 200){
        		if(this.response && JSON.parse(this.response)){
        			var json = JSON.parse(this.response);
                    var oro = json.oro;
                    var plata = json.plata;
                    var bronce = json.bronce;
        			var inc = '';
        			var foto = '';
                    // ORO
        			for(var i = 0; i < oro.length; i++ ){
        				inc += "<div class='div-general'>";
        				inc += "<div id='cinta-de-oro'></div>";
        				inc += "<div class='contenedor-img-posicion'>";
        				inc += "<img src='jquerymobile/img-dportes/reserva2.jpg' class='mascara-podio'>";
        				inc += "<div class='contenedor-posicion'>1º</div>";
        				inc += "</div>";
        				inc += "<div class='contenedor-jugador-posicion'>"+oro[i].nombre+" "+oro[i].apellido+"</div>";
        				inc += "</div>";
        				inc += "<hr style='border-color: #3aa535;'>";
        			}

                    //PLATA

                    for(var i = 0; i < plata.length; i++ ){
                        inc += "<div class='div-general'>";
                        inc += "<div id='cinta-de-plata'></div>";
                        inc += "<div class='contenedor-img-posicion'>";
                        inc += "<img src='jquerymobile/img-dportes/reserva2.jpg' class='mascara-podio'>";
                        inc += "<div class='contenedor-posicion'>2º</div>";
                        inc += "</div>";
                        inc += "<div class='contenedor-jugador-posicion'>"+plata[i].nombre+" "+plata[i].apellido+"</div>";
                        inc += "</div>";
                        inc += "<hr style='border-color: #3aa535;'>";
                    }

                    //BRONCE 

                    for(var i = 0; i < bronce.length; i++ ){
                        inc += "<div class='div-general'>";
                        inc += "<div id='cinta-de-bronce'></div>";
                        inc += "<div class='contenedor-img-posicion'>";
                        inc += "<img src='jquerymobile/img-dportes/reserva2.jpg' class='mascara-podio'>";
                        inc += "<div class='contenedor-posicion'>3º</div>";
                        inc += "</div>";
                        inc += "<div class='contenedor-jugador-posicion'>"+bronce[i].nombre+" "+bronce[i].apellido+"</div>";
                        inc += "</div>";
                        inc += "<hr style='border-color: #3aa535;'>";
                    }

                    $("#content-podio").html(inc).trigger('create');
                    
        		}
        	}
        };	
	}
}

function setVotacion(id,nombre){
    navigator.notification.confirm(
        '¿Desea votar por '+nombre+'?',
        function(button){
            if(button == 1){
                var vot = new votaciones();
                vot.id_usuario = id;
                vot.id_evento = sessionStorage.getItem('evento');
                vot.id_equipo = localStorage.getItem('equipo');
                vot.setVotacionUsuario();
                delete vot;
            }
        },
        'Aviso',
        'Si,No'
    )
}

function setParametrosPodio(evento,redirect){
    sessionStorage.evento = evento;
    if(redirect == 1){
        $.mobile.navigate("#votaciones", {transition: "fade"});
    } else {
       $.mobile.navigate("#podio", {transition: "fade"}); 
    }
}