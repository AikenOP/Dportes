//CLASS EQUIPOS

function equipos(){

	this.nombre
	this.descripcion
	this.logo
	this.dporte
	this.comuna = 0
	this.estado

	this.checkEquipo = function(){
		var xhr = new XMLHttpRequest();
		var form = new FormData();
		form.append('equipo',this.nombre);
	    xhr.open('POST', path + 'app/checkEquipo');
	    xhr.setRequestHeader('Cache-Control', 'no-cache');
	    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	    xhr.send(form);
	    xhr.onload = function(e){
	    	if(this.status == 200){
	    		if(this.response){
	    			document.getElementById('reg-disponible').style.display = "none";
	    			document.getElementById('reg-no-disponible').style.display = "block";
	    		} else {
	    			document.getElementById('reg-disponible').style.display = "block";
	    			document.getElementById('reg-no-disponible').style.display = "none";
	    		}
	    	}
	    }
	}

	this.getEquipo = function(){
        //alert(sessionStorage.getItem('eq_session'));
		var xhr = new XMLHttpRequest();
		var send = new FormData();
		send.append('id',sessionStorage.getItem('eq_session'));
	    xhr.open('POST', path + 'app/getEquipo');
	    xhr.setRequestHeader('Cache-Control', 'no-cache');
	    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	    xhr.send(send);
        xhr.timeout = 10000;
        xhr.onprogress = function(e){
            $.mobile.loading('show');
        }	
        xhr.ontimeout = function(e){
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');   
        }
        xhr.onload = function(e){
        	//alert(this.response);
        	$.mobile.loading('hide');
        	if(this.status == 200){
	    		if(this.response && JSON.parse(this.response)){
	    			var json = JSON.parse(this.response);
	    			var photo = document.getElementById('photo2');
                    photo.style.display = 'block';
    				if(json.logo != null){
                    	photo.src =  path + 'equipos/' + json.id_equipo + '/logos/' + json.logo;
                	} else {
                		photo.src = "jquerymobile/img-dportes/logo-encuentro.png";
                	}
	    			document.getElementById('edit-equipo').innerHTML = json.nombre;
	    			document.getElementById('edit-eq-nombre').value = json.nombre;
	    			$("#mi-eq-region").val(json.id_region);
	    			$('#mi-eq-region').selectmenu('refresh');
	    			document.getElementById('edir-eq-region').value = 'No Disponible';
	    			document.getElementById('edit-eq-comuna').value = 'No Disponible';
	    		}
	    	}
        }
	}

	this.setEquipo = function(){
		var xhr = new XMLHttpRequest();
		var send = new FormData();
		send.append('id',sessionStorage.getItem('eq_session'));
		send.append('nombre',this.nombre);
	    xhr.open('POST', path + 'app/setEquipo');
	    xhr.setRequestHeader('Cache-Control', 'no-cache');
	    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	    xhr.send(send);
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
	    		if(this.response){
	    			$.mobile.navigate("#mis-equipos", {transition: "fade"});
	    		}
	    	}
	    }		
	}

	this.addEquipo = function(){
		var xhr = new XMLHttpRequest();
		var send = new FormData();
		send.append('id',localStorage.getItem('id'));
		send.append('nombre_equipo',this.nombre);
		send.append('comuna',this.comuna);
		send.append('dporte_equipo',1);
	    xhr.open('POST', path + 'app/addEquipo');
	    xhr.setRequestHeader('Cache-Control', 'no-cache');
	    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	    xhr.send(send);
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
	    		if(this.response){
	    			$.mobile.navigate("#mis-equipos", {transition: "fade"});
	    		}
	    	}
	    }		
	}

	this.getMisEquipos = function(){
		var xhr = new XMLHttpRequest();
		var send = new FormData();
		send.append('id',localStorage.getItem('id'));
	    xhr.open('POST', path + 'app/getMisEquipos');
	    xhr.setRequestHeader('Cache-Control', 'no-cache');
	    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	    xhr.send(send);
        xhr.timeout = 10000;
        xhr.onprogress = function(e){
            $.mobile.loading('show');
        }
        xhr.ontimeout = function(e){
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');   
        }
        xhr.onload = function(e){
	    	if(this.status == 200){
	    		if(this.response){
	    			var json = JSON.parse(this.response);
	    			var logo = '';
	    			var inc = '';
	    			var flagged = '';
	    			var disabled = '';
	    			var deleteDisabled = '';
	    			var click = '';

	    			if(json.length != 0){
            			inc = "<ul id='eq-list' class='touch' data-role='listview' data-icon='false' data-split-icon='delete' data-inset='false'>";
            			inc += "</ul>";
            			inc += "<a href='#reg-equipo'><div class='agregar_nuevo_equipo'></div></a>";
            			$('#content-eq-list').html(inc).trigger('create');
            			inc = '';
	    				
		    			for(var i = 0; i < json.length; i++ ){
		    				if(json[i].id_equipo == localStorage.getItem('equipo')){
		    					flagged = '';
		    					disabled = 'ui-state-disabled';
		    				} else {
		    					flagged = 'ui-screen-hidden';
		    					disabled = '';
		    				}
		    				if(json[i].rol == 1){
		    					deleteDisabled = 'ui-state-disabled';
		    					click = "onclick='redirectEquipo("+json[i].id_equipo+")'";
		    				} else {
		    					click = '';
		    					deleteDisabled = '';
		    				}
		    				if(json[i].logo != null){
		    					logo = path + 'equipos/' + json[i].id_equipo + '/logos/' + json[i].logo;
		    				} else {
		    					logo = 'jquerymobile/img-dportes/logo-encuentro.png';
		    				}

		                    inc += "<li value='"+json[i].id_equipo+"' class='li-padding'>";
		                    inc += "<input id='eq_r"+json[i].id_equipo+"' type='hidden' value='"+json[i].rol+"'>";
		                    inc += "<span class='delete "+deleteDisabled+"'>";
		                    inc += "<div class='centra_texto' onclick='deleteEquipo("+json[i].id_equipo+");'>Salir</div>";
		                    inc += "</span>";
		                    inc += "<span class='flag "+disabled+"'>";
		                    inc += "<div class='centra_texto'>Elegir</div>";
		                    inc += "</span>";
		                    inc += "<a href='#' "+click+" draggable='false'><img src='"+logo+"'>";
		                    inc += "<h2>"+json[i].nombre+"</h2>";
		                    inc += "<span class='flagged "+flagged+"'>";
		                    inc += "</span>";
		                    inc += "</a>";
		                    inc += "</li>";
		    			}
		    			$("#eq-list").html(inc).listview('refresh');
                	} else {
                        inc = "<div style='text-align:center;'>";
                        inc += "<img src='jquerymobile/img-dportes/imagen-sin-datos.png' width='138'>";
                        inc += "</div>";
                        inc += "<p style='text-align:center; color:#868686; font-size:17px; text-shadow:none;'>No tienes equipos asignados</p>";
                		$('#content-eq-list').html(inc).trigger('create');
                	}
               		$.mobile.loading('hide');
	    		}
	    	}
        }
	}

	this.setSwipe = function(){
		$( document ).on("swipeleft", "ul#eq-list li a", function (e) {
	    $(this).prevAll("span").addClass("show");
	    $(this).off("click").blur();
	    $(this).css({
	         	transform: "translateX(-139px)" //139
	    	}).one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function () {
		    	$(this).one("swiperight", function () {
		        	$(this).prevAll("span").removeClass("show");
		        	$(this).css({
		            	transform: "translateX(0)"
		        	}).blur();
		    	});
	    	});
		}).on("click", "ul li span.flag", function () {
		    var text = $("div", this),
		        button = $(this).siblings("a"),
		        flagged = button.find(".flagged").hasClass("ui-screen-hidden") ? false : true;
		    if (!flagged) {
		    	$("ul#eq-list li span.flag").removeClass("ui-state-disabled");
		    	$("ul#eq-list li span.flagged").addClass("ui-screen-hidden");
		        //button.find(".flagged").removeClass("ui-screen-hidden");
		        $(this).addClass('ui-state-disabled');
		        button.find(".flagged").removeClass("ui-screen-hidden");
		        localStorage.setItem('equipo',$(this).parent().val());
		        localStorage.setItem('rol_equipo',$("#eq_r"+$(this).parent().val()).val());
		        localStorage.setItem('nombre_equipo',$(this).parent().find("h2").html());
		        //text.text("");
		    }
	}).on("click", "ul li span.delete", function () {
		var xhr = new XMLHttpRequest();
		var send = new FormData();
		var span = $(this);
		var id = $(this).parent().val();
		//alert(localStorage.getItem('equipo'));
		send.append('id',localStorage.getItem('id'));
		send.append('id_equipo',$(this).parent().val());
		xhr.open('POST', path + 'app/removeMisEquipos');
		xhr.setRequestHeader('Cache-Control', 'no-cache');
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xhr.send(send);
	    xhr.timeout = 10000;
	    xhr.onprogress = function(e){
	        $.mobile.loading('show');
	    }
	    xhr.ontimeout = function(e){
	        navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');   
	    }
	    xhr.onload = function(e){
			if(this.status == 200){
                    var listview = span.closest("ul");
                    $(".ui-content").css({
                        overflow: "hidden"
                    });
                    span.parent().css({
                        display: "block"
                    }).animate({
                        opacity: 0
                    }, {
                        duration: 250,
                        queue: false
                    }).animate({
                        height: 0
                    }, 300, function () {
                        $(this).remove();
                        listview.listview("refresh");
                        $(".ui-content").removeAttr("style");
                    });
			}
		}
	});
	}

}

function deleteEquipo(eq){
	/*var xhr = new XMLHttpRequest();
	var send = new FormData();
	send.append('id',localStorage.getItem('id'));
	send.append('id_equipo',eq);
	xhr.open('POST', path + 'app/removeMisEquipos');
	xhr.setRequestHeader('Cache-Control', 'no-cache');
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.send(send);
    xhr.timeout = 10000;
    xhr.onprogress = function(e){
        $.mobile.loading('show');
    }
    xhr.ontimeout = function(e){
        navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');   
    }
    xhr.onload = function(e){
		if(this.status == 200){

		}
	}*/
}

function setEquipo(){
	var eq = new equipos();
	eq.nombre = document.getElementById('edit-eq-nombre').value;
	eq.setEquipo();
	delete eq;
}

function redirectEquipo(eq){
	sessionStorage.setItem("eq_session",eq);
	$.mobile.navigate("#editar-equipo", {transition: "fade"});
}


document.getElementById('btn-reg-equipo').addEventListener('click',function(){
	event.preventDefault();
	var eq = new equipos();
	eq.nombre = document.getElementById('reg-nom-equipo').value;
	eq.comuna = document.getElementById('eq-comuna').value;
	eq.addEquipo();
	delete eq;
});
