let celdas = document.getElementById("raid").getElementsByTagName("td")
let celdaInicial = 0, celdaFinal = 0, fila = 6, paridadRaid5 = 0
let letras = ["F", "E", "D", "C", "B", "A"]
let select = document.getElementById("select")
let dato=document.getElementById("dato")
let output = document.getElementById("ti2")
var input = document.getElementById("dato")
let select3=document.getElementById("select3")



function ubicarCelda() {
    if(fila>0){
    fila--
    switch (fila) {
        case 0:
            celdaInicial = 30
            celdaFinal = 35
            break
        case 1:
            celdaInicial = 24
            celdaFinal = 29
            break
        case 2:
            celdaInicial = 18
            celdaFinal = 23
            break
        case 3:
            celdaInicial = 12
            celdaFinal = 17
            break
        case 4:

            celdaInicial = 6
            celdaFinal = 11
            break
        case 5:
            celdaInicial = 0
            celdaFinal = 5
            break
    }
    
}
    if(select3.value=="binaria")
        AgregarDatoBinario(celdaInicial,celdaFinal)
    else
        AgregarDatoGenerico(celdaInicial,celdaFinal)
}

function cambioDeSimulacion(){
    fila = 6
    for (let i = 0; i < celdas.length; i++) {
        celdas[i].innerHTML = ""
    }
    if(select3.value=="binaria")
        dato.disabled=false
    else
        dato.disabled=true
    output.innerHTML=""
}

function AgregarDatoBinario(celdaInicial, celdaFinal) {
    output.innerHTML = "";
    for (var i = 0; i < dato.value.length; i++) {
        output.innerHTML += dato.value[i].charCodeAt(0).toString(2) + " ";
    }
    switch (select.value) {
        case '0':
            for (let i = celdaInicial, j = 0; i <= celdaFinal; i++, j++) {
                celdas[i].innerHTML = "<div id='bloque'>" + dato.value[j].charCodeAt(0).toString(2) + "</div>"
            }
            break
        case '1':
            for (let i = celdaInicial; i <= celdaFinal; i++) {
                if(i==celdaInicial)
                    celdas[i].innerHTML = "<div id='bloque'>" + dato.value.charCodeAt(0).toString(2) + "</div>"
                else
                    celdas[i].innerHTML = "<div id='seguridad'>" + dato.value.charCodeAt(0).toString(2) + "</div>"
            }
            break
        case '3':
            for (let i = celdaInicial, j = 0; i <= celdaFinal; i++, j++) {
                if (i < celdaFinal)
                    celdas[i].innerHTML = "<div id='bloque'>" + dato.value[j].charCodeAt(0).toString(2) + "</div>"
                else
                    celdas[i].innerHTML = "<div id='paridad'>" + xor()+ "</div>"

            }
            break
        case '5':
            
            if (fila == 5||fila==1)
                paridadRaid5 = celdaFinal
            if (fila == 4||fila==0)
                paridadRaid5 = celdaFinal - 1
            if (fila == 3)
                paridadRaid5 = celdaFinal - 2
            if (fila == 2)
                paridadRaid5 = celdaFinal - 3
            if (fila==1)
                paridadRaid5 = celdaFinal - 4
            if (fila==0)
                paridadRaid5 = celdaFinal - 5
            for (let i = celdaInicial, j = 0; i <= celdaFinal; i++, j++) {
                if (i == paridadRaid5){
                    celdas[i].innerHTML = "<div id='paridad'>" + xor() + "</div>"
                    j--
                }
                else
                    celdas[i].innerHTML = "<div id='bloque'>" + dato.value[j].charCodeAt(0).toString(2)+ "</div>"
            }
            break
        case '10':
            
            for (let i = celdaInicial, j = 0,k=0; i <= celdaFinal; i++,k++) {
                if(k%2!=0){
                    celdas[i].innerHTML = "<div id='seguridad'>" + dato.value[j].charCodeAt(0).toString(2) + "</div>"

                    j++
                }
                    
                else
                    celdas[i].innerHTML = "<div id='bloque'>" + dato.value[j].charCodeAt(0).toString(2) + "</div>"

            }
            break
        case '01':
            
            for (let i = celdaInicial, j = 0,k=0; i <= celdaFinal; i++, j++,k++) {
                if(k<2)
                    celdas[i].innerHTML = "<div id='bloque'>" + dato.value[j].charCodeAt(0).toString(2) + "</div>"
                else
                    celdas[i].innerHTML = "<div id='seguridad'>" + dato.value[j].charCodeAt(0).toString(2) + "</div>"
                if(j%2!=0)
                    j=-1   
            }
            break

    }
}
function limpiarRaid() {
    fila = 6
    for (let i = 0; i < celdas.length; i++) {
        celdas[i].innerHTML = ""
    }
    switch(select.value){
        case '0':
            dato.innerHTML="<option value='abrazo'>abrazo</option><option value='bagres'>bagres</option><option value='cabeza'>cabeza</option><option value='deseos'>deseos</option><option value='empeño'>empeño</option>"
            break
        case '1':
            dato.innerHTML="<option value='A'>A</option><option value='B'>B</option><option value='C'>C</option><option value='D'>D</option><option value='E'>E</option>"
            break
        case '3':
            dato.innerHTML="<option value='altos'>altos</option><option value='bebes'>bebes</option><option value='cabra'>cabra</option><option value='dados'>dados</option><option value='euros'>euros</option>"
            break
        case '5':
            dato.innerHTML="<option value='altos'>altos</option><option value='bebes'>bebes</option><option value='cabra'>cabra</option><option value='dados'>dados</option><option value='euros'>euros</option>"
            break
        case '10':
            dato.innerHTML="<option value='ala'>ala</option><option value='cae'>cae</option><option value='hoy'>hoy</option><option value='iba'>iba</option><option value='iva'>iva</option>"
            break
        case '01':
            dato.innerHTML="<option value='yo'>yo</option><option value='ya'>ya</option><option value='vi'>vi</option><option value='la'>la</option><option value='me'>me</option>"
            break
    }
}

