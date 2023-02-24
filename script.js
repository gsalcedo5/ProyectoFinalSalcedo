class Producto {     //Creo una clase Producto
    constructor(nombre, precio){
            this.nombre = nombre;
            this.precio = Number(precio);
    }
}

let Productos = []          // Creo un array vacio; No lo declaro como const para poder resetear sus valores con btn de reset.
let infoProd = document.getElementById("info_prod")
let listaProd = document.getElementById("lista")
const nCuotas = document.getElementById("numCuotas")
const btnNombre = document.getElementById("btnNombre")
const btnCalcular = document.getElementById("btnCalcular")
const btnStock = document.getElementById("btnStock")
const btnClear = document.getElementById("btnClear")
let costoFinal = document.getElementById("costoFinal")
let stockTitulo = document.getElementById("stockTitulo")
let stock = document.getElementById("stock")

btnNombre.addEventListener('click',() => {   //Creo un evento con la acción de un click

        let n = Number(prompt("Ingrese la cantidad de productos a comprar")) // Ingreso la cantidad de productos a comprar    
        
        for (let i=0; i<n; i++){   
            Productos.push( new Producto(prompt("Ingrese el nombre del producto " + (i+1)),Number(prompt("Ingrese el precio del producto número " + (i+1))))) //Cargo 'n' precios de productos
            while(Productos[i] <= 0){
                    alert("Ingrese un precio mayor que cero")
                    Productos[i].precio = Number(prompt("Ingresa el precio del producto " + (i+1)))
            }
        }
        localStorage.setItem('productos', JSON.stringify(Productos))  //Guardo en Local Storage el array de productos
        Productos.forEach((Prod) => {                                  //Muestro por pantalla el array creado
            const li = document.createElement('li')
            li.innerHTML = ` <h4> Nombre: ${Prod.nombre}</h4>
                            <h4> Precio: ${Prod.precio}</h4>`
            listaProd.append(li)
        })
    }  
)

btnCalcular.addEventListener('click',() => {                    // Creo un evento por click, para calcular el precio final

    const cuotas = nCuotas.value
    console.log(cuotas)
    let precioFinal = Productos.reduce((sumatoria,{precio}) => sumatoria + parseInt(precio),0) //Sumo todos los precios del array de productos
    console.log(precioFinal)
    valorFinal = precioFinal + precioFinal*(cuotas/100) //Aplico un aumento del 3% o 6% segun sea la cantidad de cuotas
    console.log(valorFinal)
    costoFinal.innerHTML = `El precio total es de $${(valorFinal.toFixed(2))}`

})

const verStock = () => {                                //Creo una funcion para visualizar el stock de la tienda
    fetch('stock.json')
    .then(response => response.json())
    .then( (data) => {
       stockTitulo.innerHTML = `Stock disponible:`
        data.forEach (data  => {
            const listado = document.createElement('li');
                listado.innerHTML = `
                <ul> ${data.nombre} </ul>
                <ul> $${data.precio} </ul>
               `;
               stock.appendChild(listado)
        });
    })
}

btnStock.addEventListener('click',() => {               //Visualizo el Stock y luego de 30 segundos lo oculto.
    verStock();
    setTimeout(()  => { 
        stock.innerHTML  = "";
    },30000);  
})

btnClear.addEventListener('click',() => {     // Brindo la opcion de resetear el programa      
    stock.innerHTML  = "";
    listaProd.innerHTML = "";
    window.localStorage.clear();
    Productos =[]                            //Debido a esta linea declaro el array con let en lugar de const.
})




