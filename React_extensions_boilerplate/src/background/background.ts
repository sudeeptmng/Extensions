chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log(msg)
  console.log(sender)
  sendResponse("from background scipt")
})
