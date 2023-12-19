document.addEventListener("DOMContentLoaded", function() {

    const ruleta = document.getElementById("ruleta");
    document.getElementById("sortear").addEventListener("click",()=>sortear());
    const root = document.documentElement;
    const ganadorTexto = document.getElementById("ganadorTexto");
    //botones derecha
    const cantidadSeleccionadaSpan = document.getElementById("cantidadSeleccionada");
    const numerosApostar = document.querySelectorAll('.rectangulo button');
    let cantidadApostada = 0;
    //botones centro
    const numeroSeleccionadoSpan = document.getElementById("numeroSeleccionado");
    const numeroGanador = document.querySelectorAll('.botonesNum button');
    let cantidadGanadora = 0;
     //boton sortear
     const botonSortear = document.getElementById("sortear");
     botonSortear.disabled = true;
     let numerosApostarSeleccionados = false;
     let numeroGanadorSeleccionado = false

    let sorteando = false;
    let ganador = "";
    const dos = {
        nombreValor:"2",
        nombre: "--2",
        probabilidad: 10
    }
    const tres = {
        nombreValor:"3",
        nombre: "--3",
        probabilidad: 10
    }
    const cinco = {
        nombreValor:"5",
        nombre: "--5",
        probabilidad: 10
    }
    const diez = {
        nombreValor:"10",
        nombre: "----10",
        probabilidad: 10
    }

    const colores=[
        "#126253","#134526","#C7B446","#5D9B9B","#8673A1","#A5F173","#4C9141","#8E402A","#73D4F1","#025669","#C93DD3","#E87E3E","#763C28"
    ];
    let conceptos = [dos,tres,cinco,diez,dos,tres,cinco,dos,tres,diez];

    //lee las probabilidades que hay y crea c/u de los elementos
    function ajustarRuleta(){
       const opcionesContainer = document.createElement("div");
       opcionesContainer.id = "opcionesContainer"
        ruleta.appendChild(opcionesContainer);
        //pAcumulada es la probabilidad que se van acumulando de los angulos
        let pAcumulada =0;
        conceptos.forEach((concepto ,i) =>{
            //crear triangulos
            const opcionElement = document.createElement("div");
            opcionElement.classList.add("opcion");
            opcionesContainer.appendChild(opcionElement);
            //mostrar numero en la ruleta
            const textoConcepto = document.createElement('span');
            textoConcepto.textContent = concepto.nombre; // Establecer el contenido del texto
            opcionElement.appendChild(textoConcepto);

            //para girar
            opcionElement.style =
            `background-color: ${colores[i]};
            transform:rotate(${probabilidadAGrados(pAcumulada)}deg);
            ${getPosicionParaProbabilidad(concepto.probabilidad)}`


            pAcumulada += concepto.probabilidad
            const separador = document.createElement("div");
            separador.classList.add("separador");
            ruleta.appendChild(separador);
            //girar separadores
            separador.style =
            `transform:rotate(${probabilidadAGrados(pAcumulada)}deg); `
        })
    }

    function getPosicionParaProbabilidad(probabilidad){
        if(probabilidad === 100){
            return ''
        }
        if(probabilidad >= 87.5){
            const x5 = Math.tan(probabilidadARadianes(probabilidad))*50+50;
            return `clip-path: polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0 0, ${x5}% 0, 50% 50%)`
        }
        if(probabilidad >= 75){
            const y5 = 100 - (Math.tan(probabilidadARadianes(probabilidad-75))*50+50);
            return `clip-path: polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0% ${y5}%, 50% 50%)`
        }
        if(probabilidad >= 62.5){
            const y5 = 100 - (0.5 - (0.5/ Math.tan(probabilidadARadianes(probabilidad))))*100;
            return `clip-path: polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0% ${y5}%, 50% 50%)`
        }
        if(probabilidad >= 50){
            const x4 = 100 - (Math.tan(probabilidadARadianes(probabilidad))*50+50);
            return `clip-path: polygon(50% 0, 100% 0, 100% 100%, ${x4}% 100%, 50% 50%)`
        }
        if(probabilidad >= 37.5){
            const x4 = 100 - (Math.tan(probabilidadARadianes(probabilidad))*50+50);
            return `clip-path: polygon(50% 0, 100% 0, 100% 100%, ${x4}% 100%, 50% 50%)`
        }
        if(probabilidad >= 25){
            const y3 = Math.tan(probabilidadARadianes(probabilidad-25))*50+50;
            return `clip-path: polygon(50% 0, 100% 0, 100% ${y3}%, 50% 50%)`
        }
        if(probabilidad >= 12.5){
            const y3 = (0.5 - (0.5/ Math.tan(probabilidadARadianes(probabilidad))))*100;
            return `clip-path: polygon(50% 0, 100% 0, 100% ${y3}%, 50% 50%)`
        }
        if(probabilidad >= 0){
            const x2 = Math.tan(probabilidadARadianes(probabilidad))*50 + 50;
            return `clip-path: polygon(50% 0, ${x2}% 0, 50% 50%)`
        }
    }
    function sortear(){
        if(sorteando)return;
        sorteando =true;
        nSorteo = Math.random();
        let pAcumulada=0;
        ruleta.classList.toggle("girar",true)
        //probabilidad acumuladora para el sorteo
        conceptos.forEach(concepto =>{
            if(nSorteo*100 >= pAcumulada && nSorteo*100 <pAcumulada+concepto.probabilidad){
                ganador = concepto.nombreValor;
            }
            pAcumulada +=concepto.probabilidad;
        })
        const giroRuleta = 10*360+(1-nSorteo)*360;//10 vueltas de 360
        root.style.setProperty("--giroRuleta",giroRuleta+"deg")
    }

    ruleta.addEventListener("animationend",()=>{
        ruleta.style.transform = "rotate("+getCurrentRotation(ruleta)+"deg)";
        sorteando = false;
        ruleta.classList.toggle("girar",false);
        ganadorTexto.textContent = ganador;
        //obtener numero ganador
        const numeroRuleta = ganadorTexto.textContent.trim();
         const numeroApostado = cantidadGanadora;
         const cantidadApostada = obtenerCantidadApostadaActual();
        enviarNumeros(numeroRuleta, numeroApostado,cantidadApostada);

        //reinicia el ciclo
        numeroSeleccionadoSpan.textContent = "0";
        cantidadSeleccionadaSpan.textContent = "0";

        // Volver a habilitar la selección de botones
        numerosApostar.forEach(btn => {
            btn.disabled = false;
        });

        numeroGanador.forEach(btn => {
            btn.disabled = false;
        });

        // Volver a deshabilitar el botón sortear
        botonSortear.disabled = true;
    })
    //mostrar cantidad derecha
    numerosApostar.forEach(button => {
        button.addEventListener('click', () => {
            if (!button.disabled) {
                const valorSeleccionado = parseInt(button.textContent);
                cantidadApostadaBotton = valorSeleccionado;
                cantidadSeleccionadaSpan.textContent = cantidadApostadaBotton;
                numerosApostarSeleccionados = true;
                checkHabilitarSortear();
                numerosApostar.forEach(btn => {
                    btn.disabled = true;
                });
                button.disabled = false;
            }
        });
    });
    //botones centro
    numeroGanador.forEach(button => {
           button.addEventListener('click',() => {
            if(!button.disabled){
                const valorSeleccionado = parseInt(button.textContent);
                cantidadGanadora = valorSeleccionado;
                numeroSeleccionadoSpan.textContent = cantidadGanadora;
                numeroGanadorSeleccionado = true;
                checkHabilitarSortear();
                numeroGanador.forEach(btn=>{
                    btn.disabled=true;
                });
                button.disabled = false;
            }
           });
    });

    function checkHabilitarSortear() {
        if (numerosApostarSeleccionados && numeroGanadorSeleccionado) {
            botonSortear.disabled = false;
        }
    }
    //FUNCION POST NUMERO RULETA
    function enviarNumeros(numeroRuleta, numeroApostado) {
    const cantidadDinero = document.getElementById("cantidadDinero").innerText;
        const data = {
            numeroRuleta: numeroRuleta,
            numeroApostado: numeroApostado,
            cantidadApostada: cantidadApostada,
            cantidadDinero: cantidadDinero
        };
            console.error(data);
        fetch('/ruleta/comparar-apuesta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
            // Manejar la respuesta del servidor
        })
        .catch(error => {
            console.error('Error al enviar los números:', error);

        });
    }

    function obtenerCantidadApostadaActual() {
        const cantidadSeleccionadaSpan = document.getElementById("cantidadSeleccionadaSpan");
        if (cantidadSeleccionadaSpan) {
            const cantidadApostada = parseInt(cantidadSeleccionadaSpan.textContent);
            return isNaN(cantidadApostada) ? 0 : cantidadApostada;
        } else {
            // Manejar el caso donde el elemento no está disponible
            console.error("El elemento 'cantidadSeleccionadaSpan' no se encuentra en el DOM.");
            return 0; // O cualquier otro valor predeterminado
        }
    }



    ajustarRuleta();

});
