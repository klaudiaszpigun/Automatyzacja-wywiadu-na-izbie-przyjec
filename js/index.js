//DOMContentLoaded - ruchamia się, gdy cały HTML został załadowany i przetworzony przez przeglądarkę
document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(".gender-checkbox");
  let pronoun = "";

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        if (this.value === "Kobieta") {
          pronoun = "ona";
        } else if (this.value === "Mężczyzna") {
          pronoun = "on";
        }

        checkboxes.forEach((cb) => {
          if (cb !== this) cb.checked = false;
        });

        console.log("Wybrany zaimek:", pronoun);
      }
    });
  });
});
