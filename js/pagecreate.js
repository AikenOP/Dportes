$(document).on("pagecreate","#editar-equipo", function( event, ui ) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', path + 'app/getRegiones');
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    xhr.onload = function(e){
        if(this.status == 200){
            if(this.response && JSON.parse(this.response)){
                var json = JSON.parse(this.response);
                var inc = '<option value="0">Seleccione una region</option>';
                for(var i = 0; i < json.length; i++ ){
                    inc += "<option value='"+json[i].id_region+"'>"+json[i].nombre+"</option>";
                }
                document.getElementById('mi-eq-region').innerHTML = inc;
                $('#eq-region').selectmenu('refresh');
            }
        }
    }       
});

$(document).on("pagecreate","#registro-equipo", function( event, ui ) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', path + 'app/getRegiones');
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    xhr.onload = function(e){
        if(this.status == 200){
            if(this.response && JSON.parse(this.response)){
                var json = JSON.parse(this.response);
                var inc = '<option value="0">Seleccione una region</option>';
                for(var i = 0; i < json.length; i++ ){
                    inc += "<option value='"+json[i].id_region+"'>"+json[i].nombre+"</option>";
                }
                document.getElementById('reg-eq-region').innerHTML = inc;
                //$('#eq-region').selectmenu('refresh');
            }
        }
    }       
});

$(document).on("pagecreate","#reg-equipo", function( event, ui ) {
	var xhr = new XMLHttpRequest();
    xhr.open('POST', path + 'app/getRegiones');
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    xhr.onload = function(e){
    	if(this.status == 200){
            if(this.response && JSON.parse(this.response)){
            	var json = JSON.parse(this.response);
        		var inc = '<option value="0">Seleccione una region</option>';
        		for(var i = 0; i < json.length; i++ ){
        			inc += "<option value='"+json[i].id_region+"'>"+json[i].nombre+"</option>";
        		}
        		document.getElementById('eq-region').innerHTML = inc;
        		$('#eq-region').selectmenu('refresh');
            }
        }
    }
});

$(document).on("pagecreate","#acciones", function( event, ui ) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', path + 'app/getTiposGoles');
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    xhr.onload = function(e){
        if(this.status == 200){
            if(this.response && JSON.parse(this.response)){
                var json = JSON.parse(this.response);
                var inc = '';
                var inc_c = '';
                for(var i = 0; i < json.length; i++ ){
                    if(json[i].estado == 1){
                        inc += "<div class='jugadas'><span class='texto_jugada'>"+json[i].nombre+"</span>";
                        inc += "<a href='#' data-rel='close' onclick='setGol("+json[i].id_tipo_gol+")'><div class='"+json[i].icono+"'></div></a>";
                        inc += "</div>";
                    }

                    if(json[i].estado == 0){
                        inc_c += "<div class='jugadas'><span class='texto_jugada'>"+json[i].nombre+"</span>";
                        inc_c += "<a href='#' data-rel='close' onclick='setGol("+json[i].id_tipo_gol+")'><div class='"+json[i].icono+"'></div></a>";
                        inc_c += "</div>";
                    }
                }
                document.getElementById('acc-tipo-gol').innerHTML = inc;
                document.getElementById('acc-tipo-gol-contra').innerHTML = inc_c;
                $('#acc-tipo-gol').selectmenu('refresh');
            }
        }
    }  
});