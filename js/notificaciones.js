
function notificaciones(){
	this.id_notifica
    this.titulo
    this.comentario
    this.bool = true;


	this.getNotificaciones = function(){
		var xhr = new XMLHttpRequest();
        var send = new FormData();
        var offset = 0;
        var bool = this.bool;

        if($("div.contenedor-general-notificaciones").size() > 0 && this.bool == false){
            offset = $("div.contenedor-general-notificaciones").size();
        } else {
            $('#notificaciones-evt').html('');
        }
        
        send.append('id',localStorage.getItem('id'));
        send.append('offset',offset);

        xhr.open('POST', path + 'app/getNotificaciones');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(send);
        $.mobile.loading('show');
        xhr.timeout = time;
        xhr.ontimeout = function () {
            $.mobile.loading('hide');
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
        };
        xhr.onerror = function(e){
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
        };

        xhr.onload = function(e){
            //alert(this.response);
        	//alert(localStorage.getItem('id'));
            if(this.status == 200){
                if(this.response && JSON.parse(this.response)){
                    var json = JSON.parse(this.response);
                    var inc = '';
                   	var fecha = '';
                    var hora = '';
                    var asistir= 'none;';
                    var no_asistir = 'none;';
                    var no_confirma = 'none;';
                    var clase = '';
                    var logo = '';
                    var now = +(new Date);
                    //alert(offset);
                    //alert(json.length);
                    if(json.length != 0){
                        try{
                        for(var i = 0; i < json.length; i++ ){
                            if(json[i].tipos_notificaciones_id_tipo_notificacion == 1){
                            	fecha = getFecha(json[i].fecha_evento);
                                hora = getHora(json[i].fecha_evento);
                                if(json[i].tipos_asistencias_id_tipo_asistencia == 1){
                                    asistir = 'block;';
                                    no_asistir = 'none;';
                                    no_confirma = 'none;';
                                } else if(json[i].tipos_asistencias_id_tipo_asistencia == 2){
                                    no_asistir = 'block;';
                                    asistir = 'none;';
                                    no_confirma = 'none;';
                                } else if(json[i].tipos_asistencias_id_tipo_asistencia == 3 && json[i].bool_fecha == 1){
                                    no_asistir = 'none;';
                                    asistir = 'none;';
                                    no_confirma = 'block;';
                                } else {
                                    no_asistir = 'none;';
                                    asistir = 'none;';
                                }
                                if(json[i].visto == 0){
                                    clase = 'no-leido';
                                } else {
                                    clase = 'leido';
                                }

                                if(json[i].logo != null){
                                    logo =  path + 'equipos/' + json[i].id_equipo + '/logos/' + json[i].logo + '?timestamp=' + now;
                                } else {
                                    logo = "jquerymobile/img-dportes/logo-encuentro.png";
                                }

                            
                                inc += "<div class='contenedor-general-notificaciones' id='contenedor-notificacion'>";    
                                inc += "<div id='notificacion_"+json[i].id_notificacion+"' class='fecha-notificacion "+clase+"'>Aviso de Encuentro</div>";
                                inc += "<a onclick='redirectAsistencia("+json[i].id_notificacion+")' class='link-color'>";
                                inc += "<div class='contenedor-fechas-notificacion'>";
                                inc += "<div class='centrado-fechas-notificacion'>";

                                if(json[i].tipo_evento == 4){
                                    inc += "<div style='position: relative;'>";
                                    inc += "<div class='suspension'></div>";
                                    inc += "</div>";
                                }    
        		                inc += "<div class='block-notificacion'><img src='"+logo+"'><p class='nombre-equipo-notificaciones'>"+json[i].nombre+"</p></div>";
        		                inc += "<div class='vs-notificacion'>VS</div>";
        		                inc += "<div class='block-notificacion'><img src='jquerymobile/img-dportes/logo-encuentro.png'><p class='nombre-equipo-notificaciones'>"+json[i].evt_nombre+"</p></div>";
        		                inc += "<div class='block-notificacion-respuesta'><p class='nombre-equipo-notificacion'>"+fecha+" - "+hora+"hrs</p></div>";
                                inc += "<div class='block-notificacion-respuesta'><p class='nombre-equipo-notificacion'>"+json[i].ubicacion+"</p></div>";
                                if(json[i].tipo_evento != 4){
        		                    inc += "<div class='block-notificacion-respuesta'><p id='notifica-con"+json[i].id_notificacion+"' class='nombre-equipo-notificacion-con' style='display:"+asistir+"'>Voy</p></div>";
        		                    inc += "<div class='block-notificacion-respuesta'><p id='notifica-no"+json[i].id_notificacion+"' class='nombre-equipo-notificacion-in' style='display:"+no_asistir+"'>No Voy</p></div>";
                                    inc += "<div class='block-notificacion-respuesta'><p id='notifica-no"+json[i].id_notificacion+"' class='nombre-equipo-notificacion-in' style='display:"+no_confirma+"'>No Respondi</p></div>";
        		                }
                                inc += "</div>";
        		                inc += "</div>";
        		                inc += "</a>";
                                if(json[i].bool_fecha != 1 && json[i].tipo_evento != 4){
        		                  inc += "<div class='boton-participar'><a onclick='setAsistencia(1,"+json[i].id_notificacion+","+localStorage.getItem('id')+")' href='#ventana-asistira' data-rel='popup' data-position-to='window' class='ui-btn color-boton-notificacion' id='boton-asistere' data-transition='pop'>Voy</a></div>";
        		                  inc += "<div class='boton-participar'><a onclick='setAsistencia(2,"+json[i].id_notificacion+","+localStorage.getItem('id')+")' href='#ventana-no-asistira' data-rel='popup' data-position-to='window' class='ui-btn color-boton-notificacion-2' id='boton-no-asistere' data-transition='pop'>No Voy</a></div>";
        		                }
                                inc += "</div>";
                            } else if(json[i].tipos_notificaciones_id_tipo_notificacion == 2){
                                inc += "<div class='contenedor-general-notificaciones' id='contenedor-notificacion'>";
                                inc += "<div class='fecha-notificacion leido'>Aviso de Notificación</div>";
                                inc += "<div class='contenedor-fechas-notificacion'>";
                                inc += "<p style='margin:0; text-align:center; font-weight:bold; font-size:18px;'>"+json[i].param+"</h3>";
                                inc += "<p style='margin:10px;'>"+json[i].param2+"</p>";
                                inc += "</div>";
                                inc += "</div>";
                            }
                        }
                        } catch(e){
                            alert(e);
                        }
                        $('#notificaciones-evt').append(inc).trigger('create');
                        if(json.length >= 5){
                            document.getElementById('not-more').style.display = "block";
                        } else {
                            document.getElementById('not-more').style.display = "none";
                        }
                        $.mobile.loading('hide');
                    } else {
                        if(bool){
                            inc = "<div style='text-align:center;'>";
                            inc += "<img src='jquerymobile/img-dportes/imagen-sin-datos.png' width='138'>";
                            inc += "</div>";
                            inc += "<p style='text-align:center; color:#FFF; font-size:17px; text-shadow:none;'>Encuentra aquí todas las notificaciones, la programación de partidos, participación de jugadores y más datos que siempre quisiste tener a la mano.</p>";
                            $('#notificaciones-evt').html(inc).trigger("create");
                        } else {
                            document.getElementById('not-more').style.display = "none";
                        }
                        $.mobile.loading('hide');
                    }
                }
            }
        }
	}

    this.getTotalNotificacionesByUsuario = function(){
        var xhr = new XMLHttpRequest();
        var send = new FormData(); 
        xhr.open('POST', path + 'app/getTotalNotificacionesByUsuario');
        send.append('id',localStorage.getItem('id'));
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(send);
        $.mobile.loading('show');
        xhr.timeout = time;
        xhr.ontimeout = function () {
            $.mobile.loading('hide');
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
        };
        xhr.onerror = function(e){
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
        };

        xhr.onload = function(e){  
            if(this.status == 200){
                if(this.response){
                    if(this.response > 0){
                        document.getElementById('globo').innerHTML = this.response;
                        document.getElementById('globo').style.display = "block";
                    } else {
                        document.getElementById('globo').innerHTML = "";
                        document.getElementById('globo').style.display = "none";
                    }
                    $.mobile.loading('hide');
                }
            }
        }
    }

    this.getAsistencia = function(){
        var xhr = new XMLHttpRequest();
        var send = new FormData();

        send.append('id_notificacion',sessionStorage.getItem('id_notifica'));
        send.append('id_usuario',localStorage.getItem('id'));

        xhr.open('POST', path + 'app/getAsistencia');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(send);
        $.mobile.loading('show');
        xhr.timeout = time;
        xhr.ontimeout = function () {
            $.mobile.loading('hide');
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
        };
        /*xhr.onprogress = function(){
            alert('progress');
        };*/
        xhr.onerror = function(e){
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
        };

        xhr.onload = function(e){
            if(this.status == 200){
                if(this.response && JSON.parse(this.response)){
                    var json = JSON.parse(this.response);
                    var inc = '';
                    var tipo = '';
                    var foto = '';
                    var au = '';
                    var now = +(new Date);
                    for(var i = 0; i < json.length; i++ ){
                        if(json[i].id_tipo_asistencia == 1){
                            tipo = "asistencia-asistira";
                        } else if(json[i].id_tipo_asistencia == 2){
                            tipo = "asistencia-no-asistira";
                        } else {
                            tipo = "asistencia-sin-responder";
                        }

                        if(json[i].nombre_au != null){
                            au = ' - ' +json[i].nombre_au;
                        } else {
                            au = '';
                        }

                        if(json[i].foto != null){
                            foto = path + 'perfiles/' + json[i].id_usuario + '/' + json[i].foto + '?timestamp=' + now;
                        } else {
                            foto = "jquerymobile/img-dportes/foto.png";
                        }

                        inc += "<li data-icon='false'>";                        
                        inc +=  "<a href='#' class='color-boton-equipo'><img src='"+foto+"'>";
                        inc +=  "<h2>"+ json[i].nombre +"</h2>";
                        inc +=  "<p></p>";
                        inc +=  "<span class='ui-li-count "+tipo+"'>"+ json[i].nombre_asistencia + au + "</span>";
                        inc +=  "</a>";
                        inc +=  "</li>";
                    }
                    $('#asistencia-notifica').html(inc).listview('refresh');
                }
            }
        }
    }

    this.getInfo = function(){
        var xhr = new XMLHttpRequest();
        var send = new FormData();

        send.append('id_notificacion',sessionStorage.getItem('id_notifica'));

        xhr.open('POST', path + 'app/getAsistenciaInfo');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(send);
        $.mobile.loading('show');
        xhr.timeout = time;
        xhr.ontimeout = function () {
            $.mobile.loading('hide');
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
        };
        /*xhr.onprogress = function(){
            alert('progress');
        };*/
        xhr.onerror = function(e){
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
        };

        xhr.onload = function(e){ 
            if(this.status == 200){
                if(this.response && JSON.parse(this.response)){   
                    var json = JSON.parse(this.response);
                    var fecha = getFecha(json.info.fecha_evento);
                    document.getElementById('asist-fecha').innerHTML = fecha;
                    document.getElementById('asist-rival').innerHTML = json.info.nombre;
                    document.getElementById('asist-asisten').innerHTML = json.asistire;
                    document.getElementById('asist-no-asisten').innerHTML = json.nasistire;
                    document.getElementById('asist-pendiente').innerHTML = json.nresponde;
                }
            }
        }     
    }

    this.setAviso = function(){
        if(this.validaAviso()){
            var xhr = new XMLHttpRequest();
            var send = new FormData();

            send.append('titulo',this.titulo);
            send.append('comentario',this.comentario);
            send.append('id_equipo',localStorage.getItem('equipo'));
            send.append('id_usuario',localStorage.getItem('id'));

            xhr.open('POST', path + 'app/setAviso');
            xhr.setRequestHeader('Cache-Control', 'no-cache');
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.send(send);
            $.mobile.loading('show');
            xhr.timeout = time;
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
                    $.mobile.navigate("#notificaciones", {transition: "fade"}); 
                }
            }
        }
    }

    this.validaAviso = function(){
        var bTitulo         = false;
        var bComentario     = false;
        if(this.titulo.trim().length <= 0){
            document.getElementById('av-faltante').style.display = "block";
        } else {
            document.getElementById('av-faltante').style.display = "none";
            bTitulo         = true;
        }
        if(this.comentario.trim().length <= 0 || this.comentario.trim().length > 200){
            document.getElementById('av-excedio').style.display = "block";
        } else {
            document.getElementById('av-excedio').style.display = "none";
            bComentario         = true;
        }

        if(bComentario && bTitulo){
            return true;
        } else {
            return false;
        }
    }

    this.setVistoAvisos = function(){
        var xhr = new XMLHttpRequest();
        var send = new FormData();

        send.append('id_usuario',localStorage.getItem('id'));
        xhr.open('POST', path + 'app/setVistoAvisos');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(send);
        $.mobile.loading('show');
        xhr.timeout = time;
        xhr.ontimeout = function () {
            $.mobile.loading('hide');
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
        };
        xhr.onerror = function(e){
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
        };

        xhr.onload = function(e){
            if(this.status == 200){
                $.mobile.loading('hide');
            }
        }
    }
}

