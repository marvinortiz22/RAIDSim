    let i=-1
    let sumaInput=document.getElementById("suma")
    let capacidadInput=document.getElementById("capacidad")
    let seguridadInput=document.getElementById("seguridad")
    let sinUsarInput=document.getElementById("sin_usar")
    let graficoDiv=document.getElementById('grafico')
    let graficoDiv2=document.getElementById('grafico2')
    let sumaInput2=document.getElementById("suma2")
    let capacidadInput2=document.getElementById("capacidad2")
    let seguridadInput2=document.getElementById("seguridad2")
    let sinUsarInput2=document.getElementById("sin_usar2")
    let capacidadRaid=0, sumaRaid=0, seguridadRaid=0,sinUsarRaid=0, mensaje="", myChart1=null,myChart2=null
    let capacidadRaid2=0, seguridadRaid2=0,sinUsarRaid2=0
    let select=document.getElementById("select1")
    let select2=document.getElementById("select2")


    
    
    
    function Generar(capacidadDisco){
        if(i<5){
            i++
            if (capacidadDisco==500)
                var disco ="<li id="+i+" accesskey="+capacidadDisco+" class='disco hdd online'><span>"+capacidadDisco+"GB</span><button onclick=quitar("+i+")>X</button></li>"
            else
                var disco ="<li id="+i+" accesskey="+capacidadDisco+" class='disco hdd online'><span>"+(capacidadDisco/1000)+"TB</span><button onclick=quitar("+i+")>X</button></li>"
            
            let celdas=document.getElementById('lista_ranuras_online')
            
            celdas.innerHTML+=disco
            calcularCapacidad(1,select,capacidadRaid, seguridadRaid,sinUsarRaid,sumaInput,capacidadInput,seguridadInput,sinUsarInput)
            calcularCapacidad(2,select2,capacidadRaid2, seguridadRaid2,sinUsarRaid2,sumaInput2,capacidadInput2,seguridadInput2,sinUsarInput2)
        }
             
    }

function quitar(posicion) {
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
        BotonQuitar.setAttribute("onclick", "quitar(" + i + ")")
    }

    i--
    let select=document.getElementById("select1")
    calcularCapacidad(1,select,capacidadRaid, seguridadRaid,sinUsarRaid,sumaInput,capacidadInput,seguridadInput,sinUsarInput)
    calcularCapacidad(2,select2,capacidadRaid2, seguridadRaid2,sinUsarRaid2,sumaInput2,capacidadInput2,seguridadInput2,sinUsarInput2)
}   

    function cambioSelect(id){
        let select=document.getElementById(""+id+"")
        if (id=="select1")
            calcularCapacidad(1,select,capacidadRaid, seguridadRaid,sinUsarRaid,sumaInput,capacidadInput,seguridadInput,sinUsarInput)
        else
            calcularCapacidad(2,select2,capacidadRaid2, seguridadRaid2,sinUsarRaid2,sumaInput2,capacidadInput2,seguridadInput2,sinUsarInput2)
    }

    function calcularCapacidad(k,select,capacidadRaid, seguridadRaid,sinUsarRaid,sumaInput,capacidadInput,seguridadInput,sinUsarInput){
        let discos=document.getElementsByClassName("disco hdd online")
        if(EsValido(select)){
            calcularSuma()
            switch(select.value){
                case '0':
                    capacidadRaid=sumaRaid
                    seguridadRaid=0   
                    sinUsarRaid=sumaRaid-capacidadRaid-seguridadRaid                 
                    break  
                case '1':
                    capacidadRaid=calcularMenor()
                    seguridadRaid=capacidadRaid*discos.length-capacidadRaid
                    sinUsarRaid=sumaRaid-capacidadRaid-seguridadRaid                    
                    break
                case '3':
                    capacidadRaid = calcularMenor() * (discos.length - 1)
                    seguridadRaid = calcularMenor()
                    sinUsarRaid = sumaRaid - capacidadRaid - seguridadRaid
                    break
                case '5':
                    capacidadRaid = calcularMenor() * (discos.length - 1)
                    seguridadRaid = calcularMenor()
                    sinUsarRaid = sumaRaid - capacidadRaid - seguridadRaid                    
                    break
                case '10':
                    capacidadRaid=calcularMenor()*(discos.length/2)
                    seguridadRaid=capacidadRaid 
                    sinUsarRaid=sumaRaid-capacidadRaid-seguridadRaid                   
                    break
                case '01':
                    capacidadRaid=calcularMenor()*(discos.length/2)
                    seguridadRaid=capacidadRaid
                    sinUsarRaid=sumaRaid-capacidadRaid-seguridadRaid                   
                    break
                   
            }
            if(k==1){
                if(myChart1)
                    addData(myChart1,capacidadRaid,seguridadRaid,sinUsarRaid)
                else
                    crearChart(1,capacidadRaid,seguridadRaid,sinUsarRaid)
            }
            else{
                if(myChart2&&k==2)
                addData(myChart2,capacidadRaid,seguridadRaid,sinUsarRaid)
            else
                crearChart(2,capacidadRaid,seguridadRaid,sinUsarRaid)
            
            }
               
        }
        else
            {
                //Aviso(mensaje)
                if(k==1)
                    graficoDiv.innerHTML="<p id='parrafo'>"+mensaje+"</p>"
                else
                    graficoDiv2.innerHTML="<p id='parrafo'>"+mensaje+"</p>"
                sumaRaid=0
                capacidadRaid=0
                seguridadRaid=0
                sinUsarRaid=0 
            }
            sumaInput.value=sumaRaid
            capacidadInput.value=capacidadRaid
            seguridadInput.value=seguridadRaid
            sinUsarInput.value=sinUsarRaid
            
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

    function addData(myChart,capacidadRaid,seguridadRaid,sinUsarRaid) {
        myChart.data.datasets[0].data=[capacidadRaid]
        myChart.data.datasets[1].data=[seguridadRaid]
        myChart.data.datasets[2].data=[sinUsarRaid]
        myChart.update()
    }

    function crearChart(k,capacidadRaid,seguridadRaid,sinUsarRaid){
        
        if(k==1)
            graficoDiv.innerHTML="<canvas id='myChart"+k+"'></canvas>"
        else
            graficoDiv2.innerHTML="<canvas id='myChart"+k+"'></canvas>"

        const labels = [
            'raid A'
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
                    legend:{
                        display:true,
                        labels:{
                            color:"black"
                        }
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
          
            const myChart = new Chart(
                document.getElementById("myChart"+k+""),
                config
              );
    
    
    }
    function EsValido(select){
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
                        mensaje="la cantidad de discos para este raid debe ser par y mayor o igual 4"
                        }
                    break
                case '01':
                    if(discos.length%2==1||discos.length<4){
                        esvalido=false
                        mensaje="la cantidad de discos para este raid debe ser par y mayor o igual 4"
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

    function Aviso(mensaje) {
        Swal.fire({
            "title": "Aviso",
            "text": mensaje,
            "icon": "error"
        })
    }
    