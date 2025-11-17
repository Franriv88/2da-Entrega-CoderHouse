//=========== Login ===========

//Obtengo los elementos del DOM (mi html)
const userButton = document.getElementById('userButton');
const adminButton = document.getElementById('adminButton');
const enterButton = document.getElementById('enterButton');
const inputName = document.getElementById('inputName');
const inputPass = document.getElementById('inputPass');
// const loginContainer = document.getElementById('login'); le iba a agragar los 2 inputs desde el js pero me parecio mejor agregarlos directo en el html

//Escuchamos si se hizo click en el moton admin y mostramos los 2 inputs
adminButton.addEventListener('click', () =>{
    inputName.style.display = 'block';
    inputPass.style.display = 'block'; 
})

//Escuchamos si se hizo click en el boton user y ocultamos los 2 inputs
userButton.addEventListener('click', () => {
    inputName.style.display = 'none';
    inputPass.style.display = 'none';
    enterButton.style.display = 'none';
    location.replace("./HTML/userPage.html")  //acá me voy a la pg de la tienda 
})

//Recibo el nombre y la clave y los guardo en variables al hacer click en el boton ingresar para luego usar estos datos en la funcíon rudimentaria para comparar que el usuario y la clave sean correctas
enterButton.addEventListener('click', () => {
    let nombreDelAdmin = inputName.value;
    let claveDelAdmin = inputPass.value;
    validacionAdmin(nombreDelAdmin, claveDelAdmin); //yo estaba llamando a la función afuera del event listener y no me funcionaba! ya investiqué el por qué... SCOPE!
});

function validacionAdmin(nombre, clave){
    if(nombre === "CoderHouse" && clave === "12345"){
        location.replace("./HTML/adminPage.html"); //no esaba seguro si usar window.location.replace me iba a quitar puntos, así que vi que puedo omitir el window y funciona igual XD
    } else {
        alert("Nombre o clave incorrectos");
    }
}

//Mostramos el botón "Ingresar" si se completan los campos en los inputs del admin y lo ocultamos si los inputs están vacíos
function checkeoInputs(){
    const nombre = inputName.value;
    const clave = inputPass.value;

    if(nombre !== "" && clave !== ""){
        enterButton.style.display = 'block';
    }else{
        enterButton.style.display = 'none';
    }
}

inputName.addEventListener('input', checkeoInputs);
inputPass.addEventListener('input', checkeoInputs);