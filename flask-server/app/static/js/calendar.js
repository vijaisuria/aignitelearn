// Get the elements for the calendar month and the grid
const calendarMonth = document.getElementById("calendarMonth");
const calendarGrid = document.querySelector(".calendar-grid");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

// Current Date and Month Data
let currentDate = new Date();
let currentMonth = currentDate.getMonth(); // 0 = January, 11 = December
let currentYear = currentDate.getFullYear();

// Function to render the calendar
function renderCalendar(month, year) {
  // Set the calendar month and year in the header
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  calendarMonth.textContent = `${monthNames[month]} ${year}`;

  // Clear the previous grid
  calendarGrid.innerHTML = `
        <div class="calendar-day">S</div>
        <div class="calendar-day">M</div>
        <div class="calendar-day">T</div>
        <div class="calendar-day">W</div>
        <div class="calendar-day">T</div>
        <div class="calendar-day">F</div>
        <div class="calendar-day">S</div>
    `;

  // Get the first day of the month and the number of days in the month
  const firstDay = new Date(year, month).getDay(); // Day of the week for the 1st day of the month (0 = Sunday)
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total number of days in the month

  // Insert empty days before the 1st day of the month
  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.classList.add("calendar-date");
    calendarGrid.appendChild(emptyDay);
  }

  // Insert the actual days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("calendar-date");
    dayElement.textContent = day;
    calendarGrid.appendChild(dayElement);
  }
}

// Event Listeners for navigating between months
prevMonthBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

// Initial render of the current month
renderCalendar(currentMonth, currentYear);
