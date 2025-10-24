function validarFormulario() {
  const form = document.getElementById("form");
  const boton = document.getElementById("botonEnviar");
  const loading = document.createElement("div");
  loading.id = "loading";
  loading.textContent = "Enviando...";
  document.body.appendChild(loading);
  let errores = false;

  try {
    document.querySelectorAll(".error-msg").forEach(el => el.remove());
    document.querySelectorAll("input, textarea").forEach(el => el.classList.remove("error"));

    const nombre = form?.nombre?.value.trim();
    const correo = form?.correo?.value.trim();
    const descripcion = form?.desc?.value.trim();

    if (!nombre) {
      mostrarError(form.nombre, "El nombre es obligatorio.");
      errores = true;
    }
    if (!correo) {
      mostrarError(form.correo, "El correo es obligatorio.");
      errores = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      mostrarError(form.correo, "Correo inválido.");
      errores = true;
    }
    if (!descripcion) {
      mostrarError(form.desc, "La descripción es obligatoria.");
      errores = true;
    }

    if (!errores) {
      boton.disabled = true;
      setTimeout(() => {
        form.submit();
        loading.remove();
        boton.disabled = false;
      }, 1000);
    } else {
      loading.remove();
    }
  } catch {
    loading.textContent = "Error al validar el formulario.";
  }
}

function mostrarError(campo, mensaje) {
  const div = document.createElement("div");
  div.className = "error-msg";
  div.textContent = mensaje;
  campo?.classList.add("error");
  campo?.after(div);
}

document.getElementById("botonEnviar")?.addEventListener("click", e => {
  e.preventDefault();
  validarFormulario();
}, { passive: true });