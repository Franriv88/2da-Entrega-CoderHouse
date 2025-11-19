

//acá tengo mi array de productos hardcodeados para simular una base de datos
const productos = [
    {
        id: 1,
        nombre: "Gorra Deluxe",
        precio: 18500.00,
        descripcion: "Diseñada para levantamientos pesados, con costuras reforzadas y tela antideslizante.",
        imagen: "../Recursos/imagenes/gorra.png"
    },
    {
        id: 2,
        nombre: "Botines Autoajustables",

        precio: 16200.50,
        descripcion: "Corte sin mangas para máxima libertad de movimiento en tus brazos.",
        imagen: "../Recursos/imagenes/botines.png"
    },
    {
        id: 3,
        nombre: "Condensador de Flujo",
        precio: 14000.00,
        descripcion: "Algodón premium ultra-suave para los entrenamientos más intensos.",
        imagen: "../Recursos/imagenes/condensador.png"
    },
    {
        id: 4,
        nombre: "Hover Board",
        precio: 23000.75,
        descripcion: "Ajuste perfecto y tela transpirable a prueba de sentadillas (squat-proof).",
        imagen: "../Recursos/imagenes/board.png"
    },
    {
        id: 5,
        nombre: "DeLorean",
        precio: 32500.00,
        descripcion: "Interior frizado, ideal para calentar en invierno o para un look urbano.",
        imagen: "../Recursos/imagenes/delorean.png"
    },
    {
        id: 6,
        nombre: "Mr Fusion",
        precio: 19999.99,
        descripcion: "Soporte de alto impacto para corridas, saltos y cardio.",
        imagen: "../Recursos/imagenes/mrFusion.png"
    },
    {
        id: 7,
        nombre: "Almanaque <br> 1950-2000",
        precio: 21000.00,
        descripcion: "Tela ligera y elástica, con bolsillo interno. Perfecto para crossfit.",
        imagen: "../Recursos/imagenes/almanaque.png"
    }
];

//Aprovecho que olvidé la guitarra Gibson de Marty McFly y agrego el objeto N°8
const producto8 = {
    id: 8,
    nombre: "Guibson <br> ES-345",
    precio: 999999.99,
    descripcion: "Con esta guitarra podrás tocar Jhony B. Good a la perfección!",
    imagen:"../Recursos/imagenes/guibson.png"
};
//ya hora lo agrego al array de produtos usando el método push():
productos.push(producto8);

//========= Array de Carrito de Compras ============
//creo el array de carrito con lo que encuentre en el localStorage. Si está vació entonces en trolley guardo un array vacío
const trolley = JSON.parse(localStorage.getItem("trolley")) || [];

if(trolley.length > 0){
    llenarCarrito();
}

//como vimos en clase, vamos a hacer unas cards para poder mostrar estos productos en el html, recorriendo el array de productos!

//primero obtengo el contenedor donde voy a insertar las cards
const productItemsContainer = document.getElementById('productsContainer'); 

//============ Acá incia mi forEach ===========
//aquí recorro el array de productos
productos.forEach((producto) => {
    let cardItem = document.createElement('article'); //en clase vimos que podemos crear elementos html desde acá(minuto 57:46 de la clase del 15 nov)

    cardItem.classList.add('productCard'); //Le agrega una clase al elemento article que acabo de crear
    //<article class="productContainer"></article>

    //diapsitiva 19 de "Plantillas literales e InneHTML"
    cardItem.innerHTML = `
        <h2 class="font-face">${producto.nombre}</h2>
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="product-info">
            <p class="font-face">Precio: $${producto.precio}</p>
            <p>Descripción: ${producto.descripcion}</p>
        <div class="card-buttons">
            <button class="addButton" id="addButton${producto.id}">Agregar</button>
        </div>
    `;      //Obs: usar id="addButton${ } con el producto.id lo qu hace es agregar id de manéra dinámica!

    //métopdo appendChild: agrega un nodo al final de la lista de hijos de un nodo padre especificado.
    productItemsContainer.appendChild(cardItem); //le agrego la card al contenedor de productos. Ahora las cards sí pasan a ser hijas del contenedor de productos

    const botonAgregar = document.getElementById(`addButton${producto.id}`);
    //lleno el carrito con cosas
    botonAgregar.addEventListener('click', ()=> {
        // alert(`Agregaste ${producto.nombre} al carrito`);
        trolley.push({nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen}); //cargo los productos 
        localStorage.setItem("trolley", JSON.stringify(trolley)); //uso el localStorage para que mi carrito no se borre
        llenarCarrito();   //llamo a la función
    });
    /*Pasos:
    1- Crear la card
    2- Agregar la card al contenedor
    3- Crear el botón "Agregar"
    4- Creamos el evento botonAgregar.addEventListener('click', ()=> {}
    5- Adentro puse una alerta y un push() para agregar al array de trolley (carrito) solo los campos que me interesan
    6- Guardamos en el localStorage (converimos a JSON con JSON.stringify(nombre de mi array de carrito))
    7- Mostramos o imprimimos en el carrito, en el html
    */
}); 
//============= y acá termina el forEach ==============

