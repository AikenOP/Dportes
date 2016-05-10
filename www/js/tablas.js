function tablas(){


	this.getIndividualAcumulada = function(){
		//alert(sessionStorage.getItem('pi_jugador'));
        var xhr = new XMLHttpRequest();
        var send = new FormData();
        send.append('id',sessionStorage.getItem('pi_jugador'));
        send.append('id_equipo',localStorage.getItem('equipo'));
        xhr.open('POST', path + 'app/getIndividualAcumulada');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(send);

        xhr.onprogress = function(e){
            $.mobile.loading('show');
        }
        
        xhr.onload = function(){
            if(this.status == 200){
                if(this.response && JSON.parse(this.response)){
                    var json = JSON.parse(this.response);
                    var photo = document.getElementById('ind-foto');
                    var now = +(new Date);
                    photo.style.display = 'block';
                    if(json.foto != null){
                        photo.src = path + 'perfiles/' + sessionStorage.getItem('pi_jugador') + '/' + json.foto + '?timestamp=' + now;
                    } else {
                        photo.src = "jquerymobile/img-dportes/foto.png";
                    }
                    document.getElementById('ind-gol-f').innerHTML = json.goles;
                    document.getElementById('ind-gol-c').innerHTML = json.goles_c;
                    document.getElementById('ind-gol-efec').innerHTML = json.efectividad_gol + '%';
                    document.getElementById('ind-gol-b').innerHTML = json.gol_buena;
                    document.getElementById('ind-gol-m').innerHTML = json.gol_mala;

                    document.getElementById('ind-tiro-arco-f').innerHTML = json.tiro_arco;
                    document.getElementById('ind-tiro-arco-c').innerHTML = json.tiro_arco_c;
                    document.getElementById('ind-tiro-arco-efec').innerHTML = json.efectividad_tiro_arco + '%';
                    document.getElementById('ind-tiro-arco-b').innerHTML = json.tiro_arco_buena;
                    document.getElementById('ind-tiro-arco-m').innerHTML = json.tiro_arco_mala;

                    document.getElementById('ind-tiro-libre-f').innerHTML = json.tiro_libre;
                    document.getElementById('ind-tiro-libre-c').innerHTML = json.tiro_libre_c;
                    document.getElementById('ind-tiro-libre-efec').innerHTML = json.efectividad_tiro_libre + '%';
                    document.getElementById('ind-tiro-libre-b').innerHTML = json.tiro_libre_buena;
                    document.getElementById('ind-tiro-libre-m').innerHTML = json.tiro_libre_mala;

                    document.getElementById('ind-tiro-esquina-f').innerHTML = json.tiro_esquina;
                    document.getElementById('ind-tiro-esquina-c').innerHTML = json.tiro_esquina_c;
                    document.getElementById('ind-tiro-esquina-efec').innerHTML = json.efectividad_tiro_esquina + '%';
                    document.getElementById('ind-tiro-esquina-b').innerHTML = json.tiro_esquina_buena;
                    document.getElementById('ind-tiro-esquina-m').innerHTML = json.tiro_esquina_mala;

                    document.getElementById('ind-tiro-penal-f').innerHTML = json.tiro_penal;
                    document.getElementById('ind-tiro-penal-c').innerHTML = json.tiro_penal_c;
                    document.getElementById('ind-tiro-penal-efec').innerHTML = json.efectividad_tiro_penal + '%';
                    document.getElementById('ind-tiro-penal-b').innerHTML = json.tiro_penal_buena;
                    document.getElementById('ind-tiro-penal-m').innerHTML = json.tiro_penal_mala;

                    document.getElementById('ind-quite-f').innerHTML = json.quite;
                    document.getElementById('ind-quite-c').innerHTML = json.quite_c;
                    document.getElementById('ind-quite-efec').innerHTML = json.efectividad_quite + '%';
                    document.getElementById('ind-quite-b').innerHTML = json.quite_buena;
                    document.getElementById('ind-quite-m').innerHTML = json.quite_mala;

                    document.getElementById('ind-asistencia-f').innerHTML = json.asistencia;
                    document.getElementById('ind-asistencia-c').innerHTML = json.asistencia_c;
                    document.getElementById('ind-asistencia-efec').innerHTML = json.efectividad_asistencia + '%';
                    document.getElementById('ind-asistencia-b').innerHTML = json.asistencia_buena;
                    document.getElementById('ind-asistencia-m').innerHTML = json.asistencia_mala;

                    document.getElementById('ind-falta-f').innerHTML = json.falta;
                    document.getElementById('ind-falta-c').innerHTML = json.falta_c;
                    document.getElementById('ind-falta-efec').innerHTML = '';
                    document.getElementById('ind-falta-b').innerHTML = json.falta_buena;
                    document.getElementById('ind-falta-m').innerHTML = json.falta_mala;

                    document.getElementById('ind-efectividad-total').innerHTML = json.efectividad_total + '%';

                    var radarChartData = {
                            labels: ["Goles","Tiros al arco","Tiros libres","Tiros de esquina","Tiros penales","Quites","Asistencias"],
                            datasets: [
                                {
                                    label: "Desempeño Actual",
                                    fillColor: "rgba(151,187,205,0.2)",
                                    strokeColor: "rgba(151,187,205,1)",
                                    pointColor: "rgba(151,187,205,1)",
                                    pointStrokeColor: "#fff",
                                    pointHighlightFill: "#fff",
                                    pointHighlightStroke: "rgba(151,187,205,1)",
                                    data: [json.efectividad_gol,json.efectividad_tiro_arco,json.efectividad_tiro_libre,json.efectividad_tiro_esquina,json.efectividad_tiro_penal,json.efectividad_quite,json.efectividad_asistencia]
                                }
                            ]
                        };

                        
                        /*window.myRadar = new Chart(document.getElementById("radar2").getContext("2d")).Radar(radarChartData, {
                        responsive: true
                        });*/
                    var canvas = document.getElementById("radar2");
                    var ctx = canvas.getContext("2d");
                        
                    var newChart = new Chart(ctx).Radar(radarChartData);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    //newChart.clear();
                    //newChart.destroy();

                    $.mobile.loading('hide');
                }
            }
        }
	}

    this.getTarjetasGrupales = function(){
        var xhr = new XMLHttpRequest();
        var send = new FormData();
        send.append('id_equipo',localStorage.getItem('equipo'));
        xhr.open('POST', path + 'app/getTarjetasGrupales');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(send);

        xhr.onprogress = function(e){
            $.mobile.loading('show');
        }
        
        xhr.onload = function(){
            if(this.status == 200){
                if(this.response && JSON.parse(this.response)){
                    var inc = '';
                    var json = JSON.parse(this.response);
                    var tarjetas = json.tabla;
                    var total = json.total;
                    var now = +(new Date);
                    inc = "<div class='celda-tarjetas'>";
                    inc += "<div class='celda-grafico-total-tarjeta'><a href='#' class='color-enlace-grafico'>Ver Gráfico total de tarjetas</a></div>";
                    inc += "<div class='tarjeta-amarilla-estadistica'></div>";
                    inc += "<div class='tarjeta-roja-estadistica'></div>";
                    inc += "</div>";
                    inc += "<div class='contenedor-celda-tarjetas'>";
                    inc += "<div class='celda-total-tarjetas'>Tarjetas Acumuladas</div>";
                    inc += "<div class='celda-total-tarjeta-amarilla'>"+total.amarillas+"</div>";
                    inc += "<div class='celda-total-tarjeta-roja'>"+total.rojas+"</div>";
                    inc += "</div>";
                    for(var i = 0; i < tarjetas.length; i++ ){
                        if(tarjetas[i].foto != null){
                            foto = path + 'perfiles/' + tarjetas[i].id_usuario + '/' + tarjetas[i].foto + '?timestamp=' + now;
                        } else {
                            foto = "jquerymobile/img-dportes/foto.png";
                        } 
                        inc += "<div class='contenedor-celda-tarjetas'>";
                        inc += "<img src='"+foto+"' class='lista-jugador'>";
                        inc += "<div class='celda-nombre-efectividad'>"+tarjetas[i].nombre+"</div>";
                        inc += "<div class='celda-2'>"+tarjetas[i].amarillas+"</div>";
                        inc += "<div class='celda-1'>"+tarjetas[i].rojas+"</div>";
                        inc += "</div>";
                    }
                    $('#tabla-tarjeta-grupal').html(inc);
                    $.mobile.loading('hide');
                }
            }
        }
    }

    this.getGolesGrupales = function(){
        var xhr = new XMLHttpRequest();
        var send = new FormData();
        send.append('id_equipo',localStorage.getItem('equipo'));
        xhr.open('POST', path + 'app/getGolesGrupales');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(send);

        xhr.onprogress = function(e){
            $.mobile.loading('show');
        }                     

        xhr.onload = function(){
            if(this.status == 200){
                if(this.response && JSON.parse(this.response)){
                    var inc = '';
                    var json = JSON.parse(this.response);
                    var goles = json.tabla;
                    var total = json.total;
                    var now = +(new Date);
                    inc += "<div class='fila-contenedor-titulos-goles'>";
                    inc += "<div class='celda-grafico-total-goles'><a href='#' class='color-enlace-goles'>Ver Gráfico total de Goles</a></div>";
                    inc += "<div class='celda-afavor-goles'>A Favor</div>";
                    inc += "<div class='celda-encontra-goles'>En Contra</div>";
                    inc += "</div>";
                    inc += "<div class='fila-contenedor-goles'>";
                    inc += "<div class='celda-goles-acumulados-jugador'>Goles Acumulados</div>";
                    inc += "<div class='celda-total-afavor-goles'>"+total.favor+"</div>";
                    inc += "<div class='celda-total-encontra-goles'>"+total.contra+"</div>";
                    inc += "</div>";
                    for(var i = 0; i < goles.length; i++ ){
                        if(goles[i].foto != null){
                            foto = path + 'perfiles/' + goles[i].id_usuario + '/' + goles[i].foto + '?timestamp=' + now;
                        } else {
                            foto = "jquerymobile/img-dportes/foto.png";
                        } 
                        inc += "<div class='fila-contenedor-goles'>";
                        inc += "<img src='"+foto+"' class='lista-jugador'>";
                        inc += "<div class='celda-nombre-goles-jugador'>"+goles[i].nombre+"</div>";
                        inc += "<div class='celda-datos-afavor-jugador'>"+goles[i].favor+"</div>";
                        inc += "<div class='celda-datos-encontra-jugador'>"+goles[i].contra+"</div>";
                        inc += "</div>";
                    }
                    $('#tabla-grupal-gol').html(inc);
                    $.mobile.loading('hide');
                }
            }
        }
    }

    this.getTiposGolesGrupales = function(){
        var xhr = new XMLHttpRequest();
        var send = new FormData();
        send.append('id_equipo',localStorage.getItem('equipo'));
        xhr.open('POST', path + 'app/getTiposGolesGrupales');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(send);

        xhr.onprogress = function(e){
            $.mobile.loading('show');
        }
                                
        xhr.onload = function(){
            //alert(this.response);
            if(this.status == 200){
                if(this.response && JSON.parse(this.response)){
                    var inc = '';
                    var json = JSON.parse(this.response);
                    var tipos = json.tabla;
                    var total = json.total;
                    if(tipos.length != 0){
                        inc  = "<div class='fila-contenedor-afavor-encontra'>";
                        inc += "<div class='celda-afavor'>A Favor</div>";
                        inc += "<div class='celda-encontra'>En Contra</div>";
                        inc += "</div>";
                        inc += "<div class='fila-contenedor-tipos-goles'>";
                        inc += "<div class='celda-goles-acumulados'>Goles Acumulados</div>";
                        inc += "<div class='celda-total-afavor'>"+total.favor+"</div>";
                        inc += "<div class='celda-total-encontra'>"+total.contra+"</div>";
                        inc += "</div>";
                        for(var i = 0; i < tipos.length; i++ ){
                            inc += "<div class='fila-contenedor-tipos-goles'>";
                            inc += "<img src='jquerymobile/img-dportes/posiciones/"+tipos[i].icono_estadistica+"' class='lista-jugador'>";  
                            inc += "<div class='celda-tipo-de-gol'>"+tipos[i].nombre+"</div>";
                            inc += "<div class='celda-datos-afavor'>"+tipos[i].favor+"</div>";
                            inc += "<div class='celda-datos-encontra'>"+tipos[i].contra+"</div>";
                            inc += "</div>";
                        }
                    } else {
                        inc = "<div style='text-align:center;'>";
                        inc += "<img src='jquerymobile/img-dportes/imagen-sin-datos.png' width='138'>";
                        inc += "</div>";
                        inc += "<p style='text-align:center; color:#868686; font-size:17px; text-shadow:none;'>No se encontraron estadisticas</p>";
                    }
                    $('#tabla-grupal-tipo-gol').html(inc);
                    $.mobile.loading('hide');
                }
            }
        }        
    }

    this.getCambios = function(){
        var xhr = new XMLHttpRequest();
        var send = new FormData();
        send.append('id_equipo',localStorage.getItem('equipo'));
        xhr.open('POST', path + 'app/getTablaCambios');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(send);    

        xhr.onprogress = function(e){
            $.mobile.loading('show');
        }                         
                                 
        xhr.onload = function(){
            if(this.status == 200){
                if(this.response && JSON.parse(this.response)){
                    var inc = '';
                    var json = JSON.parse(this.response);
                    var now = +(new Date);
                    if(json.length != 0){
                        inc += "<div class='fila-titulos-cambios'>";
                        inc += "<div class='celda-titulo-jugador'>Jugador</div>";
                        inc += "<div class='celda-titular'>Titular</div>";
                        inc += "<div class='celda-reserva'>Reserva</div>";
                        inc += "<div class='celda-cambio'>Cambio</div>";
                        inc += "</div>";
                        for(var i = 0; i < json.length; i++ ){
                            if(json[i].foto != null){
                                foto = path + 'perfiles/' + json[i].usuarios_id_usuario + '/' + json[i].foto + '?timestamp=' + now;
                            } else {
                                foto = "jquerymobile/img-dportes/foto.png";
                            }                    
                            inc += "<div class='contenedor-fila-cambios'>";
                            inc += "<img src='"+foto+"' class='lista-jugador'>";
                            inc += "<div class='celda-nombre-cambios'>"+json[i].nombre+"</div>";
                            inc += "<div class='celda-total-titular'>"+json[i].titular+"</div>";
                            inc += "<div class='celda-total-reserva'>"+json[i].reserva+"</div>";
                            inc += "<div class='celda-total-cambios'>"+json[i].cambio+"</div>";
                            inc += "</div>";
                        }
                    } else {
                        inc = "<div style='text-align:center;'>";
                        inc += "<img src='jquerymobile/img-dportes/imagen-sin-datos.png' width='138'>";
                        inc += "</div>";
                        inc += "<p style='text-align:center; color:#868686; font-size:17px; text-shadow:none;'>No se encontraron estadisticas</p>";                        
                    }
                    $('#tabla-grupal-cambios').html(inc);
                    $.mobile.loading('hide');
                }
            }
        }
    }

    this.getEfectividadGrupalesByJugador = function(){
        var xhr = new XMLHttpRequest();
        var send = new FormData();
        send.append('id_equipo',localStorage.getItem('equipo'));
        xhr.open('POST', path + 'app/getEfectividadGrupalesByJugador');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(send);

        xhr.onprogress = function(e){
            $.mobile.loading('show');
        }
        
        xhr.onload = function(){
            if(this.status == 200){
                if(this.response && JSON.parse(this.response)){
                    var inc = '';
                    var json = JSON.parse(this.response);
                    var now = +(new Date);
                    if(json.length != 0){
                        inc += "<div class='celda-efectividad'>% de efectividad</div>";
                        for(var i = 0; i < json.length; i++ ){
                            if(json[i].foto != null){
                                foto = path + 'perfiles/' + json[i].id_usuario + '/' + json[i].foto + '?timestamp=' + now;
                            } else {
                                foto = "jquerymobile/img-dportes/foto.png";
                            }            
                            inc += "<div class='fila-efectividad'>";
                            inc += "<img src='"+foto+"' class='lista-jugador'>";
                            inc += "<div class='celda-nombre-efectividad'>"+json[i].nombre+"</div>";
                            inc += "<div class='celda-porcentaje-efectividad'>"+json[i].efectividad+"%</div>";
                            inc += "</div>";
                        }
                    } else {
                        inc = "<div style='text-align:center;'>";
                        inc += "<img src='jquerymobile/img-dportes/imagen-sin-datos.png' width='138'>";
                        inc += "</div>";
                        inc += "<p style='text-align:center; color:#868686; font-size:17px; text-shadow:none;'>No se encontraron estadisticas</p>";
                    }
                    $('#efec-jugador').html(inc);
                    $.mobile.loading('hide');
                }
            }
        }        
    }

    this.getEfectividadGrupalesByPosicion = function(){
        var xhr = new XMLHttpRequest();
        var send = new FormData();
        send.append('id_equipo',localStorage.getItem('equipo'));
        xhr.open('POST', path + 'app/getEfectividadGrupalesByPosicion');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(send);

        xhr.onprogress = function(e){
            $.mobile.loading('show');
        }

        xhr.onload = function(){
            if(this.status == 200){
                if(this.response && JSON.parse(this.response)){
                    var inc = '';
                    var json = JSON.parse(this.response);
                    var nd = json.nd;
                    var portero = json.portero;
                    var defensa = json.defensa;
                    var volante = json.volante;
                    var delantero = json.delantero;
                    var now = +(new Date);
                    $('#efec-posicion').html('').trigger('create');

                    if(portero.length != 0){
                        inc = '';                        
                        inc += "<div class='fila-posicion'>";
                        inc += "<div class='celda-nombre-efectividad-2'><img src='jquerymobile/img-dportes/posiciones/portero.png' height='40' style='vertical-align:middle; margin-right:10px;'>PORTERO</div>";
                        inc += "</div>";
                        inc += "<div class='celda-efectividad-posicion'>% de efectividad</div>";
                        for(var i = 0; i < portero.length; i++ ){ 
                            if(portero[i].foto != null){
                                foto = path + 'perfiles/' + portero[i].id_usuario + '/' + portero[i].foto + '?timestamp=' + now;
                            } else {
                                foto = "jquerymobile/img-dportes/foto.png";
                            }      
                            inc += "<div class='padding-tabla'>";
                            inc += "<div class='fila-efectividad-2'>";
                            inc += "<img src='"+foto+"' class='lista-jugador'>";
                            inc += "<div class='celda-nombre-posicion'>"+portero[i].nombre+"</div>";
                            inc += "<div class='celda-porcentaje-posicion'>"+portero[i].efectividad+"%</div>";
                            inc += "</div>";
                            inc += "</div>";         
                        }
                        $('#efec-posicion').append(inc).trigger('create');
                    }
                    
                    if(defensa.length != 0){
                        inc = '';
                        inc += "<div class='fila-posicion'>";
                        inc += "<div class='celda-nombre-efectividad-2'><img src='jquerymobile/img-dportes/posiciones/defensa.png' height='40' style='vertical-align:middle; margin-right:10px;'>DEFENSA</div>";
                        inc += "</div>";
                        inc += "<div class='celda-efectividad-posicion'>% de efectividad</div>";
                        for(var i = 0; i < defensa.length; i++ ){
                            if(defensa[i].foto != null){
                                foto = path + 'perfiles/' + defensa[i].id_usuario + '/' + defensa[i].foto + '?timestamp=' + now;
                            } else {
                                foto = "jquerymobile/img-dportes/foto.png";
                            }   
                            inc += "<div class='padding-tabla'>";
                            inc += "<div class='fila-efectividad-2'>";
                            inc += "<img src='"+foto+"' class='lista-jugador'>";
                            inc += "<div class='celda-nombre-posicion'>"+defensa[i].nombre+"</div>";
                            inc += "<div class='celda-porcentaje-posicion'>"+defensa[i].efectividad+"%</div>";
                            inc += "</div>";
                            inc += "</div>";          
                        }
                        $('#efec-posicion').append(inc).trigger('create');
                    }
                    
                    if(volante.length != 0){
                        inc = '';
                        inc += "<div class='fila-posicion'>";
                        inc += "<div class='celda-nombre-efectividad-2'><img src='jquerymobile/img-dportes/posiciones/volante.png' height='40' style='vertical-align:middle; margin-right:10px;'>VOLANTE</div>";
                        inc += "</div>";
                        inc += "<div class='celda-efectividad-posicion'>% de efectividad</div>";
                        for(var i = 0; i < volante.length; i++ ){
                            if(volante[i].foto != null){
                                foto = path + 'perfiles/' + volante[i].id_usuario + '/' + volante[i].foto + '?timestamp=' + now;
                            } else {
                                foto = "jquerymobile/img-dportes/foto.png";
                            }   
                            inc += "<div class='padding-tabla'>";
                            inc += "<div class='fila-efectividad-2'>";
                            inc += "<img src='"+foto+"' class='lista-jugador'>";
                            inc += "<div class='celda-nombre-posicion'>"+volante[i].nombre+"</div>";
                            inc += "<div class='celda-porcentaje-posicion'>"+volante[i].efectividad+"%</div>";
                            inc += "</div>";
                            inc += "</div>";           
                        }
                        $('#efec-posicion').append(inc).trigger('create');
                    }
                    
                    if(delantero.length != 0){
                        inc = '';
                        inc += "<div class='fila-posicion'>";
                        inc += "<div class='celda-nombre-efectividad-2'><img src='jquerymobile/img-dportes/posiciones/delantero.png' height='40' style='vertical-align:middle; margin-right:10px;'>DELANTERO</div>";
                        inc += "</div>";
                        inc += "<div class='celda-efectividad-posicion'>% de efectividad</div>";
                        for(var i = 0; i < delantero.length; i++ ){
                            if(delantero[i].foto != null){
                                foto = path + 'perfiles/' + delantero[i].id_usuario + '/' + delantero[i].foto + '?timestamp=' + now;
                            } else {
                                foto = "jquerymobile/img-dportes/foto.png";
                            }   
                            inc += "<div class='padding-tabla'>";
                            inc += "<div class='fila-efectividad-2'>";
                            inc += "<img src='"+foto+"' class='lista-jugador'>";
                            inc += "<div class='celda-nombre-posicion'>"+delantero[i].nombre+"</div>";
                            inc += "<div class='celda-porcentaje-posicion'>"+delantero[i].efectividad+"%</div>";
                            inc += "</div>";
                            inc += "</div>";         
                        }
                        $('#efec-posicion').append(inc).trigger('create');
                    }

                    if(portero.length == 0 && defensa.length == 0 && volante.length == 0 && delantero.length == 0){
                        inc = "<div style='text-align:center;'>";
                        inc += "<img src='jquerymobile/img-dportes/imagen-sin-datos.png' width='138'>";
                        inc += "</div>";
                        inc += "<p style='text-align:center; color:#868686; font-size:17px; text-shadow:none;'>No se encontraron estadisticas</p>";
                        $('#efec-posicion').html(inc).trigger('create');
                    }
                    
                    $.mobile.loading('hide');
                }
            }
        }        
    }

    this.getEfectividadGrupalesByJugada = function(){
        var xhr = new XMLHttpRequest();
        var send = new FormData();
        send.append('id_equipo',localStorage.getItem('equipo'));
        xhr.open('POST', path + 'app/getEfectividadGrupalesByJugada');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(send);

        xhr.onprogress = function(e){
            $.mobile.loading('show');
        }
        
        xhr.onload = function(){
            if(this.status == 200){
                if(this.response && JSON.parse(this.response)){
                    var inc = '';
                    var json = JSON.parse(this.response);
                    var goles = json.goles;
                    var tiro_arco = json.tiro_arco;
                    var tiro_libre = json.tiro_libre;
                    var tiro_esquina = json.tiro_esquina;
                    var tiro_penal = json.tiro_penal;
                    var quite = json.quite;
                    var asistencia = json.asistencia;
                    var now = +(new Date);
                    
                    $('#efec-jugada').html('').trigger('create');

                    if(goles.length != 0){
                        inc = '';    
                        inc += "<div class='fila-posicion-jugada'>";
                        inc += "<div class='celda-nombre-efectividad-2'><img src='jquerymobile/img-dportes/posiciones/gol.png' height='40' style='vertical-align:middle; margin-right:5px;'>GOLES</div>";
                        inc += "</div>";
                        inc += "<div class='celda-efectividad-posicion'>% de efectividad</div>";
                        for(var i = 0; i < goles.length; i++ ){
                            if(goles[i].foto != null){
                                foto = path + 'perfiles/' + goles[i].id_usuario + '/' + goles[i].foto + '?timestamp=' + now;
                            } else {
                                foto = "jquerymobile/img-dportes/foto.png";
                            }  
                            inc += "<div class='contenedor-fila-jugada'>";
                            inc += "<div class='bloque-jugada'>";
                            inc += "<img src='"+foto+"' class='lista-jugador'>";
                            inc += "<div class='celda-nombre-jugada'>"+goles[i].nombre+"</div>";
                            inc += "<div class='celda-porcentaje-jugada'>"+goles[i].efectividad+"%</div>";
                            inc += "</div>";
                            inc += "</div>";       
                        }
                        $('#efec-jugada').append(inc).trigger('create');
                    }

                    if(tiro_arco.length != 0){
                        inc = '';
                        inc += "<div class='fila-posicion-jugada'>";
                        inc += "<div class='celda-nombre-efectividad-2'><img src='jquerymobile/img-dportes/posiciones/tiro-al-arco.png' height='40' style='vertical-align:middle; margin-right:5px;'>TIRO AL ARCO</div>";
                        inc += "</div>";
                        inc += "<div class='celda-efectividad-posicion'>% de efectividad</div>";
                        for(var i = 0; i < tiro_arco.length; i++ ){
                            if(tiro_arco[i].foto != null){
                                foto = path + 'perfiles/' + tiro_arco[i].id_usuario + '/' + tiro_arco[i].foto + '?timestamp=' + now;
                            } else {
                                foto = "jquerymobile/img-dportes/foto.png";
                            }  
                            inc += "<div class='contenedor-fila-jugada'>";
                            inc += "<div class='bloque-jugada'>";
                            inc += "<img src='"+foto+"' class='lista-jugador'>";
                            inc += "<div class='celda-nombre-jugada'>"+tiro_arco[i].nombre+"</div>";
                            inc += "<div class='celda-porcentaje-jugada'>"+tiro_arco[i].efectividad+"%</div>";
                            inc += "</div>";
                            inc += "</div>";           
                        }
                        $('#efec-jugada').append(inc).trigger('create');
                    }

                    if(tiro_libre.length != 0){
                        inc = '';
                        inc += "<div class='fila-posicion-jugada'>";
                        inc += "<div class='celda-nombre-efectividad-2'><img src='jquerymobile/img-dportes/posiciones/tiro-libre.png' height='40' style='vertical-align:middle; margin-right:5px;'>TIRO LIBRE</div>";
                        inc += "</div>";
                        inc += "<div class='celda-efectividad-posicion'>% de efectividad</div>";
                        for(var i = 0; i < tiro_libre.length; i++ ){
                            if(tiro_libre[i].foto != null){
                                foto = path + 'perfiles/' + tiro_libre[i].id_usuario + '/' + tiro_libre[i].foto + '?timestamp=' + now;
                            } else {
                                foto = "jquerymobile/img-dportes/foto.png";
                            }  
                            inc += "<div class='contenedor-fila-jugada'>";
                            inc += "<div class='bloque-jugada'>";
                            inc += "<img src='"+foto+"' class='lista-jugador'>";
                            inc += "<div class='celda-nombre-jugada'>"+tiro_libre[i].nombre+"</div>";
                            inc += "<div class='celda-porcentaje-jugada'>"+tiro_libre[i].efectividad+"%</div>";
                            inc += "</div>";
                            inc += "</div>";
                        }
                        $('#efec-jugada').append(inc).trigger('create');
                    }

                    if(tiro_esquina.length != 0){
                        inc = '';
                        inc += "<div class='fila-posicion-jugada'>";
                        inc += "<div class='celda-nombre-efectividad-2'><img src='jquerymobile/img-dportes/posiciones/tiro-esquina.png' height='40' style='vertical-align:middle; margin-right:5px;'>TIRO DE ESQUINA</div>";
                        inc += "</div>";
                        inc += "<div class='celda-efectividad-posicion'>% de efectividad</div>";
                        for(var i = 0; i < tiro_esquina.length; i++ ){
                            if(tiro_esquina[i].foto != null){
                                foto = path + 'perfiles/' + tiro_esquina[i].id_usuario + '/' + tiro_esquina[i].foto + '?timestamp=' + now;
                            } else {
                                foto = "jquerymobile/img-dportes/foto.png";
                            }  
                            inc += "<div class='contenedor-fila-jugada'>";
                            inc += "<div class='bloque-jugada'>";
                            inc += "<img src='"+foto+"' class='lista-jugador'>";
                            inc += "<div class='celda-nombre-jugada'>"+tiro_esquina[i].nombre+"</div>";
                            inc += "<div class='celda-porcentaje-jugada'>"+tiro_esquina[i].efectividad+"%</div>";
                            inc += "</div>";
                            inc += "</div>";       
                        }
                        $('#efec-jugada').append(inc).trigger('create');
                    }

                    if(tiro_penal.length != 0){
                        inc = '';
                        inc += "<div class='fila-posicion-jugada'>";
                        inc += "<div class='celda-nombre-efectividad-2'><img src='jquerymobile/img-dportes/posiciones/tiro-penal.png' height='40' style='vertical-align:middle; margin-right:5px;'>TIRO PENAL</div>";
                        inc += "</div>";
                        inc += "<div class='celda-efectividad-posicion'>% de efectividad</div>";
                        for(var i = 0; i < tiro_penal.length; i++ ){
                            if(tiro_penal[i].foto != null){
                                foto = path + 'perfiles/' + tiro_penal[i].id_usuario + '/' + tiro_penal[i].foto + '?timestamp=' + now;
                            } else {
                                foto = "jquerymobile/img-dportes/foto.png";
                            }  
                            inc += "<div class='contenedor-fila-jugada'>";
                            inc += "<div class='bloque-jugada'>";
                            inc += "<img src='"+foto+"' class='lista-jugador'>";
                            inc += "<div class='celda-nombre-jugada'>"+tiro_penal[i].nombre+"</div>";
                            inc += "<div class='celda-porcentaje-jugada'>"+tiro_penal[i].efectividad+"%</div>";
                            inc += "</div>";
                            inc += "</div>";          
                        }
                        $('#efec-jugada').append(inc).trigger('create');
                    }

                    if(quite.length != 0){
                        inc = '';
                        inc += "<div class='fila-posicion-jugada'>";
                        inc += "<div class='celda-nombre-efectividad-2'><img src='jquerymobile/img-dportes/posiciones/quite.png' height='40' style='vertical-align:middle; margin-right:5px;'>QUITE</div>";
                        inc += "</div>";
                        inc += "<div class='celda-efectividad-posicion'>% de efectividad</div>";
                        for(var i = 0; i < quite.length; i++ ){
                            if(quite[i].foto != null){
                                foto = path + 'perfiles/' + quite[i].id_usuario + '/' + quite[i].foto + '?timestamp=' + now;
                            } else {
                                foto = "jquerymobile/img-dportes/foto.png";
                            }  
                            inc += "<div class='contenedor-fila-jugada'>";
                            inc += "<div class='bloque-jugada'>";
                            inc += "<img src='"+foto+"' class='lista-jugador'>";
                            inc += "<div class='celda-nombre-jugada'>"+quite[i].nombre+"</div>";
                            inc += "<div class='celda-porcentaje-jugada'>"+quite[i].efectividad+"%</div>";
                            inc += "</div>";
                            inc += "</div>";        
                        }
                        $('#efec-jugada').append(inc).trigger('create');
                    }

                    if(asistencia.length != 0){
                        inc = '';
                        inc += "<div class='fila-posicion-jugada'>";
                        inc += "<div class='celda-nombre-efectividad-2'><img src='jquerymobile/img-dportes/posiciones/asistencia.png' height='40' style='vertical-align:middle; margin-right:5px;'>ASISTENCIA</div>";
                        inc += "</div>";
                        inc += "<div class='celda-efectividad-posicion'>% de efectividad</div>";
                        for(var i = 0; i < asistencia.length; i++ ){
                            if(asistencia[i].foto != null){
                                foto = path + 'perfiles/' + asistencia[i].id_usuario + '/' + asistencia[i].foto + '?timestamp=' + now;
                            } else {
                                foto = "jquerymobile/img-dportes/foto.png";
                            }  
                            inc += "<div class='contenedor-fila-jugada'>";
                            inc += "<div class='bloque-jugada'>";
                            inc += "<img src='"+foto+"' class='lista-jugador'>";
                            inc += "<div class='celda-nombre-jugada'>"+asistencia[i].nombre+"</div>";
                            inc += "<div class='celda-porcentaje-jugada'>"+asistencia[i].efectividad+"%</div>";
                            inc += "</div>";
                            inc += "</div>";         
                        }
                        $('#efec-jugada').append(inc).trigger('create');
                    }
                    if(goles.length == 0 && tiro_arco.length == 0 && tiro_libre.length == 0 && tiro_esquina.length == 0 && tiro_penal.length == 0 && quite.length == 0 && asistencia.length == 0){
                        inc = "<div style='text-align:center;'>";
                        inc += "<img src='jquerymobile/img-dportes/imagen-sin-datos.png' width='138'>";
                        inc += "</div>";
                        inc += "<p style='text-align:center; color:#868686; font-size:17px; text-shadow:none;'>No se encontraron estadisticas</p>";
                        $('#efec-jugada').html(inc).trigger('create');
                    }
                    $.mobile.loading('hide');
                }
            }
        }        
    }
}

