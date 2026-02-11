fetch("data/events.json")
  .then(res => res.json())
  .then(events => {

    const container = document.getElementById("eventsContainer");

    events.forEach(e => {

      const card = document.createElement("div");
      card.className = "event-card";

      card.innerHTML = `
        <img src="${e.image}" loading="lazy">

        <div class="event-content">
          <h3>${e.title}</h3>
          <p>📅 ${e.date}</p>
          <p>⏰ ${e.time}</p>

          <div class="event-buttons">
            <a href="${e.whatsapp}" target="_blank" class="btn join">
              Join WhatsApp
            </a>

            <button class="btn register">
              Register
            </button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

  });