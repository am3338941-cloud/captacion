function calcularAgua() {
  const areaInput = document.getElementById("area");
  const precipInput = document.getElementById("precipitacion");
  const materialSelect = document.getElementById("material");
  const resultado = document.getElementById("resultado");
  const loading = document.getElementById("loading");

  resultado.classList.remove("visible");

  try {
    const area = parseFloat(areaInput.value);
    const precipitacion = parseFloat(precipInput.value);
    const material = materialSelect.value;

    if (isNaN(area) || area <= 0) {
      resultado.innerHTML = "Ingresa un valor válido para el área del techo.";
      resultado.classList.add("visible");
      resultado.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (isNaN(precipitacion) || precipitacion <= 0) {
      resultado.innerHTML = "Ingresa una precipitación válida (en mm).";
      resultado.classList.add("visible");
      resultado.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (!material) {
      resultado.innerHTML = "Selecciona un material del techo.";
      resultado.classList.add("visible");
      resultado.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    loading.style.display = "block";
    resultado.style.display = "none";

    setTimeout(() => {
      loading.style.display = "none";

      let coeficiente = 0;
      switch (material) {
        case "lamina": coeficiente = 0.9; break;
        case "teja": coeficiente = 0.8; break;
        case "liso": coeficiente = 0.85; break;
        case "rugoso": coeficiente = 0.75; break;
        case "asbesto": coeficiente = 0.8; break;
      }

      const volumen = area * (precipitacion / 1000) * coeficiente * 1000;
      const tinacos = Math.floor(volumen / 1100);
      const duchas = Math.floor(volumen / 60);
      const lavadas = Math.floor(volumen / 50);

      resultado.innerHTML = `
        ✅ Puedes recolectar aproximadamente ${volumen.toFixed(2)} litros de agua.<br>
        🌊 ${tinacos} tinacos de 1100L llenos<br>
        🚿 ${duchas} duchas<br>
        🧺 ${lavadas} lavadoras
      `;
      resultado.style.display = "block";
      resultado.classList.add("visible");
      resultado.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 1000);
  } catch {
    resultado.innerHTML = "Error al calcular el volumen de agua.";
    resultado.classList.add("visible");
    loading.style.display = "none";
  }
}

function calcularROI() {
  const costoInput = document.getElementById('costo');
  const ahorroInput = document.getElementById('ahorro');
  const resultadoo = document.getElementById('resultadoo');
  const loadingROI = document.getElementById('loadingROI');

  try {
    const costo = parseFloat(costoInput.value);
    const ahorro = parseFloat(ahorroInput.value);

    if (isNaN(costo) || isNaN(ahorro) || costo <= 0 || ahorro <= 0) {
      resultadoo.textContent = "No se aceptan números negativos ni 0, por favor, ingresa números válidos.";
      return;
    }

    loadingROI.style.display = "block";
    resultadoo.style.display = "none";

    setTimeout(() => {
      loadingROI.style.display = "none";

      const roi = (costo / ahorro).toFixed(1);
      resultadoo.innerHTML = `Recuperarás tu inversión en <b>${roi}</b> meses.<br>`;
      resultadoo.style.display = "block";

      const resultadoGuardado = { costo, ahorro, roi };
      localStorage.setItem('ultimoResultado', JSON.stringify(resultadoGuardado));

      mostrarGrafico(roi);
    }, 1000);
  } catch {
    resultadoo.textContent = "Error al calcular el ROI.";
    loadingROI.style.display = "none";
  }
}

window.onload = function() {
  try {
    const guardado = localStorage.getItem('ultimoResultado');
    if (guardado) {
      const datos = JSON.parse(guardado);
      document.getElementById('costo').value = datos.costo;
      document.getElementById('ahorro').value = datos.ahorro;
      document.getElementById('resultadoo').innerHTML = `
        Último resultado cargado:<br>
        Recuperarás tu inversión en <b>${datos.roi}</b> meses.
      `;
      mostrarGrafico(datos.roi);
    }
  } catch {}
};

function compartirResultado() {
  try {
    const resultadoo = document.getElementById('resultadoo').innerText;
    const resultado = document.getElementById('resultado').innerText;
    const texto = encodeURIComponent(`Calculadora volumen de Agua:\n${resultado}\nCalculadora ROI:\n${resultadoo}\n¡Cuida el agua y ahorra más!`);
    const url = `https://wa.me/?text=${texto}`;
    window.open(url, '_blank');
  } catch {}
}

function compartirTw() {
  try {
    const resultadoo = document.getElementById('resultadoo').innerText;
    const resultado = document.getElementById('resultado').innerText;
    const texto = encodeURIComponent(`Calculadora volumen de Agua:\n${resultado}\nCalculadora ROI:\n${resultadoo}\n¡Cuida el agua y ahorra más!`);
    const url = `https://twitter.com/intent/tweet?text=${texto}`;
    window.open(url, '_blank');
  } catch {}
}

function mostrarGrafico(roi) {
  try {
    const contenedor = document.getElementById('resultadoo');
    const barrasExistentes = contenedor.querySelectorAll('.bar-container');
    barrasExistentes.forEach(bar => bar.remove());

    const cont = document.createElement('div');
    cont.classList.add('bar-container');
    const bar = document.createElement('div');
    bar.classList.add('bar');
    const porcentaje = Math.min(100, (12 / roi) * 100);
    bar.style.width = porcentaje + '%';
    cont.appendChild(bar);
    contenedor.appendChild(cont);
  } catch {}
}