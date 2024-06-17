"use strict";

async function fetchDataFromAPI() {
  try {
    let response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=53.9&lon=27.5667&appid=10d77b831cc7c915ffa063708a535d7c");

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function main() {
  try {
    const data = await fetchDataFromAPI();
    console.log(`Minsk tempreture: ${data.main.temp} F`);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();