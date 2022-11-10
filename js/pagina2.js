let celdas = document.getElementsByTagName("td")
let celdaInicial = 0, celdaFinal = 0, fila = 6, paridadRaid5 = 0
let letras = ["F", "E", "D", "C", "B", "A"]
let select = document.getElementById("select")
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
    AgregarDato(celdaInicial, celdaFinal)
}
}
function AgregarDato(celdaInicial, celdaFinal) {
    switch (select.value) {
        case '0':
            for (let i = celdaInicial, j = 0; i <= celdaFinal; i++, j++) {
                celdas[i].innerHTML = "<div id='bloque'>" + letras[fila] + j + "</div>"
            }
            break
        case '1':
            for (let i = celdaInicial; i <= celdaFinal; i++) {
                celdas[i].innerHTML = "<div id='bloque'>" + letras[fila] + "</div>"
            }
            break
        case '3':
            for (let i = celdaInicial, j = 0; i <= celdaFinal; i++, j++) {
                if (i < celdaFinal)
                    celdas[i].innerHTML = "<div id='bloque'>" + letras[fila] + j + "</div>"
                else
                    celdas[i].innerHTML = "<div id='bloque'>Parity" + letras[fila] + "</div>"

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
                    celdas[i].innerHTML = "<div id='bloque'>Parity" + letras[fila] + "</div>"
                    j--
                }
                else
                    celdas[i].innerHTML = "<div id='bloque'>" + letras[fila] + j + "</div>"
            }
            break
        case '10':
            
            for (let i = celdaInicial, j = 0,k=0; i <= celdaFinal; i++,k++) {
                celdas[i].innerHTML = "<div id='bloque'>" + letras[fila] + j + "</div>"
                if(k%2!=0)
                    j++
            }
            break
        case '01':
            
            for (let i = celdaInicial, j = 0; i <= celdaFinal; i++, j++) {
                celdas[i].innerHTML = "<div id='bloque'>" + letras[fila] + j + "</div>"
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
}