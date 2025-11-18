//===== cierro sesión -> voy a index.html
const btnCerrar = document.getElementById('btnCerrar');
btnCerrar.addEventListener('click', ()=>{
    location.replace("/index.html");
});