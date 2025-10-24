document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');
  const links = nav?.querySelectorAll('a');
  const loading = document.createElement('div');
  loading.id = 'loading';
  loading.textContent = 'Cargando mapa...';
  document.body.appendChild(loading);

  try {
    if (menuToggle && nav && links) {
      const toggleMenu = () => {
        nav.classList.toggle('activo');
        menuToggle.classList.toggle('abierto');
      };
      const closeMenu = () => {
        nav.classList.remove('activo');
        menuToggle.classList.remove('abierto');
      };
      menuToggle.addEventListener('click', toggleMenu, { passive: true });
      links.forEach(link => link.addEventListener('click', closeMenu, { passive: true }));
    }

    const municipio = { nombre: "Zinacantepec, Estado de México", lat: 19.2847, lon: -99.7405, zoom: 12 };
    const map = L.map("map");
    map.setView([municipio.lat, municipio.lon], municipio.zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "&copy; <a href='https://www.openstreetmap.org'>OpenStreetMap</a> contributors"
    }).addTo(map);

    const zonas = [
      { nombre: "San Miguel Zinacantepec", lat: 19.283, lon: -99.735, info: "Precipitación(mm): 1200<br>Escasez: Baja<br>Población: 8900<br>Observaciones: Zona alta, mayor lluvia" },
      { nombre: "San Luis Mextepec", lat: 19.2972, lon: -99.7372, info: "Precipitación(mm): 850<br>Escasez: Media<br>Población: 7600<br>Observaciones: Zona media" },
      { nombre: "San Cristobal Tecolit", lat: 19.2719, lon: -99.7478, info: "Precipitación(mm): 600<br>Escasez: Alta<br>Población: 5100<br>Observaciones: Menor precipitación" },
      { nombre: "San Lorenzo Cuauhtenco", lat: 19.28, lon: -99.77, info: "Precipitación(mm): 500<br>Escasez: Alta<br>Población: 4200<br>Observaciones: Escasez frecuente" },
      { nombre: "Santa Maria del Monte", lat: 19.28973, lon: -99.82355, info: "Precipitación(mm): 1400<br>Escasez: Baja<br>Población: 4500<br>Observaciones: Bosque denso" }
    ];

    zonas.forEach(z => {
      try {
        const marker = L.marker([z.lat, z.lon]).addTo(map);
        marker.bindPopup(`<div class="infoBox"><strong>${z.nombre}</strong><br>${z.info}</div>`);
        marker.on('click', e => {
          const icon = e.target._icon;
          if (icon) {
            icon.classList.add('bounce');
            setTimeout(() => icon.classList.remove('bounce'), 600);
          }
        }, { passive: true });
      } catch {}
    });

    const zinacantepecGeoJSON = {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-99.9023, 19.3361], [-99.8980, 19.3300], [-99.8900, 19.3250],
          [-99.8820, 19.3200], [-99.8750, 19.3150], [-99.8650, 19.3100],
          [-99.8550, 19.3050], [-99.8450, 19.3000], [-99.8350, 19.2950],
          [-99.8250, 19.2900], [-99.8150, 19.2850], [-99.8050, 19.2800],
          [-99.7950, 19.2750], [-99.7850, 19.2700], [-99.7750, 19.2650],
          [-99.7650, 19.2600], [-99.7550, 19.2550], [-99.7450, 19.2500],
          [-99.7350, 19.2450], [-99.7250, 19.2400], [-99.7150, 19.2450],
          [-99.7050, 19.2500], [-99.7000, 19.2600], [-99.7050, 19.2700],
          [-99.7100, 19.2800], [-99.7200, 19.2900], [-99.7300, 19.3000],
          [-99.7400, 19.3100], [-99.7500, 19.3200], [-99.7600, 19.3250],
          [-99.7700, 19.3300], [-99.7800, 19.3350], [-99.9023, 19.3361]
        ]]
      }
    };

    const boundary = L.geoJSON(zinacantepecGeoJSON, { style: { color: "#0066cc", weight: 3, fill: false } }).addTo(map);
    boundary.bindTooltip("Límite del Municipio de Zinacantepec");

    map.whenReady(() => loading.remove());
  } catch {
    loading.textContent = 'Error al cargar el mapa.';
  }
});