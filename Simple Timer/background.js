chrome.alarms.create({
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(["timer", "isRunning", "lastResetDate"], (res) => {
    const today = new Date().toDateString();
    const time = res.timer ?? 0;
    const isRunning = res.isRunning ?? true;

    if (res.lastResetDate !== today) {
      chrome.storage.local.set({
        timer: 0,
        lastResetDate: today,
      });
      chrome.action.setBadgeText({
        text: "0",
      });
      return;
    }
    if (!isRunning) {
      return;
    }
    chrome.storage.local.set({
      timer: time + 1,
    });
    chrome.action.setBadgeText({
      text: `${time + 1}`,
    });

    chrome.storage.sync.get(["notificationTime"], (res) => {
      const notificationTime = res.notificationTime ?? 3600;
      if (time == 0) {
        return;
      }
      if (time % notificationTime == 0) {
        this.registration.showNotification("Chrome Timer Notification", {
          body: `${notificationTime} seconds has passed`,
          icon: "icon.png",
        });
      }
    });
  });
});
