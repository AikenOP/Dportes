function contactos(){


	this.getContacts = function(){
		try{
	    var options = new ContactFindOptions();
	    options.filter = "";
	    options.multiple = true;
	    filter = ["displayName", "name"];
	    navigator.contacts.find(filter, function(){
		    for (var i = 0; i < contacts.length; i++) {
		        alert("Formatted: "  + contacts[i].name.formatted       + "\n" +
		            "Family Name: "  + contacts[i].name.familyName      + "\n" +
		            "Given Name: "   + contacts[i].name.givenName       + "\n" +
		            "Middle Name: "  + contacts[i].name.middleName      + "\n" +
		            "Number: "       + contacts[i].phoneNumbers[0].value + "\n" +
		            "Prefix: "       + contacts[i].name.honorificSuffix);
		    }
	    }, function(){alert('onError!');}, options);
		} catch(e){
			alert(e);
		}
	}
}