function navStat(num){
    if(num == 1){
        $('#stat-grupal').removeClass('ui-state-persist');
        $('#stat-individual').removeClass('ui-state-persist');
        $('#stat-partido').addClass('ui-state-persist');
    } else if (num == 2) {
        $('#stat-grupal').removeClass('ui-state-persist');
        $('#stat-partido').removeClass('ui-state-persist');
        $('#stat-individual').addClass('ui-state-persist');
    } else {
        $('#stat-individual').removeClass('ui-state-persist');
        $('#stat-partido').removeClass('ui-state-persist');
        $('#stat-grupal').addClass('ui-state-persist');
    }
}

function statNav(num){
    if(num == 1){
        $('#stat-detalle').removeClass('ui-state-persist');
        $('#stat-resumen').addClass('ui-state-persist');
    } else {
        $('#stat-resumen').removeClass('ui-state-persist');
        $('#stat-detalle').addClass('ui-state-persist');    
    }
}

function efect(num){
    if(num == 1){
        document.getElementById('efec-jugada').style.display = "none";
        document.getElementById('efec-posicion').style.display = "none";
        $('#nav-efect-jugada').removeClass('ui-state-persist');
        $('#nav-efect-posicion').removeClass('ui-state-persist');
        document.getElementById('efec-jugador').style.display = "block";
        $('#nav-efect-jugador').addClass('ui-state-persist');
    } else if (num == 2) {
        document.getElementById('efec-jugada').style.display = "none";
        document.getElementById('efec-jugador').style.display = "none";
        $('#nav-efect-jugada').removeClass('ui-state-persist');
        $('#nav-efect-jugador').removeClass('ui-state-persist');
        document.getElementById('efec-posicion').style.display = "block";
        $('#nav-efect-posicion').addClass('ui-state-persist');
    } else {
        document.getElementById('efec-posicion').style.display = "none";
        document.getElementById('efec-jugador').style.display = "none";
        $('#nav-efect-posicion').removeClass('ui-state-persist');
        $('#nav-efect-jugador').removeClass('ui-state-persist');
        document.getElementById('efec-jugada').style.display = "block";
        $('#nav-efect-jugada').addClass('ui-state-persist');
    }
      /*      var classList = document.getElementById('nav-efect-jugador').className.split(/\s+/);
            for (var i = 0; i < classList.length; i++) {
                alert(classList[i]);
            } */
}

