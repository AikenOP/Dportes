//document.getElementById('takePhoto').addEventListener('click',function(){
    //navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, 
    //allowEdit: true, destinationType: navigator.camera.DestinationType.DATA_URL });
//});
document.getElementById('takePhoto').addEventListener('click',function(){
    event.preventDefault();
    navigator.notification.confirm(
        'Seleccione el origen de la imagen',
            function(button){
                if(button == 1){
                    navigator.camera.getPicture(onCapturePhoto, onFail, { quality: 20, allowEdit: true, targetWidth: 500, targetHeight: 500, destinationType: navigator.camera.DestinationType.FILE_URI });
                } else {
                    navigator.camera.getPicture(onCapturePhoto, onFail, { quality: 20, allowEdit: true, targetWidth: 500, targetHeight: 500, sourceType: 0, destinationType: navigator.camera.DestinationType.FILE_URI });
                }
            },
        'Insertar Imagen',
        'Camara,Galeria'
    );
});
document.getElementById('takePhoto2').addEventListener('click',function(){
    event.preventDefault();
    navigator.notification.confirm(
        'Seleccione el origen de la imagen',
            function(button){
                if(button == 1){
                    navigator.camera.getPicture(onPhotoDataSuccess2, onFail, { quality: 20, allowEdit: true, targetWidth: 500, targetHeight: 500, destinationType: navigator.camera.DestinationType.FILE_URI });
                } else {
                    navigator.camera.getPicture(onPhotoDataSuccess2, onFail, { quality: 20, allowEdit: true, targetWidth: 500, targetHeight: 500, sourceType: 0, destinationType: navigator.camera.DestinationType.FILE_URI });
                }
            },
        'Insertar Imagen',
        'Camara,Galeria'
    );
});
//document.getElementById('sendPhoto').addEventListener('click',function(){
    //var sendPhoto = document.getElementById('sendPhoto');
    //sendPhoto.addEventListener('click', sendPhoto, false);
//});
//function sendPhoto() {
    //alert('Imagen enviada al servidor');
//}
//function takePhoto(){
    //alert('hola')
    //navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, 
    // allowEdit: true, destinationType: navigator.camera.DestinationType.DATA_URL });
//}
function onCapturePhoto(imageData) {
    var win = function (r) {
        /*console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);*/
        //alert("Image uploaded Perfil!");
        var photo = document.getElementById('photo');
        photo.style.display = 'block';
        photo.src =  imageData;
    }

    var fail = function (error) {
        alert("An error has occurred: Code = " + error.code);
        /*console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);*/
    }

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageData.substr(imageData.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";

    var params = {};
    params.id_usuario = localStorage.getItem('id');

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(imageData, encodeURI(path + "app/sendPerfilImg"), win, fail, options);
}

function onPhotoDataSuccess2(imageData) {
    var win = function (r) {
        /*console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);*/
        //alert("Image uploaded Perfil!");
        var photo = document.getElementById('photo2');
        photo.style.display = 'block';
        photo.src =  imageData;
    }

    var fail = function (error) {
        alert("An error has occurred: Code = " + error.code);
        /*console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);*/
    }

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageData.substr(imageData.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";

    var params = {};
    params.id_equipo = sessionStorage.getItem('eq_session');

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(imageData, encodeURI(path + "app/sendEquipoImg"), win, fail, options);   

    //var sendPhoto = document.getElementById('sendPhoto');
    //sendPhoto.style.display = 'block';  
}
function onFail(message) {
    //alert('Failed because: ' + message);
}

// deviceready Event Handler
//
// The scope of 'this' is the event. In order to call the 'receivedEvent'
// function, we must explicitly call 'app.receivedEvent(...);'
// Update DOM on a Received Event
//receivedEvent: function(id) {
    //var parentElement = document.getElementById(id);
    //var listeningElement = parentElement.querySelector('.listening');
    //var receivedElement = parentElement.querySelector('.received');
    //listeningElement.setAttribute('style', 'display:none;');
    //receivedElement.setAttribute('style', 'display:block;');
    //console.log('Received Event: ' + id);
//}

