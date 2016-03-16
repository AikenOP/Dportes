function usuarios(){

    this.id_usuario
    this.nombre
    this.correo
    this.fecha
    this.sexo

    this.getUsuario = function(){
    	var xhr = new XMLHttpRequest();
    	var send = new FormData();
        send.append('id_usuario',this.id_usuario);
        xhr.open('POST', path + 'app/getUsuario');
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
            if(this.status == 200){
                if(this.response && JSON.parse(this.response)){
                    var json = JSON.parse(this.response);
                    var inc = '';
                    document.getElementById('perfil-usuario').innerHTML = ucwords(json.nombre) + ' ' + ucwords(json.apellido_paterno);
                    document.getElementById('perfil-nombre').value = json.nombre + ' ' + json.apellido_paterno;
                    document.getElementById('perfil-correo').value = json.email;
                    document.getElementById('perfil-fecha').value = json.fecha_nacimiento;
                    $('#perfil-sexo').val(json.sexo).prop('selected', true);
                    $('#perfil-sexo').selectmenu('refresh');
                }
            }
        };
    }

    this.setUsuarioPerfil = function(){
        var xhr = new XMLHttpRequest();
        var send = new FormData();
        send.append('id',this.id_usuario);
        send.append('nombre_usuario',this.nombre);
        send.append('email_usuario',this.correo);
        send.append('fecha',this.fecha);
        send.append('sexo',this.sexo);
        xhr.open('POST', path + 'app/setUsuarioPerfil');
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
            if(this.status == 200){
                if(this.response){
                    $.mobile.navigate("#home", {transition: "fade"});
                }
            }
        };
    }
}

document.getElementById('perfil-save').addEventListener('click',function(){

    event.preventDefault();
    var user = new usuarios();
    user.id_usuario = localStorage.getItem('id');
    user.nombre = document.getElementById('perfil-nombre').value;
    user.correo = document.getElementById('perfil-correo').value;
    user.fecha = document.getElementById('perfil-fecha').value;
    user.sexo = document.getElementById('perfil-sexo').value;
    user.setUsuarioPerfil();  
    delete user;
});

