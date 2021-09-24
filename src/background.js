chrome.runtime.onInstalled.addListener(() => {
  console.log("onInstalled...");
  // create alarm after extension is installed / upgraded
  chrome.alarms.create("refresh", { periodInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  console.log(alarm.name); // refresh
});

chrome.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case "GET_POINTS":
      console.log("B", "getPoints");
      fetchPointValues();
      break;
    default:
      break;
  }
});

function fetchPointValues() {
  fetch(`https://swapi.dev/api/people/?search=luke`)
    .then((res) => res.json())
    .then((data) => {
      chrome.runtime.sendMessage({
        msg: "POINTS_LIST",
        data: data.results,
      });
    });
}
