    let i=-1
    let sumaInput=document.getElementById("suma")
    let capacidadInput=document.getElementById("capacidad")
    let seguridadInput=document.getElementById("seguridad")
    let sinUsarInput=document.getElementById("sin usar")
    let capacidadRaid=0, sumaRaid=0, seguridadRaid,sinUsarRaid
    var menor=100000
    
    function Generar(capacidadDisco){
        if(i<5){
            i++
            if (capacidadDisco==500)
                //var disco="<div id="+i+" accesskey="+capacidadDisco+" title='disco' class='disco'>"+capacidadDisco+"GB</div>"
                var disco ="<li id="+i+" accesskey="+capacidadDisco+" class='disco hdd online'><span>"+capacidadDisco+"GB</span><button onclick=quitar("+i+")>X</button></li>"
            else
                //var disco="<div id="+i+" accesskey="+capacidadDisco+" title='disco' class='disco'>"+(capacidadDisco/1000)+"TB</div>"
                var disco ="<li id="+i+" accesskey="+capacidadDisco+" class='disco hdd online'><span>"+(capacidadDisco/1000)+"TB</span><button onclick=quitar("+i+")>X</button></li>"
            
            //let celdas=document.getElementsByTagName("td")
            let celdas=document.getElementById('lista_ranuras_online')
            
            //celdas[i].innerHTML+=disco
            celdas.innerHTML+=disco
            let discoActual=document.getElementById(""+i+"")
            sumaRaid=parseInt(sumaInput.value,10)
            sumaRaid+=parseInt(discoActual.getAttribute("accesskey"),10)
            sumaInput.value=sumaRaid
        }
             
    }

    function quitar(posicion){
        let borrado=document.getElementById(""+posicion+"")
        borrado.remove()
        sumaRaid-=borrado.getAttribute("accesskey")
        sumaInput.value=sumaRaid
        i--
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
        let discos=document.getElementsByClassName("disco")
        for (let j=0;j<discos.length;j++){
            capacidadActual=parseInt(discos[j].getAttribute("accesskey"))
            if(capacidadActual<menor)
                menor=capacidadActual
        }
        return menor
    }

    function raid0(){
        capacidadRaid=sumaRaid
        capacidadInput.value=capacidadRaid
        seguridadInput.value=0
        sinUsarInput.value=0
    }
    function raid1(){
        let discos=document.getElementsByClassName("disco")
        capacidadRaid=calcularMenor()
        capacidadInput.value=capacidadRaid
        seguridadInput.value=capacidadRaid*discos.length-capacidadRaid
        sinUsarInput.value=sumaRaid-capacidadInput.value-seguridadInput.value
    }

    function raid5(){
        let discos=document.getElementsByClassName("disco")
        capacidadRaid=calcularMenor()*(discos.length-1)
        capacidadInput.value=capacidadRaid
        seguridadInput.value=calcularMenor()
        sinUsarInput.value=sumaRaid-capacidadInput.value-seguridadInput.value
        
    }

    function raid10(){
        let discos=document.getElementsByClassName("disco")
        if(discos.length%2==0){
            capacidadInput.value=calcularMenor()*(discos.length/2)
            seguridadInput.value=capacidadInput.value
            sinUsarInput.value=sumaRaid-capacidadInput.value-seguridadInput.value
        }
        else{
            capacidadInput.value="la cantidad debe ser par"
            seguridadInput.value="la cantidad debe ser par"
            sinUsarInput.value="la cantidad debe ser par"
        }

        
    }