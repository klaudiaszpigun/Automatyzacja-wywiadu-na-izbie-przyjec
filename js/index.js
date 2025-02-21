const genderCheckboxes = document.querySelectorAll(".gender-checkbox");
const ageText = document.querySelector(".age-text");
const finalTextArea = document.getElementById("result-text");
const notNormalHome = document.querySelectorAll(".other-forms-of-family");
const homeDiv = document.querySelector(".family-input-div");
let pronoun = "";
let age = "";
let textArea = [];
let ka;
//DOMContentLoaded - ruchamia się, gdy cały HTML został załadowany i przetworzony przez przeglądarkę
document.addEventListener("DOMContentLoaded", function () {
  genderCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        if (this.value === "Kobieta") {
          pronoun = "ona";
          ka = "ka";
        } else if (this.value === "Mężczyzna") {
          pronoun = "on";
        }

        genderCheckboxes.forEach((cb) => {
          if (cb !== this) cb.checked = false;
        });

        console.log("Wybrany zaimek:", pronoun);
      }
    });
  });
  ageText.addEventListener("change", () => {
    if (ageText.value) {
      textArea.push({ wiek: `Pacjent${ka} lat ${ageText.value}` });
      console.log(textArea);
      if (finalTextArea) {
        finalTextArea.value = textArea
          .map((patient) => `${patient.wiek}`)
          .join("\n");
      } else {
        console.error("Nie znaleziono textarea!");
      }
    }
  });
  notNormalHome.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      let homeInput;

      if (checkbox.checked) {
        // Sprawdzamy, czy już mamy input w divie, aby uniknąć duplikatów
        if (!homeDiv.querySelector("input")) {
          homeInput = document.createElement("input"); // Tworzymy nowy input
          homeInput.type = "text";
          homeInput.placeholder = "podaj więcej informacji";
          homeInput.id = "homeInput";
          homeDiv.appendChild(homeInput); // Dodajemy input do div
        }
      } else {
        // Usuwamy input, jeśli checkbox jest odznaczony
        homeInput = homeDiv.querySelector("input");
        if (homeInput) {
          homeDiv.removeChild(homeInput); // Usuwamy input z div
        }
      }
    });
  });
});
