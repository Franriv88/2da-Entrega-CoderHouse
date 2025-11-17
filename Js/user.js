

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
const trolley = [];


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
    `;

    //métopdo appendChild: agrega un nodo al final de la lista de hijos de un nodo padre especificado.
    productItemsContainer.appendChild(cardItem); //le agrego la card al contenedor de productos. Ahora las cards sí pasan a ser hijas del contenedor de productos
    const botonAgregar = document.getElementById(`addButton${producto.id}`);

    botonAgregar.addEventListener('click', ()=> {
        alert(`Agregaste ${producto.nombre} al carrito`);
        trolley.push({nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen});
    });
    /*Pasos:
    1- Crear la card
    2- Agregar la card al contenedor
    3- Crear el botón "Agregar"
    4- Creamos el evento botonAgregar.addEventListener('click', ()=> {}
    5- Adentro puse una alerta y un push() para agregar al array de trolley (carrito) solo los campos que me interesan
    */
}); 
//============= y acá termina el forEach ==============

//=================================================================
//======== Pantallas Productos <-> Carrito ========================
//(muestro y oculto los productos y/o el carrito según sea el caso) 
// ================================================================

// capturo los elementos primero
const productsContainer = document.getElementById('productsContainer');
const trolleyContainer = document.getElementById('trolleyContainer');
const btnVerProductos = document.getElementById('btnVerProductos');
const btnVerTrolley = document.getElementById('btnVerTrolley');

//Ahora los eventos para mostrar u ocultar las secciones de Productos <-> Carrito
btnVerTrolley.addEventListener('click', () =>{
    trolleyContainer.style.display = "block";
    productsContainer.style.display = "none";
    btnVerTrolley.style.display = "none";
    btnVerProductos.style.display = "block";
});

btnVerProductos.addEventListener('click', () =>{
    productsContainer.style.display = "flex";
    trolleyContainer.style.display = "none";
    btnVerProductos.style.display = "none";
    btnVerTrolley.style.display = "block";
});