// Select input elements one by one
const pressureInput = document.querySelector("#pressure");
const dewpointInput = document.querySelector("#dewpoint");
const humidityInput = document.querySelector("#humidity");
const cloudInput = document.querySelector("#cloud");
const sunshineInput = document.querySelector("#sunshine");
const windDirectionInput = document.querySelector("#winddirection");
const windSpeedInput = document.querySelector("#windspeed");
const submitButton = document.querySelector('input[type="submit"]');

// Get values from the input elements
function getValues() {
  const pressure = parseFloat(pressureInput.value);
  const dewpoint = parseFloat(dewpointInput.value);
  const humidity = parseFloat(humidityInput.value);
  const cloud = parseFloat(cloudInput.value);
  const sunshine = parseFloat(sunshineInput.value);
  const windDirection = parseFloat(windDirectionInput.value);
  const windSpeed = parseFloat(windSpeedInput.value);

  return {
    pressure,
    dewpoint,
    humidity,
    cloud,
    sunshine,
    windDirection,
    windSpeed,
  };
}

// Add event listener to the submit button
submitButton.addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Get the values from the input elements
  const values = getValues();

  // Send the values to the server using fetch
  try {
    const response = await fetch("http://localhost:8080/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    // check if the response is successful
    if (response.ok) {
      console.log("Prediction:", data.prediction);
      // Display the prediction in the HTML
      const resultDiv = document.querySelector(".result-container");
      resultDiv.innerHTML = `Prediction Result: <b>${data.prediction}</b>`;
      resultDiv.classList.remove("error");
      resultDiv.classList.add("success");
      resultDiv.style.display = "block";
    } else {
      console.log(data.error);
      // Display the error in the HTML
      const resultDiv = document.querySelector(".result-container");
      resultDiv.innerHTML = `${data.error}`;
      resultDiv.classList.remove("success");
      resultDiv.classList.add("error");
      resultDiv.style.display = "block";
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
