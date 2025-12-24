const boton = document.querySelector('.boton-flotante');
const asistente = document.getElementById('asistente');
const chat = document.querySelector('.chat');
const opcionesContainer = document.querySelector('.opciones');

// Objeto de respuestas: Texto + Acción
const respuestas = {
  ansiedad: {
    texto: "Respira profundo... 🌿 Te recomiendo probar nuestra técnica de respiración.",
    link: "#meditacion" // Lleva a la sección de meditación
  },
  tristeza: {
    texto: "Está bien no estar bien 💗. Date un momento para ti, no estás sola.",
    link: "#autoestima"
  },
  estres: {
    texto: "Haz una pausa 🧘‍♀️. A veces desconectar 5 minutos lo cambia todo.",
    link: "#autocontrol"
  },
  bien: {
    texto: "¡Qué genial! 🌸 Sigue así, cultivando esa energía positiva.",
    link: null
  }
};

// Abrir/Cerrar el asistente
boton.addEventListener('click', () => {
  asistente.classList.toggle('oculto');
  // Opcional: enfocar el chat al abrir
  if (!asistente.classList.contains('oculto')) {
    chat.scrollTop = chat.scrollHeight;
  }
});

// Lógica de los botones de opciones
document.querySelectorAll('.opciones button').forEach(btn => {
  btn.addEventListener('click', () => {
    const tipo = btn.dataset.respuesta;
    const respuestaBot = respuestas[tipo];

    // 1. Mostrar lo que el usuario eligió
    agregarMensaje(btn.textContent, 'user');

    // 2. Ocultar las opciones para limpiar el chat
    opcionesContainer.style.display = 'none';

    // 3. Simular un pequeño retraso (500ms) para que parezca natural
    setTimeout(() => {
      agregarMensaje(respuestaBot.texto, 'bot');
      
      // Si hay un link sugerido, agregamos un botón extra
      if (respuestaBot.link) {
        const linkBtn = document.createElement('a');
        linkBtn.href = respuestaBot.link;
        linkBtn.textContent = "Ir a la sección recomendada";
        linkBtn.style.display = "inline-block";
        linkBtn.style.marginTop = "10px";
        linkBtn.style.color = "#b271dd";
        linkBtn.style.fontWeight = "bold";
        
        // Al hacer click en el link, cerramos el chat para que vea la sección
        linkBtn.addEventListener('click', () => {
             asistente.classList.add('oculto');
        });

        const ultimoMensaje = chat.lastElementChild;
        ultimoMensaje.appendChild(document.createElement('br'));
        ultimoMensaje.appendChild(linkBtn);
      }

      // 4. Botón para reiniciar la conversación
      mostrarBotonReinicio();
      
    }, 600);
  });
});

// Función auxiliar para crear mensajes
function agregarMensaje(texto, remitente) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('mensaje', remitente);
  msgDiv.textContent = texto;
  chat.appendChild(msgDiv);
  chat.scrollTop = chat.scrollHeight; // Auto-scroll al final
}

// Función para volver a mostrar las opciones
function mostrarBotonReinicio() {
    const reinicioBtn = document.createElement('button');
    reinicioBtn.textContent = "🔄 Volver a empezar";
    reinicioBtn.style.marginTop = "10px";
    reinicioBtn.style.border = "none";
    reinicioBtn.style.background = "transparent";
    reinicioBtn.style.color = "#777";
    reinicioBtn.style.cursor = "pointer";
    reinicioBtn.style.fontSize = "12px";
    reinicioBtn.style.width = "100%";
    
    reinicioBtn.addEventListener('click', () => {
        // Limpiamos el chat dejando solo el saludo original
        chat.innerHTML = '<div class="mensaje bot">Hola 💗 ¿Cómo te sientes hoy?</div>';
        // Volvemos a mostrar las opciones
        opcionesContainer.style.display = 'flex';
    });
    
    chat.appendChild(reinicioBtn);
    chat.scrollTop = chat.scrollHeight;
}
