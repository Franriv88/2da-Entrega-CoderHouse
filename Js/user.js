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
        

        data.productos.forEach(producto => {
            const cardItem = document.createElement('article'); //en clase vimos que podemos crear elementos html desde acá (minuto 57:46 de la clase del 15 nov)
            cardItem.classList.add('productCard'); //le agrego una clase para luego darle estilo con CSS
            cardItem.innerHTML = `
                <h2 class="font-face">${producto.nombre}</h2>
                <img src="${producto.imagen}" alt="${producto.nombre}" width="150">
                <div class="product-info">
                    <p class="font-face">Precio: $${producto.precio}</p>
                    <p>Descripción: ${producto.descripcion}</p>
                </div>
                
                <div class="card-buttons">
                    <button class="addButton" id="addButton${producto.id}">Agregar</button>
                </div>
            `;

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
                // alert(`Agregaste ${producto.nombre} al carrito`); cambiar usando las Sweet Alerts que enseñó la profe Diana
                Swal.fire({
                    title: `Agregaste "${producto.nombre}" a tu carrito! 👋`,
                    icon: 'success',
                    position: 'top',
                    timer: 2000,
                    color: '#abff2e',
                    background: '#0a0a0aff',
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInDown
                        animate__faster
                        `,
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutUp
                        animate__faster
                        `,
                    },
                        grow: 'row',
                        showConfirmButton: false,
                        showCloseButton: true,
                })
            });
            
        });
        }catch(error){
            console.error("Error al obtener los productos:", error);
        }
}  

loadProducts();  //Llamo a la función 


//=================================================================
//                   Funciones para el Carrito 
//=================================================================

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
            <button class="deleteButton">Eliminar</button>
            `
            contenidoDelCarrito.appendChild(itemDiv); 

            const botonEliminar = itemDiv.querySelector('.deleteButton');
            botonEliminar.addEventListener('click', () => {

                    Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                    });
                    eliminarDelCarrito(index);
                }
                });
                
            })
            

        });
        
        const total = calcularTotal();
        
        const totalDiv = document.createElement('div')
        totalDiv.className = 'totalPago';
        totalDiv.innerHTML = `<h3>Total a pagar: $ <span id="monto">${total.toFixed(2)}</span></h3>`;  //toFixed(2) me muestra 2 decimales
        contenidoDelCarrito.appendChild(totalDiv);
    }


function vaciarCarrito(){
    trolley.length = 0;
    localStorage.setItem("trolley", JSON.stringify(trolley));
    llenarCarrito();
    alert("Se ha enviado tu peido. \nEl carrito se ha vaciado")
}

function eliminarDelCarrito(index){
    trolley.splice(index, 1); //elimino 1 elemento en la posición "index"
    localStorage.setItem("troelly", JSON.stringify(trolley));
    llenarCarrito(); //volvemos a llenar el carrito con los items que quedaron
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

// capturo los elementos
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

//=======================================================================




//===== cierro sesión -> voy a index.html
const btnCerrar = document.getElementById('btnCerrar');
btnCerrar.addEventListener('click', ()=>{
    location.replace("/index.html");
});