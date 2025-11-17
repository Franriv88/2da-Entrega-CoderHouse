

//acá tengo mi array de productos hardcodeados para simular una base de datos
const productos = [
    {
        id: 1,
        nombre: "Remera PowerLifting",
        genero: "M",
        precio: 18500.00,
        descripcion: "Diseñada para levantamientos pesados, con costuras reforzadas y tela antideslizante.",
        imgen: "../Recursos/imagenes/remeraNegra.png"
    },
    {
        id: 2,
        nombre: "Remera Muscle",
        genero: "F",
        precio: 16200.50,
        descripcion: "Corte sin mangas para máxima libertad de movimiento en tus brazos.",
        imgen: "../Recursos/imagenes/remeraOliva.png"
    },
    {
        id: 3,
        nombre: "Pack Remeras surtidas",
        genero: "M",
        precio: 14000.00,
        descripcion: "Algodón premium ultra-suave para los entrenamientos más intensos.",
        imgen: "../Recursos/imagenes/PackRemeras.png"
    },
    {
        id: 4,
        nombre: "Pack Calzas Deportivas Flex",
        genero: "F",
        precio: 23000.75,
        descripcion: "Ajuste perfecto y tela transpirable a prueba de sentadillas (squat-proof).",
        imgen: "../Recursos/imagenes/licra.png"
    },
    {
        id: 5,
        nombre: "Buzo Hoodie Legacy",
        genero: "M",
        precio: 32500.00,
        descripcion: "Interior frizado, ideal para calentar en invierno o para un look urbano.",
        imgen: "../Recursos/imagenes/remera4.png"
    },
    {
        id: 6,
        nombre: "Top Deportivo Active",
        genero: "F",
        precio: 19999.99,
        descripcion: "Soporte de alto impacto para corridas, saltos y cardio.",
        imgen: "../Recursos/imagenes/remera3.png"
    },
    {
        id: 7,
        nombre: "Short de Entrenamiento Hybrid",
        genero: "M",
        precio: 21000.00,
        descripcion: "Tela ligera y elástica, con bolsillo interno. Perfecto para crossfit.",
        imgen: "../Recursos/imagenes/remera2.png"
    }
];

//como vimos en clase, vamos a hacer unas cards para poder mostrar estos productos en el html, recorriendo el array de productos!

//primero obtengo el contenedor donde voy a insertar las cards
const productItemsContainer = document.getElementById('productsContainer'); 

//aquí recorro el array de productos
productos.forEach((producto) => {
    let cardItem = document.createElement('article'); //en clase vimos que podemos crear elementos html desde acá(minuto 57:46 de la clase del 15 nov)

    cardItem.classList.add('productCard'); //Le agrega una clase al elemento article que acabo de crear
    //<article class="productContainer"></article>

    //diapsitiva 19 de "Plantillas literales e InneHTML"
    cardItem.innerHTML = `
        <h2>${producto.nombre}</h2>
        <img src="${producto.imgen}" alt="${producto.nombre}">
        <p>Género: ${producto.genero}</p>
        <p>Precio: $${producto.precio}</p>
        <p>Descripción: ${producto.descripcion}</p>
    `;

    //métopdo appendChild: agrega un nodo al final de la lista de hijos de un nodo padre especificado.
    productItemsContainer.appendChild(cardItem); //le agrego la card al contenedor de productos. Ahora las cards sí pasan a ser hijas del contenedor de productos
}); 