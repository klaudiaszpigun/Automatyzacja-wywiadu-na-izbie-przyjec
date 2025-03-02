document.addEventListener("DOMContentLoaded", function () {
  const genderCheckboxes = document.querySelectorAll(".gender-checkbox");
  const ageText = document.querySelector(".age-text");
  const finalTextArea = document.getElementById("result-text");
  const normalHome = document.querySelector(".full-family");
  const notNormalHome = document.querySelectorAll(".other-forms-of-family");
  const homeDiv = document.querySelector(".family-input-div");
  const hospitalizedFrom = document.querySelector(".hospitalized-from");
  const hospitalized = document.querySelectorAll(".hospitalized");
  let pronoun = "";
  let ka = "";
  let textArea = [];

  // Obsługa wyboru płci
  genderCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        pronoun = this.value === "Kobieta" ? "ona" : "on";
        ka = this.value === "Kobieta" ? "ka" : "";
        genderCheckboxes.forEach((cb) => {
          if (cb !== this) cb.checked = false;
        });

        console.log("Wybrany zaimek:", pronoun);
      }
    });
  });

  // Obsługa pola wieku
  ageText.addEventListener("input", () => {
    const value = ageText.value.trim();
    if (value) {
      const text =
        pronoun === "ona"
          ? `Pacjent${ka} lat ${value},`
          : `Pacjent lat ${value},`;
      textArea = textArea.filter((entry) => !entry.wiek);
      textArea.push({ wiek: text });
      updateFinalText();
    }
  });
  normalHome.addEventListener("change", () => {
    if (pronoun === "ona") {
      textArea.push({ dom: "wychowywana w rodzinie pełnej." });
      updateFinalText();
    } else {
      textArea.push({ dom: "wychowywany w rodzinie pełnej." });
      updateFinalText();
    }
  });

  // Obsługa dynamicznego pola dla innej formy rodziny
  notNormalHome.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      let homeInput = document.getElementById("homeInput");

      if (checkbox.checked) {
        if (!homeInput) {
          homeInput = document.createElement("input");
          homeInput.type = "text";
          homeInput.placeholder = "Podaj więcej informacji";
          homeInput.id = "homeInput";
          homeDiv.appendChild(homeInput);

          homeInput.addEventListener("input", () => {
            const value = homeInput.value.trim();
            textArea = textArea.filter((entry) => !entry.dom); // Usunięcie poprzedniej wartości
            if (value) {
              textArea.push({ dom: value });
            }
            updateFinalText();
          });
        }
      } else {
        if (homeInput) {
          homeDiv.removeChild(homeInput);
          textArea = textArea.filter((entry) => !entry.dom); // Usunięcie wpisu z tekstu
          updateFinalText();
        }
      }
    });
  });

  hospitalized.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      let hospitalizedInput = document.getElementById("hospitalizedInput");
      let hospitalizedFromLabel = document.getElementById("hospitalizedLabel");

      if (checkbox.value === "Tak") {
        if (!hospitalizedInput) {
          // Tworzenie etykiety
          hospitalizedFromLabel = document.createElement("label");
          hospitalizedFromLabel.id = "hospitalizedLabel";
          hospitalizedFromLabel.textContent = "Od: ";
          hospitalizedFrom.appendChild(hospitalizedFromLabel);

          // Tworzenie pola tekstowego
          hospitalizedInput = document.createElement("input");
          hospitalizedInput.type = "text";
          hospitalizedInput.id = "hospitalizedInput";
          hospitalizedInput.placeholder = "Podaj datę";
          hospitalizedFrom.appendChild(hospitalizedInput);

          // Obsługa wpisywania wartości do textarea
          hospitalizedInput.addEventListener("input", () => {
            const value = hospitalizedInput.value.trim();
            textArea = textArea.filter((entry) => !entry.hospitalizacja); // Usunięcie poprzedniej wartości
            if (value) {
              textArea.push({ hospitalizacja: `Hospitalizacja od: ${value}` });
            }
            updateFinalText();
          });
        }
      } else {
        // Usuwanie dynamicznych elementów
        if (hospitalizedInput) {
          hospitalizedFrom.removeChild(hospitalizedInput);
        }
        if (hospitalizedFromLabel) {
          hospitalizedFrom.removeChild(hospitalizedFromLabel);
        }

        // Usunięcie wpisu z textarea
        textArea = textArea.filter((entry) => !entry.hospitalizacja);
        updateFinalText();
      }
    });
  });

  function updateFinalText() {
    const finalTextArea = document.getElementById("result-text");
    if (finalTextArea) {
      finalTextArea.value = textArea
        .map((entry) => Object.values(entry)[0])
        .join("\n");
    } else {
      console.error("Nie znaleziono textarea!");
    }
  }
});
function updateFinalText() {
  if (finalTextArea) {
    finalTextArea.value = textArea
      .map((entry) => Object.values(entry)[0])
      .join("\n");
  } else {
    console.error("Nie znaleziono textarea!");
  }
}
