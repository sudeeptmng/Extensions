console.log("Hello!! This is Options page");
const name = document.getElementById("name");
const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
  console.log("Welcome", name.value);
});
