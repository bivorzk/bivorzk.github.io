const url = "https://api.open-meteo.com/v1/forecast?latitude=47.68&longitude=17.64&current_weather=true&timezone=Europe%2FBerlin";

async function getRainData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();


    if (data.current_weather) {
      const weatherCode = data.current_weather.weathercode;
      

      return weatherCode >= 50 && weatherCode <= 99;
    } else {
      console.log("Current weather data not available.");
      return undefined;
    }
  } catch (error) {
    console.error('Error fetching rain data:', error);
  }
}

async function updateRainDisplay() {
  try {
    const isRaining = await getRainData(url);
    
    if (isRaining !== undefined) {
      document.getElementById("raincheck").innerHTML = isRaining ? "Igen (Pityu)" : "Nem (Gyurika)";
    } else {
      document.getElementById("raincheck").innerHTML = "Nem elerheto az adat.";
    }
  } catch (error) {
    console.error('Error updating rain display:', error);
  }
}

window.onload = updateRainDisplay;
