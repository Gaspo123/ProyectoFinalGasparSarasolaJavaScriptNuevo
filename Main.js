// Función para calcular los totales y devolver los resultados
const calcularTotales = (pago, horasTrabajadas) => {
    if (horasTrabajadas > 40) {
        let totalPagoExtra = (horasTrabajadas - 40) * pago * 2;
        let totalPago = 40 * pago;
        return {
            totalPago: totalPago,
            totalPagoExtra: totalPagoExtra,
            totalAPagar: totalPago + totalPagoExtra
        };
    } else {
        let totalPago = horasTrabajadas * pago;
        return {
            totalPago: totalPago
        };
    }
};

// Evento para calcular el sueldo al hacer clic en el botón
document.querySelector("#pro_calc").addEventListener("click", (e) => {
    e.preventDefault();
    let horasTrabajadas = +document.querySelector("#horas_trabajadas").value;
    let pago = +document.querySelector("#precio_hora").value;
    const resultados = calcularTotales(pago, horasTrabajadas);
    // Mostrar resultados en el DOM
    document.querySelector(
        "#resultado"
    ).innerHTML = `El total de pago es: ${resultados.totalPago}`;
    if (resultados.totalPagoExtra) {
        document.querySelector(
            "#resultado"
        ).innerHTML += ` y el pago extra es: ${resultados.totalPagoExtra}. El total a pagar es: ${resultados.totalAPagar}`;
    }
});

// Función para cargar datos desde un JSON local utilizando Fetch
const cargarDatosDesdeJSON = () => {
    return fetch('datos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los datos');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
            throw error; // Re-lanzar el error para que pueda ser capturado en la cadena de promesas
        });
};


// Función para procesar los datos cargados desde el JSON y mostrarlos en el DOM
const procesarDatos = (datos) => {
    const resultadosContainer = document.querySelector("#resultadosJSON");
    resultadosContainer.innerHTML = ""; // Limpiar resultados anteriores
    datos.forEach((item, index) => {
        const resultados = calcularTotales(item.precio, item.horas);
        const resultadoHTML = `
            <div class="alert alert-success" role="alert">
                <p>Datos ${index + 1}: Horas trabajadas: ${item.horas}, Precio por hora: ${item.precio}</p>
                <p>Total de pago: ${resultados.totalPago}</p>
                ${resultados.totalPagoExtra ? `<p>Pago extra: ${resultados.totalPagoExtra}</p>` : ''}
                <p>Total a pagar: ${resultados.totalAPagar ? resultados.totalAPagar : resultados.totalPago}</p>
            </div>
        `;
        resultadosContainer.innerHTML += resultadoHTML;
    });
};

// Cargar datos desde el JSON local y procesarlos
cargarDatosDesdeJSON()
    .then(procesarDatos)
    .catch(error => console.error(error));
