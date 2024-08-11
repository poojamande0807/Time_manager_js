let reminders = [];
let reminderTimers = [];
document
  .getElementById("reminderForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const reminderText = document.getElementById("reminderText").value;
    const reminderTime = new Date(
      document.getElementById("reminderTime").value
    ).getTime();
    const reminderId = Date.now();
    const timeToTrigger = reminderTime - Date.now();
    if (timeToTrigger > 0) {
      const reminder = {
        id: reminderId,
        text: reminderText,
        time: reminderTime,
      };
      reminders.push(reminder);
      displayReminder(reminder);
      const timerId = setTimeout(() => {
        alert(`Reminder: ${reminderText}`);
        deleteReminder(reminderId);
      }, timeToTrigger);
      reminderTimers.push({ id: reminderId, timerId });
    } else {
      alert("Please select a future time for the reminder.");
    }
    document.getElementById("reminderForm").reset();
  });
function displayReminder(reminder) {
  const reminderList = document.getElementById("reminderList");
  const listItem = document.createElement("li");
  listItem.setAttribute("data-id", reminder.id);
  const reminderTimeFormatted = new Date(reminder.time).toLocaleString();
  listItem.innerHTML = `
        ${reminder.text} - ${reminderTimeFormatted}
        <button class="edit" onclick="editReminder(${reminder.id})">Edit</button>
        <button class="delete" onclick="deleteReminder(${reminder.id})">Delete</button
    `;
  reminderList.appendChild(listItem);
}
function editReminder(id) {
  const reminder = reminders.find((rem) => rem.id === id);
  document.getElementById("reminderText").value = reminder.text;
  document.getElementById("reminderTime").value = new Date(reminder.time)
    .toISOString()
    .slice(0, 16);
  deleteReminder(id);
}
function deleteReminder(id) {
  reminders = reminders.filter((rem) => rem.id !== id);
  reminderTimers = reminderTimers.filter((timer) => {
    if (timer.id === id) {
      clearTimeout(timer.timerId);
      return false;
    }
    return true;
  });
  const listItem = document.querySelector(`li[data-id="${id}"]`);
  if (listItem) {
    listItem.remove();
  }
}
