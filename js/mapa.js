function cargarMapa() {
    let contenedor = document.getElementById('mapa_uruguay');
    contenedor.innerHTML = ''; 

    let div = document.createElement("mapa");
    div.id = "mapa_uruguay";
    contenedor.appendChild(div);

    let script = document.createElement("script");
    script.src = "https://www.gstatic.com/charts/loader.js";
    document.head.appendChild(script);

    script.onload = function() {
        google.charts.load("current", {
            packages: ["geochart"]
            
        });

        google.charts.setOnLoadCallback(Mapa);
    };

    document.getElementById("idporCarreras").addEventListener("change", Mapa);
    document.getElementById("idporInscripciones").addEventListener("change", Mapa);
}
function Mapa() {
  let carreras = sistema.listaCarreras || [];
  let inscripciones = sistema.listaInscripciones || [];

  let porCarreras = document.getElementById("idporCarreras").checked;
  let cantidades = {};

  let i = 1;
  while (i <= 19) {
    cantidades[i] = 0;
    i = i + 1;
  }

  if (porCarreras) {
    let j = 0;
    while (j < carreras.length) {
      let depto = carreras[j].departamento;
      if (depto in cantidades) {
        cantidades[depto] = cantidades[depto] + 1;
      }
      j = j + 1;
    }
  } else {
    let k = 0;
    while (k < inscripciones.length) {
      let depto = inscripciones[k].carrera.departamento;
      if (depto in cantidades) {
        cantidades[depto] = cantidades[depto] + 1;
      }
      k = k + 1;
    }
  }

  let datos = [['Departamento', 'Cantidad']];
  for (let depto in cantidades) {
    datos.push([codigoISO(parseInt(depto)), cantidades[depto]]);
  }

  let data = google.visualization.arrayToDataTable(datos);

  let opciones = {
    region: 'UY',
    resolution: 'provinces',
    colorAxis: { colors: ['#E9EEF8', '#153066'] },
    backgroundColor: '#FFFFFF',
    datalessRegionColor: '#EEEEEE'
  };

  let contenedor = document.getElementById('mapa');
  contenedor.innerHTML = ""; // Limpia el div antes de dibujar
  let grafico = new google.visualization.GeoChart(contenedor);
  grafico.draw(data, opciones);
}

function codigoISO(numero) {
  let codigos = {
    1: "UY-MO", 2: "UY-CA", 3: "UY-MA", 4: "UY-RO", 5: "UY-TT",
    6: "UY-CL", 7: "UY-RV", 8: "UY-AR", 9: "UY-SA", 10: "UY-PA",
    11: "UY-RN", 12: "UY-SO", 13: "UY-CO", 14: "UY-SJ", 15: "UY-FS",
    16: "UY-FD", 17:"UY-LA", 18: "UY-DU", 19: "UY-TA"
  };
  return codigos[numero];
}