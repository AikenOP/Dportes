    $(document).on('pagecontainerbeforeshow', function (e, ui) {

        var activePage = $(':mobile-pagecontainer').pagecontainer('getActivePage').attr('id');

        if(activePage === 'login'){
            //alert(localStorage.getItem('equipo'));
        }

        if(activePage === 'index') {
            document.addEventListener("deviceready", onDeviceReady, false);

            function onDeviceReady(){
                Chart.defaults.global.responsive = false;
                setTimeout(function(){ 
                    if(localStorage.getItem('login')){
                        $.mobile.navigate("#home", {transition: "fade"});
                    } else {
                        $.mobile.navigate("#login", {transition: "fade"});
                    }
                }, 4000);
            }
        }

        if(activePage === 'home'){
            //alert(localStorage.getItem('nombre_usuario'));
            //alert(localStorage.getItem('dporte'));

            localStorage.setItem('dporte',1);
            if(localStorage.getItem("rol_equipo") == 1 || localStorage.getItem("rol_equipo") == 4){
                $('#home-pg').removeClass('ui-state-disabled');
            } else {
                $('#home-pg').addClass('ui-state-disabled');           
            }

            if(localStorage.getItem('equipo')){
                $('#home-add-jg').removeClass('ui-state-disabled');
                $('#nav-jg').removeClass('ui-state-disabled');
                $('#home-stat').removeClass('ui-state-disabled');
                $('#nav-stat').removeClass('ui-state-disabled');
                var jg = new jugadores();
                jg.setRolEquipo();
            } else {
                $('#home-add-jg').addClass('ui-state-disabled');
                $('#nav-jg').addClass('ui-state-disabled');
                $('#home-stat').addClass('ui-state-disabled');
                $('#nav-stat').addClass('ui-state-disabled');
            }
            $('#home-jg').removeClass('ui-state-disabled');
            swipe('#home','#menu_perfil','right');
            clearGame();
            closeSessionEvents();

            //GLOBOS
            var notifica = new notificaciones();
            notifica.getTotalNotificacionesByUsuario();
            delete notifica;

            var vota = new votaciones();
            vota.id_equipo = localStorage.getItem('equipo');
            vota.getTotalVotacionesAbiertas();
            delete vota;

            document.getElementById('tyc-back').href = '#'+activePage;
            document.getElementById('jg-rel-back').href = "#home";
            try{
                var push = PushNotification.init({
                    android: {
                        senderID: "941293805259"
                    },
                    ios: {
                        alert: "true",
                        badge: "true",
                        sound: "true",
                        clearBadge: "true"
                    },
                    windows: {}
                });

                push.on('registration', function(data) {
                    var reg = new registro();
                    reg.key = data.registrationId;
                    reg.setKeyByUsuario();
                });

                push.on('notification', function(data) {
                        // data.message,
                        // data.title,
                        // data.count,
                        // data.sound,
                        // data.image,
                        // data.additionalData
                });

                push.on('error', function(e) {
                    // e.message
                });
            } catch(err){
                //alert(err);
            }
        }

        if(activePage === 'mi-perfil'){
            var user = new usuarios();
            user.id_usuario = localStorage.getItem('id');
            user.getUsuario();
            delete user;
            swipe('#mi-perfil','#menu_perfil','right');
        }

        if(activePage === 'configuraciones'){
            swipe('#configuraciones','#menu_perfil','right');
        }

        if(activePage === 'cambio-clave'){
            document.getElementById('conf-password').value = '';
            document.getElementById('conf-matches').value = '';
            document.getElementById('conf-error-pass').style.display = "none";
            document.getElementById('conf-error-matches').style.display = "none";
            document.getElementById('conf-correcto').style.display = "none";
            swipe('#cambio-clave','#menu_perfil','right');
        }

        if(activePage === 'registro-equipo'){
            var dp = new dportes();
            dp.getDportes();
            delete dp;
        }

        if(activePage === 'estadisticas'){
            var stat = new estadisticas();
            stat.evento = sessionStorage.getItem('evento');
            stat.equipo = localStorage.getItem('equipo');
            stat.getEstadisticasPage();
            delete stat;

            swipeEstadisticas('#estadisticas');
            var jg = new jugadores();
            jg.getJugadoresEstadisticas();
            delete jg;

            if(sessionStorage.getItem('periodosJugados')){
                var hasta = document.getElementById('pg-periodo').value;
                periodos = JSON.parse(sessionStorage.getItem('periodosJugados'));
                if(periodos.length >= hasta){
                    document.getElementById('stat-tiempo').innerHTML = 'Finalizar';
                    document.getElementById('stat-tiempo').href = '#home';
                    document.getElementById('stat-tiempo').setAttribute('onclick','closeEvent();');
                    document.getElementById('stat-forward-rel').href = '#home';
                    $('#stat-extra').removeClass('ui-state-disabled');
                    if(sessionStorage.getItem("extra")){
                        document.getElementById('stat-extra').innerHTML = "Extra 2";
                    } else {
                        document.getElementById('stat-extra').innerHTML = "Extra 1";
                    }
                } else {
                    document.getElementById('stat-tiempo').innerHTML = '2do Tiempo';
                    setPeriodoLocal(2,'Segundo Tiempo');
                    document.getElementById('stat-tiempo').href = '#acciones';
                    document.getElementById('stat-tiempo').removeAttribute('onclick');
                    document.getElementById('stat-forward-rel').href = '#acciones';
                    $('#stat-extra').addClass('ui-state-disabled');
                    $('#stat-tiempo-penales').addClass('ui-state-disabled');
                }
            }
            swipe('#estadisticas','#menu_perfil','right'); 
        }

        if(activePage === 'p-pro'){
            sessionStorage.removeItem('evento');
            var ev = new eventos();
            ev.equipo  = localStorage.getItem('equipo');
            ev.getProgramados();
            delete ev;
        }

        if(activePage === 'add-partido'){
            $("select#pg-periodo").selectmenu("refresh");
            if(sessionStorage.getItem('evento')){

                document.getElementById('pg-fecha').type = "text";
                var ev = new eventos();
                ev.id_evento = sessionStorage.getItem('evento');
                ev.getEvento();
                delete ev;
                
                document.getElementById('suspender-partido').style.display = "block";
                document.getElementById('pg-registro-next').style.display = "block";
                document.getElementById('pg-boton-continuar').style.display = "none";
            } else {
                clearGame();
                document.getElementById('suspender-partido').style.display = "none";
                document.getElementById('pg-registro-next').style.display = "none";
                document.getElementById('pg-boton-continuar').style.display = "block";
            }

            if(localStorage.getItem('dporte') == 1){
                document.getElementById('pg-periodo-display').style.display = "block";
            } else if(localStorage.getItem('dporte') == 2){
                document.getElementById('pg-periodo-display').style.display = "none";
            }
            document.getElementById('pg-nombre-error').style.display = "none";
            document.getElementById('pg-ubicacion-error').style.display = "none";
            document.getElementById('pg-fecha-error').style.display = "none";
            document.getElementById('pg-hora-error').style.display = "none";
            document.getElementById('pg-periodo-error').style.display = "none";
        }

        if(activePage === 'detalle-jugador'){
            swipe('#detalle-jugador','#menu_perfil','right');
            document.getElementById('dt-nombre').innerHTML =  sessionStorage.getItem('dt_nombre');
            document.getElementById('dt-posicion').innerHTML = 'Posición: '+sessionStorage.getItem('dt_posicion');
            var stat = new estadisticas;
            stat.evento = sessionStorage.getItem('evento');
            stat.equipo = localStorage.getItem('equipo');
            stat.usuario = sessionStorage.getItem('jugador');
            stat.getEstadisticasByJugador();
            //sessionStorage.removeItem('dt_nombre');
            //sessionStorage.removeItem('dt_posicion');
        }

        if(activePage === 'historial-stat'){
            $.mobile.loading('show');

            var partidos = new eventos();
            partidos.equipo = localStorage.getItem('equipo');
            partidos.bool = true;
            partidos.getHistorialPartidos();
            delete partidos;

            var jg = new jugadores();
            jg.getJugadoresEstadisticasAcumuladas();
            delete jg;

            var tabl = new tablas();
            tabl.getTarjetasGrupales();
            tabl.getGolesGrupales();
            tabl.getTiposGolesGrupales();
            tabl.getCambios();
            tabl.getEfectividadGrupalesByJugador();
            tabl.getEfectividadGrupalesByPosicion();
            tabl.getEfectividadGrupalesByJugada();
            delete tabl;


            //$("#custom-navbar").navbar();

            document.getElementById('grup-nombre-equipo').innerHTML = localStorage.getItem('nombre_equipo');
            document.getElementById('botones-estadisticos').style.display = "none";
            document.getElementById('stat-back-rel').style.display = "block";
            document.getElementById('stat-forward-rel').href = "#menu_perfil";
            document.getElementById('stat-forward-rel').innerHTML = "<div class='icono-menu-right'></div>";
            document.getElementById('stat-back-rel').href = '#historial-stat';
            document.getElementById('tyc-back').href = '#'+activePage;
            swipe('#historial-stat','#menu_perfil','right');        
        }

        if(activePage === 'stat-jugador-individual'){
            var tb = new tablas();
            tb.getIndividualAcumulada();
            delete tb;
            document.getElementById('ind-nombre').innerHTML =  sessionStorage.getItem('pi_nombre');
            document.getElementById('ind-posicion').innerHTML = 'Posición: '+sessionStorage.getItem('pi_posicion');         
        }

        if(activePage === 'jugadores-equipo'){
            if(localStorage.getItem('equipo')){
                $('#add-jg-eq').removeClass('ui-state-disabled');
            } else {
                $('#add-jg-eq').addClass('ui-state-disabled');
            }
            var jg = new jugadores();
            jg.id_equipo = localStorage.getItem('equipo');
            jg.getJugadoresEquipo();
            jg.getDeleteFunction();
            swipe('#jugadores','#menu_perfil','right');
            document.getElementById('jg-rel-back').href = '#'+activePage;
            document.getElementById('tyc-back').href = '#'+activePage;
            document.getElementById('jug-nom-eq').innerHTML = String(localStorage.getItem('nombre_equipo'));
            delete jg;
            //swipe('#jugadores-equipo','#menu_perfil','right');
        }

        if(activePage === 'editar-jugador'){
            var jg = new jugadores();
            jg.id_jugador = sessionStorage.getItem('jg_session');
            jg.rol_usuario = sessionStorage.getItem('rol_session');
            jg.id_equipo = localStorage.getItem('equipo');
            jg.getJugador();
            delete jg;
        }

        if(activePage === 'panel-juego'){
            swipe('#panel-juego','#menu_perfil','right');        
        }

        if(activePage === 'acciones'){
            document.getElementById('botones-estadisticos').style.display = "block";
            document.getElementById('stat-back-rel').style.display = "none"; 
            document.getElementById('stat-forward-rel').innerHTML = "<div class='fl-derecha'></div>";
            document.getElementById('stat-forward-rel').href = '#panel-juego';
            cronometro();
        }

        if(activePage === 'seleccionar-titulares'){
           document.getElementById('jg-rel-back').href = "#seleccionar-titulares"; 
        }

        if(activePage === 'add-jugadores'){
           swipe('#add-jugadores','#menu_perfil','right'); 
        }

        if(activePage === 'cambio-jugador'){
            var jg = new jugadores();
            jg.getJugadoresReserva();
            delete jg;
        }

        if(activePage === 'mis-equipos'){
            var eq = new equipos();
            eq.setSwipe();
            eq.getMisEquipos();
            delete eq;
            //swipe('#mis-equipos','#menu_perfil','right');
        }

        if(activePage === 'editar-equipo'){
            var eq = new equipos();
            eq.getEquipo();
            delete eq;
            swipe('#editar-equipo','#menu_perfil','right');
        }

        if(activePage === 'como-usar'){
            swipe('#como-usar','#menu_perfil','right');
        }

        if(activePage === 'acerca'){
            swipe('#acerca','#menu_perfil','right');
        }

        if(activePage === 'detalle-jugador-prueba'){
            var radarChartData = {
                    labels: ["Asistencia", "Quites", "Tiros de esquina", "Tiros libres", "Tiros al arco"],
                    datasets: [
                        {
                            label: "Desempeño Promedio",
                            fillColor: "rgba(220,220,220,0.2)",
                            strokeColor: "rgba(220,220,220,1)",
                            pointColor: "rgba(220,220,220,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: [65,59,90,81,56]
                        },
                        {
                            label: "Desempeño Actual",
                            fillColor: "rgba(151,187,205,0.2)",
                            strokeColor: "rgba(151,187,205,1)",
                            pointColor: "rgba(151,187,205,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(151,187,205,1)",
                            data: [28,48,40,19,96]
                        }
                    ]
                };
                var newChart = new Chart(document.getElementById("radar").getContext("2d")).Radar(radarChartData);
        }

        if(activePage === 'grafico-pie'){
            Chart.defaults.global.pointHitDetectionRadius = 1;
            Chart.defaults.global.customTooltips = function(tooltip) {
                var tooltipEl = $('#chartjs-tooltip_');
                if (!tooltip) {
                    tooltipEl.css({
                        opacity: 10
                    });
                    return;
                }
                tooltipEl.removeClass('above below');
                tooltipEl.addClass(tooltip.yAlign);
                var innerHtml = '';
                for (var i = tooltip.labels.length - 1; i >= 0; i--) {
                    innerHtml += [
                        '<div class="chartjs-tooltip-section">',
                        '   <span class="chartjs-tooltip-key" style="background-color:' + tooltip.legendColors[i].fill + '"></span><p>Tool tip</p>',
                        '   <span class="chartjs-tooltip-value">' + tooltip.labels[i] + '</span>',
                        '</div>'
                    ].join('');
                }
                tooltipEl.html(innerHtml);
                tooltipEl.css({
                    opacity: 1,
                    left: tooltip.chart.canvas.offsetLeft + tooltip.x + 'px',
                    top: tooltip.chart.canvas.offsetTop + tooltip.y + 'px',
                    fontFamily: tooltip.fontFamily,
                    fontSize: tooltip.fontSize,
                    fontStyle: tooltip.fontStyle,
                });
            };
            var randomScalingFactor = function() {
                return Math.round(Math.random() * 100);
            };
            var lineChartData = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
                }, {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
                }]
            };
            window.onload = function() {
                var ctx1 = document.getElementById("chart1").getContext("2d");
                window.myLine = new Chart(ctx1).Line(lineChartData, {
                    showScale: false,
                    pointDot : true,
                    responsive: true
                });
                var ctx2 = document.getElementById("chart2").getContext("2d");
                window.myLine = new Chart(ctx2).Line(lineChartData, {
                    responsive: true
                });
            };
        }

        if(activePage === 'seguimiento-jugador-prueba'){
            var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
            var lineChartData = {
                labels : ["January","February","March","April","May","June","July"],
                datasets : [
                    {
                        label: "My First dataset",
                        fillColor : "rgba(220,220,220,0.2)",
                        strokeColor : "rgba(220,220,220,1)",
                        pointColor : "rgba(220,220,220,1)",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(220,220,220,1)",
                        data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
                    },
                    {
                        label: "My Second dataset",
                        fillColor : "rgba(151,187,205,0.2)",
                        strokeColor : "rgba(151,187,205,1)",
                        pointColor : "rgba(151,187,205,1)",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(151,187,205,1)",
                        data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
                    }
                ]
            }
            var ctx = document.getElementById("jugada").getContext("2d");
            var newChart = new Chart(ctx).Line(lineChartData);
        }

        if(activePage === 'seguimiento-equipo-rival-prueba'){
            var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
            var lineChartData = {
                labels : ["January","February","March","April","May","June","July"],
                datasets : [
                    {
                        label: "My First dataset",
                        fillColor : "rgba(220,220,220,0.2)",
                        strokeColor : "rgba(220,220,220,1)",
                        pointColor : "rgba(220,220,220,1)",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(220,220,220,1)",
                        data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
                    },
                    {
                        label: "My Second dataset",
                        fillColor : "rgba(151,187,205,0.2)",
                        strokeColor : "rgba(151,187,205,1)",
                        pointColor : "rgba(151,187,205,1)",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(151,187,205,1)",
                        data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
                    }
                ]
            }
            var ctx = document.getElementById("rivales").getContext("2d");
            var newChart = new Chart(ctx).Line(lineChartData);
        }

        if(activePage === 'amarillas'){
            var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
            var lineChartData = {
                labels : ["January","February","March","April","May","June","July"],
                datasets : [
                    {
                        label: "My First dataset",
                        fillColor : "rgba(220,220,220,0.2)",
                        strokeColor : "rgba(220,220,220,1)",
                        pointColor : "rgba(220,220,220,1)",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(220,220,220,1)",
                        data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
                    },
                    {
                        label: "My Second dataset",
                        fillColor : "rgba(151,187,205,0.2)",
                        strokeColor : "rgba(151,187,205,1)",
                        pointColor : "rgba(151,187,205,1)",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(151,187,205,1)",
                        data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
                    }
                ]
            }
            var ctx = document.getElementById("amarilla-tarjeta").getContext("2d");
            var newChart = new Chart(ctx).Line(lineChartData);
        }

        if(activePage === 'seguimiento-jugador'){
            var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
            var lineChartData = {
                labels : ["January","February","March","April","May","June","July"],
                datasets : [
                    {
                        label: "My First dataset",
                        fillColor : "rgba(220,220,220,0.2)",
                        strokeColor : "rgba(220,220,220,1)",
                        pointColor : "rgba(220,220,220,1)",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(220,220,220,1)",
                        data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
                    },
                    {
                        label: "My Second dataset",
                        fillColor : "rgba(151,187,205,0.2)",
                        strokeColor : "rgba(151,187,205,1)",
                        pointColor : "rgba(151,187,205,1)",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(151,187,205,1)",
                        data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
                    }
                ]
            }
            var ctx = document.getElementById("seguimiento-jugador-graf").getContext("2d");
            var newChart = new Chart(ctx).Line(lineChartData);
        }

        if(activePage === 'notificaciones'){
            var notifica = new notificaciones();
            notifica.getNotificaciones();
            notifica.setVistoAvisos();
            delete notifica;
        }

        if(activePage === 'asistencia'){
            var asistencia = new notificaciones();
            asistencia.getAsistencia();
            asistencia.getInfo();
            delete asistencia;
        }

        if(activePage === 'justificacion'){
            var au = new ausencias()
            au.getTiposAusencias();
        }

        if(activePage === 'drag-drop'){
            var jg = new jugadores();
            jg.getTitularesPosiciones();
            delete jg;
        }

        if(activePage === 'pg-votaciones'){
            var vc = new votaciones();
            vc.id_equipo = localStorage.getItem('equipo');
            vc.getVotaciones();
            delete vc;
        }

        if(activePage === 'votaciones'){
            var vc = new votaciones();
            vc.id_equipo = localStorage.getItem('equipo');
            vc.id_evento = sessionStorage.getItem('evento');
            vc.id_usuario = localStorage.getItem('id');
            vc.getJugadoresVotaciones();
            delete vc;
        }

        if(activePage === 'podio'){
            var vc = new votaciones();
            vc.id_equipo = localStorage.getItem('equipo');
            vc.id_evento = sessionStorage.getItem('evento');
            vc.getPodio();
            delete vc;
        }

        if(activePage === 'contacts'){
            var ctc = new contactos();
            ctc.getContacts();
            delete ctc;
        }

    });