const time = document.getElementById("time");
const currentTime = new Date().toLocaleTimeString();
const nameElement = document.getElementById("name");
const timerElement = document.getElementById("timer");
time.textContent = `The current time is: ${currentTime}`;

chrome.storage.local.get(["timer"], (res) => {
  const time = res.timer ?? 0;
  timerElement.textContent = `The timer is at ${time} seconds`;
});
chrome.storage.sync.get(["name"], (res) => {
  const name = res.name ?? "User";
  nameElement.textContent = `Welcome!! ${name}`;
});
