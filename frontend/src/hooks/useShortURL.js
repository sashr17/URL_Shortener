import { useState } from "react";
import axios from "axios";

const initialState = {
  longURL: "",
  shortURL: "",
  isSpinner: false,
  isError: false,
};

export const useShortURL = () => {
  const [state, setState] = useState(initialState);

  const setLongURL = (evt) => {
    console.log(evt.target.value);
    setState({
      ...state,
      longURL: evt.target.value,
    });
  };

  const shortenURL = () => {
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
  };

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(state.shortURL);
  };

  return [
    state,
    {
      setLongURL,
      shortenURL,
      copyToClipBoard,
    },
  ];
};