function cambioTabla(num){
    if(num == 1){
        document.getElementById('tabla-jugador-stat').style.display = "block";
        document.getElementById('tabla-jugada-stat').style.display = "none";
        document.getElementById('tabla-posiciones-stat').style.display = "none";
    } else if (num == 2) {
        document.getElementById('tabla-jugador-stat').style.display = "none";
        document.getElementById('tabla-jugada-stat').style.display = "none";
        document.getElementById('tabla-posiciones-stat').style.display = "block";
    } else {
        document.getElementById('tabla-jugador-stat').style.display = "none";
        document.getElementById('tabla-jugada-stat').style.display = "block";
        document.getElementById('tabla-posiciones-stat').style.display = "none";
    } 
}

function setTablaStatGrupal(num){
    if(num == 1){
        document.getElementById('tabla-grupal-gol').style.display = "none";
        document.getElementById('tabla-grupal-tipo-gol').style.display = "none";
        document.getElementById('tabla-grupal-cambios').style.display = "none";
        document.getElementById('efectividad-grupal').style.display = "none";
        $('#stat-goles-tabla').removeClass('btn-active-stat');
        $('#stat-tipos-tabla').removeClass('btn-active-stat');
        $('#stat-cambios-tabla').removeClass('btn-active-stat');
        $('#stat-efectividad-tabla').removeClass('btn-active-stat');
        document.getElementById('tabla-tarjeta-grupal').style.display = "block";
        $('#stat-tarjeta-tabla').addClass('btn-active-stat');
    } else if(num == 2){
        document.getElementById('tabla-grupal-tipo-gol').style.display = "none";
        document.getElementById('tabla-grupal-cambios').style.display = "none";
        document.getElementById('efectividad-grupal').style.display = "none";
        document.getElementById('tabla-tarjeta-grupal').style.display = "none";
        $('#stat-tarjeta-tabla').removeClass('btn-active-stat');
        $('#stat-tipos-tabla').removeClass('btn-active-stat');
        $('#stat-cambios-tabla').removeClass('btn-active-stat');
        $('#stat-efectividad-tabla').removeClass('btn-active-stat');
        document.getElementById('tabla-grupal-gol').style.display = "block";
        $('#stat-goles-tabla').addClass('btn-active-stat');
    } else if(num == 3){
        document.getElementById('tabla-grupal-gol').style.display = "none";
        document.getElementById('tabla-grupal-cambios').style.display = "none";
        document.getElementById('efectividad-grupal').style.display = "none";
        document.getElementById('tabla-tarjeta-grupal').style.display = "none";
        $('#stat-tarjeta-tabla').removeClass('btn-active-stat');
        $('#stat-goles-tabla').removeClass('btn-active-stat');
        $('#stat-cambios-tabla').removeClass('btn-active-stat');
        $('#stat-efectividad-tabla').removeClass('btn-active-stat');
        document.getElementById('tabla-grupal-tipo-gol').style.display = "block";
        $('#stat-tipos-tabla').addClass('btn-active-stat');
    } else if(num == 4){
        document.getElementById('tabla-grupal-gol').style.display = "none";
        document.getElementById('tabla-grupal-tipo-gol').style.display = "none";
        document.getElementById('efectividad-grupal').style.display = "none";
        document.getElementById('tabla-tarjeta-grupal').style.display = "none";
        $('#stat-tarjeta-tabla').removeClass('btn-active-stat');
        $('#stat-goles-tabla').removeClass('btn-active-stat');
        $('#stat-tipos-tabla').removeClass('btn-active-stat');
        $('#stat-efectividad-tabla').removeClass('btn-active-stat');
        document.getElementById('tabla-grupal-cambios').style.display = "block";
        $('#stat-cambios-tabla').addClass('btn-active-stat');
    } else if(num == 5){
        document.getElementById('tabla-grupal-gol').style.display = "none";
        document.getElementById('tabla-grupal-tipo-gol').style.display = "none";
        document.getElementById('tabla-grupal-cambios').style.display = "none";
        document.getElementById('tabla-tarjeta-grupal').style.display = "none";
        $('#stat-tarjeta-tabla').removeClass('btn-active-stat');
        $('#stat-goles-tabla').removeClass('btn-active-stat');
        $('#stat-tipos-tabla').removeClass('btn-active-stat');
        $('#stat-cambios-tabla').removeClass('btn-active-stat');
        document.getElementById('efectividad-grupal').style.display = "block";
        $('#stat-efectividad-tabla').addClass('btn-active-stat');
    } else {
        document.getElementById('tabla-grupal-gol').style.display = "none";
        document.getElementById('tabla-grupal-tipo-gol').style.display = "none";
        document.getElementById('tabla-grupal-cambios').style.display = "none";
        document.getElementById('efectividad-grupal').style.display = "none";
        document.getElementById('tabla-tarjeta-grupal').style.display = "none";
        $('#stat-tarjeta-tabla').removeClass('btn-active-stat');
        $('#stat-goles-tabla').removeClass('btn-active-stat');
        $('#stat-tipos-tabla').removeClass('btn-active-stat');
        $('#stat-cambios-tabla').removeClass('btn-active-stat');
        $('#stat-efectividad-tabla').removeClass('btn-active-stat');
    } 
}

