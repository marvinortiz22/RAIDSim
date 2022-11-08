    let i=-1
    let sumaInput=document.getElementById("suma")
    let capacidadInput=document.getElementById("capacidad")
    let seguridadInput=document.getElementById("seguridad")
    let sinUsarInput=document.getElementById("sin_usar")
    let capacidadRaid=0, sumaRaid=0, seguridadRaid,sinUsarRaid
    var menor=100000
    
    function Generar(capacidadDisco){
        if(i<5){
            i++
            if (capacidadDisco==500)
                var disco ="<li id="+i+" accesskey="+capacidadDisco+" class='disco hdd online'><span>"+capacidadDisco+"GB</span><button onclick=quitar("+i+")>X</button></li>"
            else
                var disco ="<li id="+i+" accesskey="+capacidadDisco+" class='disco hdd online'><span>"+(capacidadDisco/1000)+"TB</span><button onclick=quitar("+i+")>X</button></li>"
            
            let celdas=document.getElementById('lista_ranuras_online')
            
            celdas.innerHTML+=disco
            let discoActual=document.getElementById(""+i+"")
            sumaRaid=parseInt(sumaInput.value,10)
            sumaRaid+=parseInt(discoActual.getAttribute("accesskey"),10)
            sumaInput.value=sumaRaid
        }
         calcularCapacidad()    
    }

    function quitar(posicion){
        //Se obtiene un array de elementos que tengan por clase "disco hdd online"
        var discosOnLine = document.getElementsByClassName("disco hdd online")

        //Se almacena el elemento "disco hdd on line" que sera borrado despues
        let discoABorrar = discosOnLine[posicion]

        //Se elimina el elemento
        discoABorrar.remove()

        //Se resta el valor del disco borrado
        sumaRaid-=discoABorrar.getAttribute("accesskey")

        //Se asigna el nuevo valor al inputa "suma"
        sumaInput.value=sumaRaid

        //Al eliminar un disco se debe actualizar los id, tomando el "tamnaño" para realizar esto
        for (let i = 0; i < discosOnLine.length; i++) {
            //se actualiza al id que debe ser en realidad
            discosOnLine[i].id = i
            
            //se obtiene el elemento boton que elimina un disco
            var BotonQuitar = discosOnLine[i].getElementsByTagName("button")[0]

            //Se actualiza el id del boton que debe ser en realidad
            BotonQuitar.setAttribute("onclick","quitar("+ i +")")
        }

        i--
        
        calcularCapacidad()
    }



    function calcularCapacidad(){
        let select=document.getElementById("select")
        switch(select.value){
            case '0':
                raid0()
                break
            case '1':
                raid1()
                break
            case '3':
                raid5()
                break
            case '5':
                raid5()
                break
            case '10':
                raid10()
                break
            case '01':
                raid10()
                break

        }
            

        

    }

    function calcularMenor(){
        let discos=document.getElementsByClassName("disco hdd online")
        for (let j=0;j<discos.length;j++){
            capacidadActual=parseInt(discos[j].getAttribute("accesskey"))
            if(capacidadActual<menor)
                menor=capacidadActual
        }
        return menor
    }

    function raid0(){
        
        capacidadRaid=sumaRaid
        seguridadRaid=0
        sinUsarRaid=0
        capacidadInput.value=capacidadRaid
        seguridadInput.value=0
        sinUsarInput.value=0
    }
    function raid1(){
        let discos=document.getElementsByClassName("disco hdd online")
        
        capacidadRaid=calcularMenor()
        seguridadRaid=capacidadRaid*discos.length-capacidadRaid
        sinUsarRaid=sumaRaid-capacidadRaid-seguridadRaid
        capacidadInput.value=capacidadRaid
        seguridadInput.value=seguridadRaid
        sinUsarInput.value=sinUsarRaid
    }

    function raid5(){
        let discos=document.getElementsByClassName("disco hdd online")
        
        capacidadRaid=calcularMenor()*(discos.length-1)
        seguridadRaid=calcularMenor()
        sinUsarRaid=sumaRaid-capacidadRaid-seguridadRaid
        capacidadInput.value=capacidadRaid
        seguridadInput.value=seguridadRaid
        sinUsarInput.value=sinUsarRaid
        
    }

    function raid10(){
        let discos=document.getElementsByClassName("disco hdd online")
        
        if(discos.length%2==0){
            capacidadRaid=calcularMenor()*(discos.length/2)
            seguridadRaid=capacidadRaid
            sinUsarRaid=sumaRaid-capacidadRaid-seguridadRaid
            seguridadInput.value=seguridadRaid
            sinUsarInput.value=sinUsarRaid
        }
        else{
            capacidadInput.value="la cantidad debe ser par"
            seguridadInput.value="la cantidad debe ser par"
            sinUsarInput.value="la cantidad debe ser par"
        }
    }
    