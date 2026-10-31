console.log("Hello!! This is Options page");
const nameInput = document.getElementById("name-input");
const submit = document.getElementById("submit");
const timeInput = document.getElementById("time-input");

submit.addEventListener("click", () => {
  const name = nameInput.value;
  const notificationTime = timeInput.value;
  chrome.storage.sync.set(
    {
      name,
      notificationTime,
    },
    () => console.log("Hello!! Name is now set to ", name),
  );
});

chrome.storage.sync.get(["name", "notificationTime"], (res) => {
  nameInput.value = res.name ?? "User";
  timeInput.value = res.notificationTime ?? 3600;
});