function xor(){
    var xor=(String.fromCharCode(dato.value[0].charCodeAt(0) ^ dato.value[1].charCodeAt(0)^dato.value[2].charCodeAt(0) ^dato.value[3].charCodeAt(0) ^dato.value[4].charCodeAt(0) )).charCodeAt(0).toString(2)
    return xor
}

function AgregarDatoGenerico(celdaInicial, celdaFinal) {
    switch (select.value) {
        case '0':
            for (let i = celdaInicial, j = 0; i <= celdaFinal; i++, j++) {
                celdas[i].innerHTML = "<div id='bloque'>" + letras[fila] + j + "</div>"
            }
            break
        case '1':
            for (let i = celdaInicial; i <= celdaFinal; i++) {
                if(i==celdaInicial)
                    celdas[i].innerHTML = "<div id='bloque'>" + letras[fila] + "</div>"
                else
                    celdas[i].innerHTML = "<div id='seguridad'>" + letras[fila] + "</div>"
            }
            break
        case '3':
            for (let i = celdaInicial, j = 0; i <= celdaFinal; i++, j++) {
                if (i < celdaFinal)
                    celdas[i].innerHTML = "<div id='bloque'>" + letras[fila] + j + "</div>"
                else
                    celdas[i].innerHTML = "<div id='paridad'>Parity" + letras[fila] + "</div>"

            }
            break
        case '5':
            
            if (fila == 5||fila==1)
                paridadRaid5 = celdaFinal
            if (fila == 4||fila==0)
                paridadRaid5 = celdaFinal - 1
            if (fila == 3)
                paridadRaid5 = celdaFinal - 2
            if (fila == 2)
                paridadRaid5 = celdaFinal - 3
            if (fila==1)
                paridadRaid5 = celdaFinal - 4
            if (fila==0)
                paridadRaid5 = celdaFinal - 5
            for (let i = celdaInicial, j = 0; i <= celdaFinal; i++, j++) {
                if (i == paridadRaid5){
                    celdas[i].innerHTML = "<div id='paridad'>Parity" + letras[fila] + "</div>"
                    j--
                }
                else
                    celdas[i].innerHTML = "<div id='bloque'>" + letras[fila] + j + "</div>"
            }
            break
        case '10':
            
            for (let i = celdaInicial, j = 0,k=0; i <= celdaFinal; i++,k++) {
                if(k%2!=0){
                    celdas[i].innerHTML = "<div id='seguridad'>" + letras[fila] + j + "</div>"

                    j++
                }
                else
                    celdas[i].innerHTML = "<div id='bloque'>" + letras[fila] + j + "</div>"

                    
            }
            break
        case '01':
            
            for (let i = celdaInicial, j = 0; i <= celdaFinal; i++, j++) {
                if(j%2!=0){
                    celdas[i].innerHTML = "<div id='seguridad'>" + letras[fila] + j + "</div>"
                    j=-1 
                }
                else
                    celdas[i].innerHTML = "<div id='bloque'>" + letras[fila] + j + "</div>"
            }
            break
    }
}

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}