document.getElementById("select-grupal").addEventListener('change', function(){
    var select = this.value;
    if(select == 1){
        document.getElementById('tabla-grupal-rivales').style.display = "none";
        document.getElementById('tabla-grupal-gol').style.display = "none";
        document.getElementById('tabla-grupal-tipo-gol').style.display = "none";
        document.getElementById('tabla-grupal-cambios').style.display = "none";
        document.getElementById('efectividad-grupal').style.display = "none";
        document.getElementById('tarjetas-grupal').style.display = "block";
    } else if(select == 2){
        document.getElementById('tabla-grupal-rivales').style.display = "none";
        document.getElementById('tabla-grupal-gol').style.display = "block";
        document.getElementById('tabla-grupal-tipo-gol').style.display = "none";
        document.getElementById('tabla-grupal-cambios').style.display = "none";
        document.getElementById('efectividad-grupal').style.display = "none";
        document.getElementById('tarjetas-grupal').style.display = "none";
    } else if(select == 3){
        document.getElementById('tabla-grupal-rivales').style.display = "none";
        document.getElementById('tabla-grupal-gol').style.display = "none";
        document.getElementById('tabla-grupal-tipo-gol').style.display = "block";
        document.getElementById('tabla-grupal-cambios').style.display = "none";
        document.getElementById('efectividad-grupal').style.display = "none";
        document.getElementById('tarjetas-grupal').style.display = "none";
    } else if(select == 4){
        document.getElementById('tabla-grupal-rivales').style.display = "none";
        document.getElementById('tabla-grupal-gol').style.display = "none";
        document.getElementById('tabla-grupal-tipo-gol').style.display = "none";
        document.getElementById('tabla-grupal-cambios').style.display = "block";
        document.getElementById('efectividad-grupal').style.display = "none";
        document.getElementById('tarjetas-grupal').style.display = "none";
    } else if(select == 5){
        document.getElementById('tabla-grupal-rivales').style.display = "none";
        document.getElementById('tabla-grupal-gol').style.display = "none";
        document.getElementById('tabla-grupal-tipo-gol').style.display = "none";
        document.getElementById('tabla-grupal-cambios').style.display = "none";
        document.getElementById('efectividad-grupal').style.display = "block";
        document.getElementById('tarjetas-grupal').style.display = "none";
    } else {
        document.getElementById('tabla-grupal-rivales').style.display = "none";
        document.getElementById('tabla-grupal-gol').style.display = "none";
        document.getElementById('tabla-grupal-tipo-gol').style.display = "none";
        document.getElementById('tabla-grupal-cambios').style.display = "none";
        document.getElementById('efectividad-grupal').style.display = "none";
        document.getElementById('tarjetas-grupal').style.display = "none";        
    }
});