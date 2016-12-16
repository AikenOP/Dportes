function contactos(){


	this.getContacts = function(){
	    var options = new ContactFindOptions();
	    options.filter = "";
	    options.multiple = true;
	    var filter = ["displayName", "name"];
	    navigator.contacts.find(filter, this.onSuccess, this.onError, options);
	}


	this.onSuccess = function(contacts){
		alert(JSON.stringify(contacts));
		var inc = '';
		var logo = '';
	    for (var i = 0; i < contacts.length; i++) {

	    	if(contacts[i].phoneNumbers != null){
	    		inc += "<li data-icon='false' onclick='getNumeroFono(\""+contacts[i].phoneNumbers[0].value+"\",\""+contacts[i].name.formatted+"\")'>";
            	inc += "<div class='imagen_jugador'><img src='jquerymobile/img-dportes/foto.png'></div>";
            	inc += "<h2>"+contacts[i].name.formatted+"</h2>";
            	inc += "</li>";
        	}
	        /*alert("Formatted: "  + contacts[i].name.formatted       + "\n" +
	            "Family Name: "  + contacts[i].name.familyName      + "\n" +
	            "Given Name: "   + contacts[i].name.givenName       + "\n" +
	            "Middle Name: "  + contacts[i].name.middleName      + "\n" +
	            "Number: "       + contacts[i].phoneNumbers[0].value + "\n" +
	            "Prefix: "       + contacts[i].name.honorificSuffix);*/
	    }
	    $('#contactos-list').html(inc).listview('refresh');
	    		
	}

	this.onError = function(contactError){
		alert('error');
	}
}


function getNumeroFono(fono,nombre){
	var jg = new jugadores();
	jg.nombre = nombre;
	jg.fono = fono;
	jg.addJugadorContacto();
	delete jg;
	//alert(nombre + " " + fono);
}

function successCallback(result) {
  //alert(result);
}
 
function errorCallback(error) {
  //alert(error);
}

document.getElementById('add-contact').addEventListener('click',function(){
	event.preventDefault();
    $.mobile.navigate("#contacts", {transition: "fade"});
});

