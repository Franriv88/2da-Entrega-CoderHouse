//=========== Login ===========

//Obtengo los elementos del DOM (mi html)
const userButton = document.getElementById('userButton');
const adminButton = document.getElementById('adminButton');
const enterButton = document.getElementById('enterButton');
const inputName = document.getElementById('inputName');
const inputPass = document.getElementById('inputPass');

//Escuchamos si se hizo click en el moton admin y mostramos los 2 inputs
adminButton.addEventListener('click', () =>{
    inputName.style.display = 'block';
    inputPass.style.display = 'block'; 
    Swal.fire({
        position: "top-end",
        icon: "info",
        title: "Name: CoderHouse \nPass: 12345",
        showConfirmButton: false
    });
})

//Escuchamos si se hizo click en el boton user y ocultamos los 2 inputs
userButton.addEventListener('click', () => {
    inputName.style.display = 'none';
    inputPass.style.display = 'none';
    enterButton.style.display = 'none';
    location.replace("./HTML/userPage.html")  //acá me voy a la pg de la tienda 
})

//Recibo el nombre y la clave y los guardo en variables al hacer click en el boton ingresar para luego usar estos datos en la funcíon rudimentaria para comparar que el usuario y la clave sean correctas
//min 1:58:42 de la clase. función felcha y hack para los parámetros
enterButton.addEventListener('click', () => {
    let nombreDelAdmin = inputName.value;
    let claveDelAdmin = inputPass.value;
    validacionAdmin(nombreDelAdmin, claveDelAdmin); //yo estaba llamando a la función afuera del event listener y no me funcionaba! ya investiqué el por qué... SCOPE!
});

function validacionAdmin(nombre, clave){
    if(nombre === "CoderHouse" && clave === "12345"){
        window.location.replace("./HTML/adminPage.html"); //window.location sí lo puedo usar! min 2:10:23. Iugal me dí cuenta que si le quito la palabra "window" funciona también.
    } else {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
            });
            Toast.fire({
            icon: "error",
            title: "Usuario o contraseña incorrectos"
        });
    
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