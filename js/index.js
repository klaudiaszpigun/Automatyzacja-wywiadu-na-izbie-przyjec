document.addEventListener("DOMContentLoaded", function () {
  // elementy input
  const genderCheckboxes = document.querySelectorAll(".gender-checkbox");
  // input wieku
  const ageText = document.querySelector(".age-text");
  // finalny tekst
  const finalTextArea = document.getElementById("result-text");
  // element input
  const normalHome = document.querySelector(".full-family");
  // element input wywołujący pojawienie się obszaru tekstowego
  const notNormalHome = document.querySelectorAll(".other-forms-of-family");
  // kontener w którym powstaje obszar teksowy
  const homeDiv = document.querySelector(".family-input-div");
  // elementy input zwiazane z hospitalizacja
  const hospitalizedRadios = document.querySelectorAll(".hospitalized");
  const hospitalizedFrom = document.querySelector(".hospitalized-from");
  const hospitalized = document.querySelectorAll(".hospitalized");
  const psychiatristRadios = document.querySelectorAll(".psychiatrist");
  const psychiatristDiv = document.querySelector(".psychiatrist-div");
  const medicinesDiv = document.querySelector(".medicines-div");
  const psychologistDiv = document.querySelector(".psychologist-div");
  const psychologist = document.querySelectorAll(".psychologist");
  // zaimki
  let pronoun = "";
  let ka = "";
  let a = "";
  let y = "";
  let textArea = [];

  // dla każdego checkboxa
  genderCheckboxes.forEach((checkbox) => {
    // dodaj nasłuchiwanie eventu zmiany
    checkbox.addEventListener("change", function () {
      // jeśłi element nasłuchiwany jest wybrany
      if (this.checked) {
        // przypisanie wartości zmiennej pronoun
        // jesli watrosc kliknietego elementu to kobieta
        // przypisywana jest wartosc 'ona'
        // w przeciwnym wypadku 'on'
        pronoun = this.value === "Kobieta" ? "ona" : "on";
        // wartość zmiennej 'ka', to końcówki wyrazów
        ka = this.value === "Kobieta" ? "ka" : "";
        a = this.value === "Kobieta" ? "a" : "";
        y = this.value === "Kobieta" ? "" : "y";
        // odznaczanie pozostalych checkboxów
        genderCheckboxes.forEach((cb) => {
          if (cb !== this) cb.checked = false;
        });

        console.log("Wybrany zaimek:", pronoun);
      }
    });
  });

  ageText.addEventListener("input", () => {
    // usunięcie spacji i tabulatorów z wartosci pola tekstowego
    const value = ageText.value.trim();
    // jesli istnieje wartosc
    if (value) {
      // wygeneruj tekst uwzgledniajac zaimki
      const text =
        pronoun === "ona"
          ? `Pacjent${ka} lat ${value},`
          : `Pacjent lat ${value},`;
      // przeszukiwanie tablicy textArea i usuniecie obiektow. z kkluczem wiek
      textArea = textArea.filter((entry) => !entry.wiek);
      // dodanie nowego klucza z nowa trescia
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

  notNormalHome.forEach((checkbox) => {
    // nasluchuj elementy checkbox
    checkbox.addEventListener("change", () => {
      // element tekstowy
      let homeInput = document.getElementById("homeInput");
      // w przypadku zaznaczenia opcji niepelnej rodziny
      if (checkbox.checked) {
        // jesli input do rozwiniecia sytualcji rodzinnej nie isttnieje
        if (!homeInput) {
          //tworzenie inputu
          homeInput = document.createElement("input");
          homeInput.type = "text";
          homeInput.placeholder = "Podaj więcej informacji";
          homeInput.id = "homeInput";
          homeDiv.appendChild(homeInput);
          // nasluchiwanie inputu
          homeInput.addEventListener("input", () => {
            // Usunięcie poprzedniej wartości
            const value = homeInput.value.trim();
            textArea = textArea.filter((entry) => !entry.dom);
            // przypisywanie jego wartosci dla obiektu
            if (value) {
              textArea.push({ dom: value });
            }
            updateFinalText();
          });
        }
      }
      // jesli jest to normalna rodzina
      else {
        if (homeInput) {
          // usuwany jest input i tekst
          homeDiv.removeChild(homeInput);
          textArea = textArea.filter((entry) => !entry.dom);
          updateFinalText();
        }
      }
    });
  });

  hospitalizedRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      removeHospitalizedInputs();

      if (radio.checked && radio.value === "Tak") {
        const labelOd = document.createElement("label");
        labelOd.id = "hospitalizedLabelOd";
        labelOd.textContent = "Od: ";
        const inputOd = document.createElement("input");
        inputOd.type = "text";
        inputOd.class = "input";
        inputOd.id = "hospitalizedInputOd";
        inputOd.placeholder = "Data rozpoczęcia";

        const labelDo = document.createElement("label");
        labelDo.id = "hospitalizedLabelDo";
        labelDo.textContent = " Do: ";
        const inputDo = document.createElement("input");
        inputDo.class = "input";
        inputDo.type = "text";
        inputDo.id = "hospitalizedInputDo";
        inputDo.placeholder = "Data zakończenia";

        hospitalizedFrom.appendChild(labelOd);
        hospitalizedFrom.appendChild(inputOd);
        hospitalizedFrom.appendChild(labelDo);
        hospitalizedFrom.appendChild(inputDo);

        const updateHospitalizationText = () => {
          const from = inputOd.value.trim();
          const to = inputDo.value.trim();
          textArea = textArea.filter((entry) => !entry.hospitalizacja);
          if (from || to) {
            textArea.push({
              hospitalizacja: `Ostatnia hospitalizacja psychiatryczna od: ${
                from || "?"
              } do: ${to || "?"}`,
            });
          }
          updateFinalText();
        };

        inputOd.addEventListener("input", updateHospitalizationText);
        inputDo.addEventListener("input", updateHospitalizationText);
      } else {
        textArea = textArea.filter((entry) => !entry.hospitalizacja);
        textArea.push({
          hospitalizacja: `Nigdy nie był${a} hospitalizowan${
            y || a
          } psychiatrycznie.`,
        });

        const questionConsultation = document.createElement("label");
        questionConsultation.textContent =
          "Czy Pacjent był konsultowany na tutejszej izbie przyjęć?";
        questionConsultation.id = "questionConsultation";

        const consultationRadio = document.createElement("input");
        consultationRadio.name = "consultation";
        consultationRadio.type = "radio";
        consultationRadio.value = "Tak";

        const noConsultationRadio = document.createElement("input");
        noConsultationRadio.name = "consultation";
        noConsultationRadio.type = "radio";
        noConsultationRadio.value = "Nie";

        const labelTak = document.createElement("label");
        labelTak.textContent = "Tak";
        labelTak.prepend(consultationRadio);

        const labelNie = document.createElement("label");
        labelNie.textContent = "Nie";
        labelNie.prepend(noConsultationRadio);

        hospitalizedFrom.appendChild(questionConsultation);
        hospitalizedFrom.appendChild(labelTak);
        hospitalizedFrom.appendChild(labelNie);

        consultationRadio.addEventListener("change", () => {
          if (consultationRadio.checked) {
            textArea = textArea.filter((entry) => !entry.konsultacja);
            const consultationDateLabel = document.createElement("label");
            consultationDateLabel.textContent = "W dniu:";
            const consultationDateInput = document.createElement("input");
            consultationDateInput.type = "text";
            consultationDateInput.placeholder = "Data konsultacji:";
            consultationDateInput.id = "inputConsultation";

            hospitalizedFrom.appendChild(consultationDateLabel);
            hospitalizedFrom.appendChild(consultationDateInput);

            consultationDateInput.addEventListener("input", () => {
              const consultationValue = consultationDateInput.value.trim();
              textArea = textArea.filter((entry) => !entry.konsultacja);
              textArea.push({
                konsultacja: `Był${a} konsultowan${
                  y || a
                } na tutejszej izbie przyjęć w dniu: ${consultationValue}.`,
              });
              updateFinalText();
            });
          }
        });

        noConsultationRadio.addEventListener("change", () => {
          if (noConsultationRadio.checked) {
            textArea = textArea.filter((entry) => !entry.konsultacja);
            textArea.push({
              konsultacja: `Nie był${a} konsultowan${
                y || a
              } na tutejszej izbie przyjęć.`,
            });
            updateFinalText();
          }
        });

        updateFinalText();
      }
    });
  });

  psychiatristRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.checked && radio.value === "Tak") {
        const inputPsyschiatristOd = document.createElement("input");
        inputPsyschiatristOd.type = "text";
        inputPsyschiatristOd.name = "Data";
        inputPsyschiatristOd.placeholder = "Od";
        inputPsyschiatristOd.id = "inputConsultation";

        const reasonLabel = document.createElement("span");
        const reason = document.createElement("input");
        reason.type = "text";
        reason.placeholder = "Z powodu";
        reason.id = "inputConsultation";

        const diagnosis = document.createElement("input");
        diagnosis.type = "text";
        diagnosis.placeholder = "Z rozpoznaniem";
        diagnosis.id = "inputConsultation";

        const medicinesLabel = document.createElement("label");
        medicinesLabel.textContent = "Czy Pacjent przyjmuje leki?";
        medicinesLabel.id = "questionConsultation";

        const medicineLabel = document.createElement("label");
        medicineLabel.textContent = "Tak";
        const medicines = document.createElement("input");
        medicines.type = "radio";
        medicines.value = "Tak";
        medicines.className = "medicineRadio";
        medicineLabel.prepend(medicines);

        const noMedicinesLabel = document.createElement("label");
        noMedicinesLabel.textContent = "Nie";
        const noMedicines = document.createElement("input");
        noMedicines.type = "radio";
        noMedicines.value = "Nie";
        noMedicines.className = "medicineRadio";
        noMedicinesLabel.prepend(noMedicines);

        psychiatristDiv.appendChild(inputPsyschiatristOd);
        psychiatristDiv.appendChild(reason);
        psychiatristDiv.appendChild(diagnosis);
        medicinesDiv.appendChild(medicinesLabel);

        medicinesDiv.appendChild(medicineLabel);

        medicinesDiv.appendChild(noMedicinesLabel);

        inputPsyschiatristOd.addEventListener("input", () => {
          const psychiatristValue = inputPsyschiatristOd.value.trim();
          textArea = textArea.filter((entry) => !entry.psychiatra);
          if (psychiatristValue) {
            textArea.push({
              psychiatra: `Pod opieką ambulatoryjną psychiatry jest od ${psychiatristValue},`,
            });
            reason.addEventListener("input", () => {
              const reasonValue = reason.value.trim();
              textArea = textArea.filter((entry) => !entry.powód);
              if (reasonValue) {
                textArea.push({
                  powód: `z powodu ${reasonValue}.`,
                });
              }
              updateFinalText();
            });
            diagnosis.addEventListener("input", () => {
              const diagnosisValue = diagnosis.value.trim();
              textArea = textArea.filter((entry) => !entry.rozpoznanie);
              if (diagnosis.value) {
                textArea.push({
                  rozpoznanie: `z rozpoznaniem ${diagnosisValue}.`,
                });
              }
              updateFinalText();
            });
            updateFinalText();
          }
        });

        const medicineRadios = document.querySelectorAll(".medicineRadio");

        medicineRadios.forEach((radio) => {
          radio.addEventListener("change", () => {
            if (radio.checked && radio.value === "Tak") {
              const actualMedicines = document.createElement("textarea");
              actualMedicines.placeholder =
                "Przyjmowane leki, całym zdaniem wraz z dawkami";
              actualMedicines.id = "inputConsultation";
              medicinesDiv.appendChild(actualMedicines);
              updateFinalText();
              actualMedicines.addEventListener("input", () => {
                const actualMedicinesValue = actualMedicines.value.trim();
                textArea = textArea.filter((entry) => !entry.leki);
                if (actualMedicines.value) {
                  textArea.push({
                    leki: `${actualMedicinesValue}`,
                  });
                  updateFinalText();
                }
              });
            }
            if (radio.checked && radio.value === "Nie") {
              textArea = textArea.filter((entry) => !entry.leki);
              textArea.push({
                leki: "Nie przyjmuje żadnych leków.",
              });
              updateFinalText();
            }
          });
        });
      } else {
        textArea = textArea.filter((entry) => !entry.psychiatra);
        updateFinalText();
      }
    });

    psychologist.forEach((radio) => {
      radio.addEventListener("change", () => {
        // Sprawdź, czy istnieje input i usuń go, jeśli jest
        const existingInput = document.getElementById("psychologistSince");
        if (existingInput) {
          existingInput.remove();
        }

        // Jeśli wybrano "Tak", dodaj input
        if (radio.checked && radio.value === "Tak") {
          const psychologistSince = document.createElement("input");
          psychologistSince.type = "text";
          psychologistSince.id = "psychologistSince"; // unikaj powtarzania id!
          psychologistSince.placeholder = "Od kiedy";
          psychologistDiv.appendChild(psychologistSince);
        }
      });
    });
  });

  function removeHospitalizedInputs() {
    const inputOd = document.getElementById("hospitalizedInputOd");
    const labelOd = document.getElementById("hospitalizedLabelOd");
    const inputDo = document.getElementById("hospitalizedInputDo");
    const labelDo = document.getElementById("hospitalizedLabelDo");

    if (inputOd) hospitalizedFrom.removeChild(inputOd);
    if (labelOd) hospitalizedFrom.removeChild(labelOd);
    if (inputDo) hospitalizedFrom.removeChild(inputDo);
    if (labelDo) hospitalizedFrom.removeChild(labelDo);
  }

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
