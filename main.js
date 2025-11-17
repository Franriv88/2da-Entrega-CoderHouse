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
    enterButton.style.display = 'block';
})

//Escuchamos si se hizo click en el boton user y ocultamos los 2 inputs
userButton.addEventListener('click', () => {
    inputName.style.display = 'none';
    inputPass.style.display = 'none';
    enterButton.style.display = 'none';
})

//Recibo el nombre y la clave y los guardo en variables al hacer click en el boton ingresar para luego usar estos datos en la funcíon rudimentaria para comparar que el usuario y la clave sean correctas
enterButton.addEventListener('click', () => {
    let nombreDelAdmin = inputName.value;
    let claveDelAdmin = inputPass.value;
    validacionAdmin(nombreDelAdmin, claveDelAdmin);
});

function validacionAdmin(nombre, clave){
    if(nombre === "CoderHouse" && clave === "12345"){
        console.log("Bienvenido Admin");
    } else {
        console.log("Nombre o clave incorrectos");
    }
}