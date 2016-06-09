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
        	if(this.status == 200){
                if(this.response && JSON.parse(this.response)){
                	var json = JSON.parse(this.response);
                    var now = +(new Date);
                    var inc = '';
                    for(var i = 0; i < json.length; i++ ){
                    	inc += "<li data-icon='false'>";
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
}