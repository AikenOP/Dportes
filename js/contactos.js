function contactos(){


	this.getContacts = function(){
		alert('dd');
	    var options = new ContactFindOptions();
	    options.filter = "";
	    options.multiple = true;
	    filter = ["displayName", "name"];
	    navigator.contacts.find(filter, onSuccess, onError, options);
	}
}

	function onSuccess(){
		alert('ee');
	    for (var i = 0; i < contacts.length; i++) {
	        alert("Formatted: "  + contacts[i].name.formatted       + "\n" +
	            "Family Name: "  + contacts[i].name.familyName      + "\n" +
	            "Given Name: "   + contacts[i].name.givenName       + "\n" +
	            "Middle Name: "  + contacts[i].name.middleName      + "\n" +
	            "Number: "       + contacts[i].phoneNumbers[0].value + "\n" +
	            "Prefix: "       + contacts[i].name.honorificSuffix);
	    }
	}

	function onError(){
		alert('error');
	}

document.getElementById('pg-contact').addEventListener('click',function(){
	alert('ww');
	var ctc = new contactos();
	ctc.getContacts();
	delete ctc;
});
	
