console.log("Hello!! This is Options page");
const nameInput = document.getElementById("name-input");
const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
  const name = nameInput.value;
  chrome.storage.sync.set(
    {
      name,
    },
    () => console.log("Hello!! Name is now set to ", name),
  );
});

chrome.storage.sync.get(["name"], (res) => {
  nameInput.value = res.name;
});
