import URLCard from "./components/URLCard/URLCard";
import { useShortURL } from "./hooks";

import "./App.css";

function App() {
  const [state, fn] = useShortURL();

  return (
    <div className="App">
      <header className="App-header">URL Shortener</header>

      <URLCard
        inputChangeHandler={fn.setLongURL}
        buttonClickHandler={fn.shortenURL}
        configs={{
          url: state.longURL,
          key: "long-url",
          inputLabel: "URL",
          buttonLabel: "Shorten URL",
          isReadOnly: false,
        }}
      />

      {state.shortURL && (
        <URLCard
          inputChangeHandler={null}
          buttonClickHandler={fn.copyToClipBoard}
          configs={{
            url: state.shortURL,
            key: "short-url",
            inputLabel: "Short URL",
            buttonLabel: "Copy URL",
            isReadOnly: true,
          }}
        />
      )}
    </div>
  );
}

export default App;
