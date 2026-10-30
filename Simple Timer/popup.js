const time = document.getElementById("time");
const currentTime = new Date().toLocaleTimeString();
const nameElement = document.getElementById("name");
time.textContent = `The current time is: ${currentTime}`;

chrome.action.setBadgeText(
  {
    text: "TIME",
  },
  () => {
    console.log("Hi . We just set badge text.");
  },
);
chrome.storage.sync.get(["name"], (res) => {
  nameElement.textContent = `Welcome!! ${res.name}`;
});
