import { useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [state, setState] = useState({
    longURL: "",
    shortURL: "",
  });

  function setLongURL(evt) {
    console.log(evt.target.value);
    setState({
      ...state,
      longURL: evt.target.value,
    });
  }

  function shortenURL() {
    if (!state.longURL) {
      return;
    }
    const data = {
      longUrl: state.longURL,
    };
    axios
      .post("http://localhost:5000/api/url/shorten", data)
      .then((res) => res.data)
      .then((data) => {
        setState({ ...state, shortURL: data.shortUrl });
      });
  }

  return (
    <div className="App">
      <header className="App-header">URL Shortener</header>
      <section className="url-details long-url-section">
        <input type="text" value={state.longURL} onChange={setLongURL} />
        <button onClick={shortenURL}>Shorten URL</button>
      </section>
      <section className="url-details short-url-section">
        {state.shortURL}
      </section>
    </div>
  );
}

export default App;
