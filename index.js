const apiKey = "fd0775b573c945626263e85aab89cad7";
const city = "Tremestieri Etneo, Catania";
const webhookURL = "https://discordapp.com/api/webhooks/1407690077865508957/41xuvj_Xkz7W-aLCwBh_Sv45_ULwABYZV8vRtws06a5tNLUipGce1i-qdtYLP-yraCHJ";

function inviaMeteo() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const country = data.sys.country;
      const cityName = data.name;
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const lon = data.coord.lon;
      const lat = data.coord.lat;
      const humidity = data.main.humidity;
      const speed = data.wind.speed;
      const speedKmh = (speed * 3.6).toFixed(1);
      const timestamp = data.dt;
      const date = new Date(timestamp * 1000);

      const payload = {
        username: "Meteo-Bot",
        avatar_url: "https://i.postimg.cc/XqwM2cc3/Savage-Discord.png",
        content: `Dati aggiornati alle: ${date.toLocaleString()}`,
        embeds: [
          {
            title: `Meteo ${cityName}, ${country}`,
            description: `🌤️ ${description}`,
            color: 3447003,
            fields: [
              { name: "🌡️ Gradi Celsius", value: `${temperature} °C` },
              { name: "💧 Umidità", value: `${humidity}%` },
              { name: "💨 Velocità vento", value: `${speedKmh} km/h`},
              { name: "🧭 Longitudine", value: `${lon}`},
              { name: "🧭 Latitudine", value: `${lat}` }
            ],
            footer: {
              text: "Weather - SavageDiscord",
              icon_url: "https://i.postimg.cc/XqwM2cc3/Savage-Discord.png"
            },
            timestamp: new Date().toISOString()
          }
        ]
      };

      fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(response => {
          if (response.ok) {
            console.log("✅ Messaggio inviato!");
          } else {
            console.error("❌ Errore invio:", response.status);
          }
        })
        .catch(error => {
          console.error("❌ Errore rete:", error);
        });
    });
}

// Invia subito alla partenza
inviaMeteo();

// Poi ogni 30 minuti
setInterval(inviaMeteo, 30 * 60 * 1000); // 1800000 ms
