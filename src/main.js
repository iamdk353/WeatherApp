import axios from "axios";
// states
const state = {
  place: "",
  weather: {},
};

// dom elements
const input = document.getElementById("input");
const search = document.getElementById("search");
const form = document.getElementById("form");

// event listeners
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const resp = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${state.place}&appid=${
        import.meta.env.VITE_API_KEY
      }&units=metric`
    );

    if (resp.status === 200) {
      toast(`${state.place.toUpperCase()} Weather`);
      state.weather = resp.data;
      input.value = "";

      updateDom();
    }
  } catch (error) {
    toast("error in fetching");
  }
});

input.addEventListener("change", (e) => {
  state.place = e.target.value;
});
// functions
function toast(message) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toastMessage");
  toastMsg.innerHTML = message;
  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 1500);
}

function updateDom() {
  const mainTemp = document.getElementById("mainTemp");
  const mainText = document.getElementById("mainText");
  const minTemp = document.getElementById("minTemp");
  const maxTemp = document.getElementById("maxTemp");
  const avgTemp = document.getElementById("avgTemp");
  const sunrise = document.getElementById("sunrise");
  const sunset = document.getElementById("sunset");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");
  const desc = document.getElementById("desc");
  const visibility = document.getElementById("visibility");
  const root = document.getElementById("root");
  const placeDesc = document.getElementById("placeDesc");
  const image = document.getElementById("image");
  //
  const color = String(state.weather.weather[0].main);
  root.classList.forEach((cls) => {
    if (cls.startsWith("bg-")) {
      root.classList.remove(cls);
    }
  });
  root.classList.add(`bg-${color.toLocaleLowerCase()}`);
  image.src = `./${color.toLocaleLowerCase()}.png`;
  placeDesc.innerHTML = state.place;
  mainText.innerHTML = state.weather.weather[0].main;
  mainTemp.innerHTML = String(Math.ceil(state.weather.main.feels_like)) + "° C";
  minTemp.innerHTML = String(Math.ceil(state.weather.main.temp_min)) + "° C";
  maxTemp.innerHTML = String(Math.ceil(state.weather.main.temp_max)) + "° C";
  avgTemp.innerHTML = String(Math.ceil(state.weather.main.temp)) + "° C";
  sunrise.innerHTML = new Date(
    state.weather.sys.sunrise * 1000
  ).toLocaleTimeString();
  sunset.innerHTML = new Date(
    state.weather.sys.sunset * 1000
  ).toLocaleTimeString();
  humidity.innerHTML = state.weather.main.humidity + " %";
  wind.innerHTML = state.weather.wind.speed + " km/hr";
  visibility.innerHTML = state.weather.visibility / 1000 + " km";
  desc.innerHTML = state.weather.weather[0].description;
}
