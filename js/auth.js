//Para funciones utilizadas no encontradas en este archivo, revisar librerias.js
// Variable path es rescatado de las librerias.

function authentication(){

    this.email
    this.password
    this.bool
    this.mensaje = [
                	"Ingrese el nombre",
                	"Ingrese el apellido",
                	"Ingrese un correo valido",
                	"Ingrese un password con mas de 5 caracteres"
              		]

    this.login = function(){
        if(this.validaLogin()){
            var xhr = new XMLHttpRequest();
            var login = new FormData();
            login.append('email_usuario',document.getElementById('log-email').value);
            login.append('password_usuario',document.getElementById('log-password').value);
            xhr.open('POST', path + 'auth/login');
            xhr.setRequestHeader('Cache-Control', 'no-cache');
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.timeout = time;
            xhr.send(login);
            $.mobile.loading('show');
            xhr.ontimeout = function(e) {
                $.mobile.loading('hide');
                navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
            }
            xhr.onprogress = function(e){
                $.mobile.loading('show');
            }
            xhr.onload = function(e){
                //alert(this.response);
                $.mobile.loading('hide');
                if(this.status == 200){
                    if(this.response && JSON.parse(this.response)){
                        var json =  JSON.parse(this.response);
                        localStorage.setItem("nombre_usuario",json.nombre_usuario);
                        localStorage.setItem("id", json.usuario);
                        if(json.equipo){
                            localStorage.setItem("equipo", json.equipo);
                            localStorage.setItem("nombre_equipo", json.nombre_equipo);
                            localStorage.setItem("rol_equipo",json.rol);
                        }
                        localStorage.setItem("login", json.login);
                        if(json.rol_usuario==3){
                            $.mobile.navigate("#cambiar-contrasena", {transition: "fade"});
                        } else {
                            $.mobile.navigate("#home", {transition: "fade"});
                        }
                        document.getElementById('log-error').style.display = 'none';
                    } else {
                        document.getElementById('log-error').style.display = 'block';
                    }
                } else {
                    navigator.notification.alert('Ocurrio un error, intentelo nuevamente',function(){},'Atención','OK');
                    //alert(this.status);
                }
            }          
        } else {
            //alert('error en el formulario');
        }
    }

    this.validaLogin = function(){
        var bEmail      = false;
        var bPassword   = false;

        if(validaEmail(this.email)){
            document.getElementById('log-email-error').style.display = 'block';
        } else {
            document.getElementById('log-email-error').style.display = 'none';
            bEmail = true;
        }

        if(this.password.length < 5 || this.password.trim().length <= 0){
            document.getElementById('log-pass-error').style.display = 'block';
        } else {
            document.getElementById('log-pass-error').style.display = 'none';
            bPassword = true;
        }

        if(bEmail && bPassword){
            return true;
        } else {
            return false;
        }
    }

    this.cambioPassword = function(){
        var xhr = new XMLHttpRequest();
        var pass = new FormData();
        var bool = this.bool;
        pass.append('password_usuario',this.password);
        pass.append('id',localStorage.getItem('id'));
        xhr.open('POST', path + 'auth/changePass');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.timeout = time;
        xhr.send(pass);
        $.mobile.loading('show');
        xhr.ontimeout = function(e) {
            $.mobile.loading('hide');
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
        }
        xhr.onprogress = function(e){
            $.mobile.loading('show');
        }
        xhr.onload = function(e){
            if(this.status == 200){
                if(bool == 1){
                    $.mobile.navigate("#mi-perfil", {transition: "fade"});
                } else {
                    $.mobile.navigate("#home", {transition: "fade"});
                }
            } else {
                navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
            }
            $.mobile.loading('hide');
        }
    }

}


document.getElementById('logear').addEventListener('click',function(){

    event.preventDefault();
    var auth = new authentication();
    auth.email       = document.getElementById('log-email').value;
    auth.password    = document.getElementById('log-password').value;
    auth.login();    
});

document.getElementById('logout').addEventListener('click', function(){
    localStorage.removeItem('login');
    localStorage.removeItem('equipo');
    localStorage.removeItem('id');
    localStorage.removeItem('nombre_equipo');
    localStorage.removeItem('rol_equipo');
    sessionStorage.removeItem('evento');
    sessionStorage.removeItem('periodo');
    sessionStorage.removeItem('nPeriodo');
    sessionStorage.removeItem('accIDTitular');
    sessionStorage.removeItem('periodosJugados');
    sessionStorage.removeItem('eq_session');
    $.mobile.navigate("#login", {transition: "fade"});
});

function changePass(id){
    var auth = new authentication();
    auth.password = document.getElementById('cambio-match').value;
    auth.bool = id;
    auth.cambioPassword();
    delete auth;
}

function logout(){
    localStorage.removeItem('login');
    localStorage.removeItem('equipo');
    localStorage.removeItem('id');
    localStorage.removeItem('nombre_equipo');
    sessionStorage.removeItem('evento');
    sessionStorage.removeItem('periodo');
    sessionStorage.removeItem('nPeriodo');
    sessionStorage.removeItem('accIDTitular');
    sessionStorage.removeItem('periodosJugados');
    $.mobile.navigate("#login", {transition: "fade"});
}



