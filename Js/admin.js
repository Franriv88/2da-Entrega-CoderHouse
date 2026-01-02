//===== cierro sesión -> voy a index.html
const btnCerrar = document.getElementById('btnCerrar');
btnCerrar.addEventListener('click', ()=>{
    location.replace("../index.html");
});


//Luego de darme cabezasos... acá no necesito oír de nuevo los clicks, sino que puedo leer el LocalStorage
function cargarEstadisticas(){
    const contenedorEstadisticas = document.getElementById('mis-estadisticas');
    if(!contenedorEstadisticas) return;// Validación: Si no existe el contenedor, paramos para que no de error

    //acá leo el local storage y recupero los datos globales
    const totalRecaudado = parseFloat(localStorage.getItem('adminRecaudado')) || 0;
    const totalPedidos = parseInt(localStorage.getItem('adminContador')) || 0;

    const cardPedidos = document.createElement('div');
    cardPedidos.className = 'stat-card'; // Clase para darle estilo CSS
    cardPedidos.innerHTML = `
        <h3>Total Pedidos</h3>
        <p class="stat-number">${totalPedidos}</p>
    `

    const cardDinero = document.createElement('div');
    cardDinero.className = 'stat-card'; // Usamos la misma clase
    cardDinero.innerHTML = `
        <h3>Total Recaudado</h3>
        <p class="stat-number" style="color: green;">$${totalRecaudado.toFixed(2)}</p>
    `;

    // 5. AGREGAMOS LAS TARJETAS A TU DIV ESPECÍFICO
    contenedorEstadisticas.appendChild(cardPedidos);
    contenedorEstadisticas.appendChild(cardDinero);
}

cargarEstadisticas();

















// //acá quiero capturar cada vez que se hace click en el botón "hacer pedido"
// //para luego sumar el dinero total recaudado y contabilizar los pedidos totales

// const botonPedido = getElementById('btnPedido');
// botonPedido.addEventListener('click', () => {
    
// });


// //FUNCIONES: contador y totalizador
// function contador(){

// }

// function totalizador(){
    
// }

// //=====================================================================================================
// const totalizadorDiv = document.createElement('div')
// totalizadorDiv.className = 'totalRecaudado';
// totalizadorDiv.innerHTML = `<h3>Total recaudado: $<span id="recaudado">${total.toFixed(2)}></span></h3>`;

// const contadorDiv = document.createElement('div')
// contadorDiv.className = 'contadorPedidos';
// contadorDiv.innerHTML = `<h3>Total de pedidos: <span id="pedidos"></span></h3>`; 