import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [pointsList, setPointsList] = useState([{ name: "jo" }]);

  useEffect(() => {
    // request data from background
    chrome.runtime.sendMessage({ type: "GET_POINTS" });

    const queryInfo = { active: true, lastFocusedWindow: true };

    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const url = tabs[0].url;
        setUrl(url);
      });

    chrome.runtime.onMessage.addListener((res) => {
      if (res.msg === "POINTS_LIST") {
        console.log(res);
        setPointsList(res.data);
      }
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>URL:</p>
        <p>{url}</p>
        <h1>YOOO</h1>

        <ul>
          {pointsList.map((item) => {
            return <li key={item.name}>{item.name}</li>;
          })}
        </ul>
      </header>
    </div>
  );
}

export default App;