function llenarCarrito(){
        const contenidoDelCarrito = document.getElementById('trolleyContainer');
        contenidoDelCarrito.innerHTML = "<h2>CARRITO DE COMPRAS</h2>";
        trolley.forEach((item,index) =>{
            // contenidoDelCarrito.innerHTML += `<p>${index+1}.${item.nombre} - $${item.precio}<br><img src="${item.imagen}" alt="${item.nombre}"></p>;`  //ASÍ NO PUDE LUEGO USAR EL CSS
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('trolleyItem')
            itemDiv.innerHTML=`
            <img src="${item.imagen}" alt="${item.nombre}" class="carrito-item-img">
            <span class="carrito-item-nombre">${index+1}. ${item.nombre}</span>
            <span class="carrito-item-precio">$${item.precio}</span>
            <button class="deleteButton" id="deleteButton">Eliminar</button>
            `
            contenidoDelCarrito.appendChild(itemDiv); 

            const botonEliminar = itemDiv.querySelector('.deleteButton');
            botonEliminar.addEventListener('click', () => {
                eliminarDelCarrito(index);
            })
        });
        
        const total = calcularTotal();
        
        const totalDiv = document.createElement('div')
        totalDiv.className = 'totalPago';
        totalDiv.innerHTML = `<h3>Total a pagar: $ <sapan id="monto">${total.toFixed(2)}</span></h3>`;  //toFixed(2) me muestra 2 decimales
        contenidoDelCarrito.appendChild(totalDiv);
    }

//función con el método reduce() para reducir el array a un único valor total
function calcularTotal(){
    return trolley.reduce((acumulador, item) => acumulador + item.precio, 0);
}


//=================================================================
//======== Pantallas Productos <-> Carrito ========================
//(muestro u oculto los productos y/o el carrito según sea el caso) 
// apretando los botones VER CARRITO o VER PRODUCTOS
// ================================================================

// capturo los elementos primero
const productsContainer = document.getElementById('productsContainer');
const trolleyContainer = document.getElementById('trolleyContainer');
const btnVerProductos = document.getElementById('btnVerProductos');
const btnVerTrolley = document.getElementById('btnVerTrolley');
const btnPedido = document.getElementById('btnPedido');

//Ahora los eventos para mostrar u ocultar las secciones de Productos <-> Carrito
btnVerTrolley.addEventListener('click', () =>{
    trolleyContainer.style.display = "flex";
    productsContainer.style.display = "none";
    btnVerTrolley.style.visibility = "hidden";
    btnVerProductos.style.visibility = "visible";
    btnPedido.style.visibility = "visible";
});

btnVerProductos.addEventListener('click', () =>{
    productsContainer.style.display = "flex";
    trolleyContainer.style.display = "none";
    btnVerProductos.style.visibility = "hidden";
    btnVerTrolley.style.visibility = "visible";
    btnPedido.style.visibility = "hidden";
});

btnPedido.addEventListener('click', () =>{
    if(trolley.length > 0){
        const totalDelPedido = calcularTotal();
        let historialRecaudado = parseFloat(localStorage.getItem('adminRecaudado')) || 0;
        let historialPedidos = parseInt(localStorage.getItem('adminContador')) || 0;
        historialRecaudado += totalDelPedido; //sumo el dinero
        historialPedidos += 1; //sumo 1 pedido más 
        localStorage.setItem('adminRecaudado', historialRecaudado);
        localStorage.setItem('adminContador', historialPedidos);
        alert(`Pedido confirmado. \nTotal a pagar: $${totalDelPedido.toFixed(2)}`);
        vaciarCarrito();
    }
});

function vaciarCarrito(){
    trolley.length = 0;
    localStorage.setItem("trolley", JSON.stringify(trolley));
    llenarCarrito();
    alert("Se ha enviado tu peido. \nEl carrito se ha vaciado")
}

//=======================================================================

//===== cierro sesión -> voy a index.html
const btnCerrar = document.getElementById('btnCerrar');
btnCerrar.addEventListener('click', ()=>{
    location.replace("/index.html");
});