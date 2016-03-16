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
                    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true, targetWidth: 500, targetHeight: 500, destinationType: navigator.camera.DestinationType.DATA_URL });
                } else {
                    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true, targetWidth: 500, targetHeight: 500, sourceType: 0, destinationType: navigator.camera.DestinationType.DATA_URL });
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
                    navigator.camera.getPicture(onPhotoDataSuccess2, onFail, { quality: 20, allowEdit: true, targetWidth: 500, targetHeight: 500, destinationType: navigator.camera.DestinationType.DATA_URL });
                } else {
                    navigator.camera.getPicture(onPhotoDataSuccess2, onFail, { quality: 20, allowEdit: true, targetWidth: 500, targetHeight: 500, sourceType: 0, destinationType: navigator.camera.DestinationType.DATA_URL });
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
function onPhotoDataSuccess(imageData) {
    var photo = document.getElementById('photo');
    photo.style.display = 'block';
    photo.src = "data:image/jpeg;base64," + imageData;
    var xhr = new XMLHttpRequest();
    var send = new FormData();
    send.append('img',photo);
    xhr.open('POST', path + 'app/addEvento');
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(send);
    $.mobile.loading('show');
    xhr.timeout = 10000;
    xhr.ontimeout = function () {
        $.mobile.loading('hide');
        navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
    };

    xhr.onerror = function(e){
        navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
    };

    xhr.onload = function(e){
        alert(this.response);
    }
    //var sendPhoto = document.getElementById('sendPhoto');
    //sendPhoto.style.display = 'block';  
}
function onPhotoDataSuccess2(imageData) {
    var photo = document.getElementById('photo2');
    photo.style.display = 'block';
    photo.src = "data:image/jpeg;base64," + imageData;
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

