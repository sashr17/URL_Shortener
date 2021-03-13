const express = require("express");
const router = express.Router();
const config = require("config");
const shortid = require("shortid");
const validUrl = require("valid-url");

const URL = require("../models/url");

// @route     POST /api/url/shorten
// @desc      Create short URL
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseURL = config.get("baseURL");

  // Check base url
  if (!validUrl.isUri(baseURL)) {
    return res.status(401).json("Invalid base url");
  }

  // Create url code
  const urlCode = shortid.generate();

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await URL.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseURL + "/" + urlCode;

        url = new URL({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).json("Invalid long url");
  }
});

module.exports = router;
