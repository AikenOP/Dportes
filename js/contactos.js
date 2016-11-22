function contactos(){


	this.getContacts = function(){
	    var options = new ContactFindOptions();
	    options.filter = "";
	    options.multiple = true;
	    filter = ["displayName", "name"];
	    navigator.contacts.find(filter, this.onSuccess, this.onError, options);
	}


	this.onSuccess = function(contacts){
		var inc = '';
		var logo = '';
	    for (var i = 0; i < contacts.length; i++) {
	    	inc += "<li data-icon='false' class='li-padding'>";
            inc += "<div class='imagen_jugador'><img src='jquerymobile/img-dportes/foto.png'></div>";
            inc += "<h2>"+contacts[i].name.formatted+"</h2>";
            inc += "</li>";
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
	
