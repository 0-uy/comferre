const carrito = [];
    
function agregarAlCarrito(producto, precio) {
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const productoExistente = carrito.find(item => item.producto === producto);

    if (productoExistente) {
        productoExistente.cantidad += cantidad;
        productoExistente.total = productoExistente.cantidad * precio;
    } else {
        const totalProducto = cantidad * precio;
        carrito.push({ producto, cantidad, total: totalProducto });
    }

    actualizarCarritoUI();
}

function actualizarCarritoUI() {
    document.getElementById('carrito').innerHTML = carrito.map(item =>
        `${item.cantidad} x ${item.producto} - $${item.total}`
    ).join('<br>');

    const total = carrito.reduce((sum, item) => sum + item.total, 0);
    document.getElementById('total').innerHTML = `&nbsp;&nbsp;  Total: $${total}`;
}

function vaciarCarrito() {
    carrito.length = 0;
    actualizarCarritoUI();
}

function pagar() {
    const totalCantidad = carrito.reduce((sum, item) => sum + item.cantidad, 0);

    if (totalCantidad > 0 && totalCantidad <= 10) {
        // Mostrar el formulario de información del cliente
        document.getElementById('customerInfoForm').style.display = 'block';
        // Ocultar los botones de Vaciar Carrito y Pagar
        document.getElementById('btnVaciarCarrito').style.display = 'none';
        document.getElementById('btnPagar').style.display = 'none';
    } else {
        alert('Por favor, selecciona una cantidad válida entre 1 y 10.');
    }
}

function procesarPago(event) {
    event.preventDefault();

    const customerName = document.getElementById('customerName').value;
    const customerSurname = document.getElementById('customerSurname').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const customerAddress = document.getElementById('customerAddress').value;

    const totalCantidad = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const total = carrito.reduce((sum, item) => sum + item.total, 0);
    const orderCode = generarCodigoOrden(); // Generar código de orden

    const formData = {
        customerName,
        customerSurname,
        customerEmail,
        customerPhone,
        customerAddress,
        totalCantidad,
        total,
        orderCode // Incluyendo el código de orden en los datos
    };

    // Enviar datos por Formspree
    fetch('https://formspree.io/f/mblrnean', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            alert('Datos enviados con éxito, redirigiendo a Mercado Pago... PRESIONE OK PARA CONTINUAR');

            let enlacePago;
            switch (totalCantidad) {
                case 1: enlacePago = 'https://mpago.la/33R3ZHc'; break;
                case 2: enlacePago = 'https://mpago.la/1ZKbi17'; break;
                case 3: enlacePago = 'https://mpago.la/1mH7uJX'; break;
                case 4: enlacePago = 'https://mpago.la/1foAWJ5'; break;
                case 5: enlacePago = 'https://mpago.la/1ebmgGW'; break;
                case 6: enlacePago = 'https://mpago.la/27jUeSG'; break;
                case 7: enlacePago = 'https://mpago.la/15xGTVH'; break;
                case 8: enlacePago = 'https://mpago.la/18e2CDQ'; break;
                case 9: enlacePago = 'https://mpago.la/2F4m5dZ'; break;
                case 10: enlacePago = 'https://mpago.la/2ysybZP'; break;
            }

            window.location.href = enlacePago;
        } else {
            alert('Error al enviar los datos, por favor inténtelo de nuevo.');
        }
    })
    .catch(error => {
        console.error('Error al procesar el pago:', error);
        alert('Ocurrió un error al procesar el pago.');
    });
}

function generarCodigoOrden() {
    const numeroRandom = Math.floor(Math.random() * 100000); // Número entre 0 y 99999
    const letrasRandom = String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
                        String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Dos letras aleatorias
    return `${numeroRandom}${letrasRandom}`;
}