document.getElementById('av-comentario').addEventListener('change',function(){
    var contador = 200 - document.getElementById('av-comentario').value.length;
    document.getElementById('av-contador').innerHTML = contador;
});

document.getElementById('av-submit').addEventListener('click',function(){
    var notifica = new notificaciones();
    notifica.titulo = document.getElementById('av-titulo').value;
    notifica.comentario = document.getElementById('av-comentario').value;
    notifica.setAviso();
    delete notifica;
});


function redirectAsistencia(id){
    sessionStorage.setItem('id_notifica',id);
    $.mobile.navigate("#asistencia", {transition: "fade"});   
}

function setAsistencia(tipo,notifica,id){
        var xhr = new XMLHttpRequest();
        var send = new FormData();

        send.append('id_notificacion', notifica);
        send.append('id_tipo',tipo);
        send.append('id_usuario',id);

        xhr.open('POST', path + 'app/setAsistencia');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(send);
        $.mobile.loading('show');
        xhr.timeout = time;
        xhr.ontimeout = function () {
            $.mobile.loading('hide');
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
        };
        /*xhr.onprogress = function(){
            alert('progress');
        };*/
        xhr.onerror = function(e){
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
        };

        xhr.onload = function(e){
            $("#notificacion_"+notifica).removeClass("no-leido");
            $("#notificacion_"+notifica).addClass("leido");
            if(tipo == 1){
                $("#notifica-con"+notifica).slideDown(500);
                $("#notifica-no"+notifica).slideUp(500);
            } else {
                $("#notifica-no"+notifica).slideDown(500);
                $("#notifica-con"+notifica).slideUp(500);
                sessionStorage.setItem('id_notifica',notifica);
                $.mobile.navigate("#justificacion", {transition: "fade"});                
            }
            $.mobile.loading('hide');
        };
}
