//primero obtengo el contenedor donde voy a insertar las cards y mostramos el carrito vacío o si ya tiene productos guardados en el localStorage
const productItemsContainer = document.getElementById('productsContainer');
const trolley = JSON.parse(localStorage.getItem("trolley")) || [];

    if(trolley.length > 0){
        llenarCarrito();
    }



// ================================================================================
//  usando FETCH CON ASYNC/AWAIT Y TRY/CATCH  para cargar los productos -> clase 19 Nov min 2:24:45 aprox
// ================================================================================

async function loadProducts(){
    try{
        const response = await fetch('../trolley.json'); //consume los datos del trolley.json que contiene el array de productos que antes tenías en el user.js
        const data = await response.json() //transformas "parseas" la información
        
        
        
        // cardItem.classList.add('productCard'); Le agrego una clase al elemento article que acabo de crear para luego poder modificarlo con CSS

        data.productos.forEach(producto => {
            const cardItem = document.createElement('article'); //en clase vimos que podemos crear elementos html desde acá (minuto 57:46 de la clase del 15 nov)
            cardItem.innerHTML = `
            <div class="product-card">
                <h2> ${producto.nombre}</h2>
                <p> Precio: $${producto.precio}</p>
                <p> ${producto.descripcion}</p>
                <img src="${producto.imagen}" alt="${producto.nombre}" width="150"/>`;

            productItemsContainer.appendChild(cardItem); //agregamos la card al DOM

            const botonAgregar = document.getElementById(`addButton${producto.id}`); 
            // evento del botón agregar al carrito
            botonAgregar.addEventListener('click', ()=> {
                trolley.push({
                    nombre: producto.nombre,
                    precio: producto.precio,
                    imagen: producto.imagen
                });
                localStorage.setItem("trolley", JSON.stringify(trolley));
                llenarCarrito(); //llamo a mi función de llenado del trolley (carrito)
                alert(`Agregaste ${producto.nombre} al carrito`); //cambiar usando las Sweet Alerts que enseñó la profe Diana
            });
            
        });
        }catch(error){
            console.error("Error al obtener los productos:", error);
        }
}  

loadProducts();  //Llamo a la función 



    //métopdo appendChild: agrega un nodo al final de la lista de hijos de un nodo padre especificado.
    // productItemsContainer.appendChild(cardItem); //le agrego la card al contenedor de productos. Ahora las cards sí pasan a ser hijas del contenedor de productos

    // const botonAgregar = document.getElementById(`addButton${producto.id}`);
    // //lleno el carrito con cosas
    // botonAgregar.addEventListener('click', ()=> {
    //     // alert(`Agregaste ${producto.nombre} al carrito`);
    //     trolley.push({nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen}); //cargo los productos 
    //     localStorage.setItem("trolley", JSON.stringify(trolley)); //uso el localStorage para que mi carrito no se borre
    //     llenarCarrito();   //llamo a la función
    // });
    /*Pasos:
    1- Crear la card
    2- Agregar la card al contenedor
    3- Crear el botón "Agregar"
    4- Creamos el evento botonAgregar.addEventListener('click', ()=> {}
    5- Adentro puse una alerta y un push() para agregar al array de trolley (carrito) solo los campos que me interesan
    6- Guardamos en el localStorage (converimos a JSON con JSON.stringify(nombre de mi array de carrito))
    7- Mostramos o imprimimos en el carrito, en el html
    */
// });
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