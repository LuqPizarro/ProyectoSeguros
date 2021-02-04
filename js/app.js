

function Seguro (marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
};


// Realizar la cotizacion con los datos

Seguro.prototype.cotizarSeguro = function () {                  // No se usa arrow functions porque hay THIS.

    /*
    1 = Americano 1.15
    2 = Asiatico 1.05
    3 = Europeo 1.35
    */

    let cantidad;
    const base = 2000;

    switch(this.marca){
        case '1':
            cantidad = base * 1.15
            break;
        case '2':
            cantidad = base * 1.05
            break;
        case '3':
            cantidad = base * 1.35
            break;
        default:
            break;
    }

    // Leer el año
    const diferencia = new Date().getFullYear() - this.year;
    // Cada año que la diferencia es mayor el costo se reduce un 3% 
    cantidad -= ((diferencia * 3) * cantidad ) / 100;

    /*
    Si el seguro es Basico aumenta 30%
    Si el seguro es Completo aumenta 50%
    */

    if (this.tipo === 'basico') {
        cantidad *= 1.30
    } else {
        cantidad *= 1.50
    }

    console.log(cantidad)
    return cantidad;
};

function UI () {};

UI.prototype.llenarOpciones = () => {                           // Usa arrow functions porque no hace referencia al THIS.
    const year = document.querySelector ('#year');

    const max = new Date().getFullYear();
    const min = max -20;
    
    for (let i = max; i >= min; i--){
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option)
    };
};

UI.prototype.mostrarMensaje = (mensaje, tipo) => {

    const div = document.createElement('div');

    if (tipo === 'error') {
        div.classList.add ('error')
    } else {
        div.classList.add ('correcto')
    };
    div.classList.add ('mensaje', 'mt-10');
    div.textContent = mensaje;

    // Insertamos en HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove()
    }, 3000);
};

UI.prototype.mostrarResultado = (total, seguro) => {

    const {marca, year, tipo} = seguro;  

    let textoMarca;

    switch(marca){
        case "1":
            textoMarca = 'Americano';
            break;
        case "2":
            textoMarca = 'Asiatico';
            break;
        case "3":
            textoMarca = 'Europeo';
            break;
        default:
            break;
    }

  

    // Crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
     <p class="header"> Tu resumen </p>
     <p class="font-bold"> Marca: <span class="font-normal">${textoMarca} </span></p>
     <p class="font-bold"> Año: <span class="font-normal">${year} </span></p>
     <p class="font-bold"> Tipo: <span class="font-normal capitalize">${tipo} </span></p>
     <p class="font-bold"> Total: <span class="font-normal">€${total} </span></p>
    `;

    const resultadoDiv = document.querySelector('#resultado');
    

    //Mostrar el spinner
    const spinner = document.querySelector("#cargando");
    spinner.style.display = "block";

    setTimeout(() => {
        spinner.style.display = "none";
        resultadoDiv.appendChild(div);
    }, 3000);
}

//Instanciarlo
const ui = new UI()
document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();
});





// Eventos
eventListener();
function eventListener(){
    const formulario = document.querySelector('#cotizar-seguro');

    formulario.addEventListener ('submit', cotizarSeguro)
};


function cotizarSeguro(e){
    e.preventDefault();

    limpiarHTML();
    
    // Leer la marca
    const marca = document.querySelector ('#marca').value;
    
    // Leer el año
    const year = document.querySelector ('#year').value;

    // Leer el tipo
    const tipo = document.querySelector ('input[name = "tipo"]:checked').value;
    
    if (marca === '' || year === '' || tipo === ''){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    };

    ui.mostrarMensaje('Cotizando', 'correcto');

    // Instanciar seguro
    const seguro = new Seguro (marca, year, tipo);
    // console.log(seguro)
    const total = seguro.cotizarSeguro();

    //Utilizar el prototype que va a usar
    ui.mostrarResultado(total, seguro);
};

function limpiarHTML(){
    
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}
