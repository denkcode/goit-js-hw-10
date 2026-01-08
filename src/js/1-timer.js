


import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// Імпорт скрипта бібліотеки
import iziToast from "izitoast";
// Додатковий імпорт CSS, щоб стилі працювали
import "izitoast/dist/css/iziToast.min.css";

// Змінні для вибраної дати та інтервалу таймера
let userSelectedDate = null;
let timerId = null;

// Елементи DOM
const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");

const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

// Налаштування flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const pickedDate = selectedDates[0];

    if (pickedDate <= new Date()) {
      // Показуємо попередження через iziToast
      iziToast.warning({
        title: 'Помилка',
        message: 'Please choose a date in the future',
        position: 'topRight',
        timeout: 3000,
      });

      startBtn.disabled = true;
      userSelectedDate = null;
      return;
    }

    userSelectedDate = pickedDate;
    startBtn.disabled = false;
    console.log("Selected date:", userSelectedDate);
  }
};

// Ініціалізація flatpickr
flatpickr("#datetime-picker", options);

// Функція для конвертації мілісекунд у дні, години, хвилини, секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Додаємо ведучий нуль
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Функція оновлення таймера на екрані
function updateTimer() {
  const now = new Date();
  const deltaMs = userSelectedDate - now;

  if (deltaMs <= 0) {
    clearInterval(timerId);
    input.disabled = false;
    startBtn.disabled = false;
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const time = convertMs(deltaMs);
  daysEl.textContent = addLeadingZero(time.days);
  hoursEl.textContent = addLeadingZero(time.hours);
  minutesEl.textContent = addLeadingZero(time.minutes);
  secondsEl.textContent = addLeadingZero(time.seconds);
}

// Обробник кнопки старту
startBtn.addEventListener("click", () => {
  if (!userSelectedDate) return;

  startBtn.disabled = true;
  input.disabled = true;

  updateTimer(); // одразу оновлюємо дисплей
  timerId = setInterval(updateTimer, 1000); // запускаємо інтервал
});
