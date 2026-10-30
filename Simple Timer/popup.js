const time = document.getElementById("time");
const currentTime = new Date().toLocaleTimeString();
time.textContent = `The current time is: ${currentTime}`;

chrome.action.setBadgeText(
  {
    text: "TIME",
  },
  () => {
    console.log("Hi . We just set badge text.");
  },
);
