import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const delayInput = event.currentTarget.querySelector('input[name="delay"]');
    const delay = Number(delayInput.value);

    const stateInput = event.currentTarget.querySelector('input[name="state"]:checked');
    if (!stateInput) return;
    const state = stateInput.value;

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === "fulfilled") {
          resolve(`✅ Fulfilled promise in ${delay}ms`);
        } else {
          reject(`❌ Rejected promise in ${delay}ms`);
        }
      }, delay);
    });

    promise
      .then((value) => {
        iziToast.success({
          title: 'Успіх',
          message: value,
          position: 'topRight',
          timeout: 3000,
        });
        form.reset(); // очищаємо інпут і радіо
      })
      .catch((error) => {
        iziToast.error({
          title: 'Помилка',
          message: error,
          position: 'topRight',
          timeout: 3000,
        });
        form.reset(); // очищаємо інпут і радіо
      });
  });
});
