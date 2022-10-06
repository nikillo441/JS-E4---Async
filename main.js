const form = document.getElementById("form"),
  input = document.getElementById("input_number"),
  container = document.getElementById("result_container"),
  errorMessage = document.getElementById("error");

const fetchData = async () => {
  const pokeUrl = "https://pokeapi.co/api/v2/pokemon/" + input.value;
  try {
    const getData = await fetch(pokeUrl);
    const jsonData = await getData.json();
    renderHtml(jsonData);
  } catch (error) {
    console.log(error),
      (errorMessage.style.display = "block"),
      (errorMessage.innerHTML = "No encontramos ese pokemon"),
      (container.innerHTML = "");
  }
};

const renderHtml = (data) => {
  const { name, height, weight } = data;
  container.innerHTML = `
  <h1>${name}</h1>
  <img src="${
    data.sprites.front_default
  }" alt="Imagen del Pokemon" class="pokemon_img">
  <h2>${data.types[0].type.name}</h2>
  <span class="height">${height / 10} cm</span>
  <span class="weight">${weight / 10} kg</span>
  `;
};

const isFormValid = () => {
  if (input.value === "") {
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
    fetchData();
  }
};

const init = () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    isFormValid();
  });
};

init();