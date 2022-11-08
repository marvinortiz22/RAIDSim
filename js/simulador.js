    let i=-1
    let sumaInput=document.getElementById("suma")
    let capacidadInput=document.getElementById("capacidad")
    let seguridadInput=document.getElementById("seguridad")
    let sinUsarInput=document.getElementById("sin_usar")
    let graficoDiv=document.getElementById('grafico')
    let capacidadRaid=0, sumaRaid=0, seguridadRaid=0,sinUsarRaid=0, mensaje=""
    crearChart()
    
    
    
    function Generar(capacidadDisco){
        if(i<5){
            i++
            if (capacidadDisco==500)
                var disco ="<li id="+i+" accesskey="+capacidadDisco+" class='disco hdd online'><span>"+capacidadDisco+"GB</span><button onclick=quitar("+i+")>X</button></li>"
            else
                var disco ="<li id="+i+" accesskey="+capacidadDisco+" class='disco hdd online'><span>"+(capacidadDisco/1000)+"TB</span><button onclick=quitar("+i+")>X</button></li>"
            
            let celdas=document.getElementById('lista_ranuras_online')
            
            celdas.innerHTML+=disco
            calcularCapacidad()
            if(i==1)
                crearChart()
            
        }
             
    }

    function quitar(posicion){
        //Se obtiene un array de elementos que tengan por clase "disco hdd online"
        var discosOnLine = document.getElementsByClassName("disco hdd online")

        //Se almacena el elemento "disco hdd on line" que sera borrado despues
        let discoABorrar = discosOnLine[posicion]

        //Se elimina el elemento
        discoABorrar.remove()

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
        let discos=document.getElementsByClassName("disco hdd online")
        if(EsValido()){
            
            calcularSuma()
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
                if(myChart)
                    addData()
                else
                    crearChart()
        }
        else
            {
                myChart.destroy()
                graficoDiv.innerHTML="<p id='parrafo'>"+mensaje+"</p>"
                sumaRaid=0
                capacidadRaid=0
                seguridadRaid=0
                sinUsarRaid=0 
                sumaInput.value=sumaRaid
                capacidadInput.value=capacidadRaid
                seguridadInput.value=seguridadRaid
                sinUsarInput.value=sinUsarRaid   
            }
            
    }

    function calcularMenor(){
        let menor=100000
        let discos=document.getElementsByClassName("disco hdd online")
        for (let j=0;j<discos.length;j++){
            capacidadActual=parseInt(discos[j].getAttribute("accesskey"))
            if(capacidadActual<menor)
                menor=capacidadActual
        }
        return menor
    }
    function calcularSuma(){
        let discos=document.getElementsByClassName("disco hdd online")
        sumaRaid=0
        for(let j=0;j<discos.length;j++){
            sumaRaid+=parseInt(discos[j].getAttribute("accesskey"),10)
        }
        sumaInput.value=sumaRaid
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
            capacidadInput.value=capacidadRaid
            seguridadInput.value=seguridadRaid
            sinUsarInput.value=sinUsarRaid
        }
        else{
            capacidadInput.value="la cantidad debe ser par"
            seguridadInput.value="la cantidad debe ser par"
            sinUsarInput.value="la cantidad debe ser par"
        }
    }
    function addData() {
        myChart.data.datasets[0].data=[capacidadRaid]
        myChart.data.datasets[1].data=[seguridadRaid]
        myChart.data.datasets[2].data=[sinUsarRaid]
        myChart.update()
    }

    function crearChart(){
        
        graficoDiv.innerHTML="<canvas id='myChart'></canvas>"
        const labels = [
            'raid A',
            'raid B'
          ];
        
          const data = {
            labels: labels,
            datasets: [{
                label: 'Capacidad',
                data: [capacidadRaid],
                backgroundColor: 'green',
          borderColor: 'rgb(255, 99, 132)',
              },
              {
                label: 'Copia de seguridad',
                data: [seguridadRaid],
                backgroundColor: 'yellow',
          borderColor: 'rgb(255, 99, 132)',
              },
              {
                label: 'Sin usar',
                data: [sinUsarRaid],
                backgroundColor: 'red',
          borderColor: 'rgb(255, 99, 132)',
              }]
          };
        
          const config = {
            type: 'bar',
            data: data,
            options: {
                plugins: {
                    title: {
                      display: true,
                      text: 'Chart.js Bar Chart - Stacked'
                    },
                  },
                  responsive: true,
                  scales: {
                    x: {
                      stacked: true,
                    },
                    y: {
                      stacked: true
                    }
                  }
                }
                
            }
          
            myChart = new Chart(
                document.getElementById("myChart"),
                config
              );
    
    
    }
    function EsValido(){
        let esvalido=true
        let discos=document.getElementsByClassName("disco hdd online")
        if(discos.length>1){
            switch(select.value){
                case '3':
                    if(discos.length<3){
                        esvalido=false
                        mensaje="Este raid necesita 3 discos o más"
                    }
                    
                    break
                case '5':
                    if(discos.length<3){
                        esvalido=false
                        mensaje="Este raid necesita 3 discos o más"
                    }
                    break
                case '10':
                    if(discos.length%2==1||discos.length<4){
                        esvalido=false
                        mensaje="la cantidad de discos para este raid debe ser par"
                        }
                    break
                case '01':
                    if(discos.length%2==1||discos.length<4){
                        esvalido=false
                        mensaje="la cantidad de discos para este raid debe ser par"
                    }  
                    break
                   
            }
        
            
        }
        else{
            esvalido=false
            mensaje="Por favor ingrese más discos"
        }
        return esvalido
    }
