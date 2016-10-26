function usuarios(){

    this.id_usuario
    this.nombre
    this.correo
    this.fecha
    this.sexo
    this.pass
    this.match

    this.getUsuario = function(){
    	var xhr = new XMLHttpRequest();
    	var send = new FormData();
        send.append('id_usuario',this.id_usuario);
        xhr.open('POST', path + 'app/getUsuario');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(send);
        $.mobile.loading('show');
        xhr.timeout = time;
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
                    var now = +(new Date);
                    var photo = document.getElementById('photo');
                    var fullname = checkName(json.nombre,json.apellido_paterno);
                    photo.style.display = 'block';
                    if(json.foto != null){
                        photo.src =  path + 'perfiles/' + json.id_usuario + '/' + json.foto + '?timestamp=' + now;
                    } else {
                        photo.src = "jquerymobile/img-dportes/foto2.png";
                    }
                    document.getElementById('perfil-usuario').innerHTML = fullname;
                    document.getElementById('perfil-nombre').value = fullname;
                    document.getElementById('perfil-correo').value = json.email;
                    document.getElementById('perfil-fecha').value = json.fecha_nacimiento;
                    if(json.sexo != null){
                        $('#perfil-sexo').val(json.sexo).prop('selected', true);
                        $('#perfil-sexo').selectmenu('refresh');
                    }
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
        xhr.timeout = time;
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

    this.setPassword = function(){
        var pass = this.pass;
        var match = this.match;
        $("#conf-correcto").css('display','none');
        if(match.length > 4 && pass.length > 4){
            $("#conf-error-pass").css('display','none');
            if(pass === match){
                $("#conf-error-matches").css('display','none');
                var xhr = new XMLHttpRequest();
                var send = new FormData();
                send.append('id_usuario',localStorage.getItem('id'));
                send.append('password',pass);
                xhr.open('POST', path + 'auth/setPassword');
                xhr.setRequestHeader('Cache-Control', 'no-cache');
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                xhr.send(send);
                xhr.timeout = time;
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
                            $("#conf-correcto").css('display','block');
                        }
                    }
                };
            } else {
                $("#conf-error-matches").css('display','block');
            }
        } else {
            $("#conf-error-pass").css('display','block');
        }
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

document.getElementById('conf-save').addEventListener('click',function(){
    event.preventDefault();
    var user = new usuarios();
    user.pass = document.getElementById('conf-password').value;
    user.match = document.getElementById('conf-matches').value;
    user.setPassword();
    delete user;
});

