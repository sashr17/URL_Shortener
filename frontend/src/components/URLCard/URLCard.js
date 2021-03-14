import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./URLCard.css";

const URLCard = (props) => {
  const {
    inputChangeHandler,
    buttonClickHandler,
    configs: { url, key = "", inputLabel = "URL", buttonLabel, isReadOnly },
  } = props;

  return (
    <section className="URLCard">
      <TextField
        className={`url-text-field ${key}`}
        label={inputLabel}
        variant="outlined"
        placeholder="Enter or paste URL"
        value={url}
        onChange={inputChangeHandler}
        InputProps={{
          readOnly: isReadOnly,
        }}
      />
      <Button
        className="cta-btn"
        variant="contained"
        color="primary"
        onClick={buttonClickHandler}
      >
        {buttonLabel}
      </Button>
    </section>
  );
};

export default URLCard;
