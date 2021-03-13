import { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
        <TextField
          className="long-url-text-field"
          label="URL"
          variant="outlined"
          placeholder="Enter or paste long URL"
          value={state.longURL}
          onChange={setLongURL}
        />
        <Button variant="contained" color="primary" onClick={shortenURL}>
          Shorten URL
        </Button>
      </section>
      {state.shortURL && (
        <section className="url-details short-url-section">
          <TextField
            className="short-url-text-field"
            label="Short URL"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={state.shortURL}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigator.clipboard.writeText(state.shortURL);
            }}
          >
            Copy URL
          </Button>
        </section>
      )}
    </div>
  );
}

export default App;
