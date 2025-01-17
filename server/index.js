require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const {
  getEthnicities,
  getEducationLevels,
  getFemalesPercent,
  getUniversityCount,
  getCountryCount,
  getStateCount,
} = require("./stats");
const data = require("./data.json");

const app = express();

if (process.env.NODE_ENV === `production`) {
  app.use((req, res, next) => {
    if (req.header(`x-forwarded-proto`) !== `https`)
      res.redirect(`https://${req.header(`host`)}${req.url}`);
    else next();
  });
}

app.use(cors());
app.use(express.static(path.join(__dirname, `../build`)));

app.get(`/stats`, async (req, res) => {
  try {
    const registrants = data;
    const stats = {
      count: registrants.length,
      ethnicities: getEthnicities(registrants),
      educationLevels: getEducationLevels(registrants),
      femalesPercent: getFemalesPercent(registrants),
      universityCount: getUniversityCount(registrants),
      countryCount: getCountryCount(registrants),
      stateCount: await getStateCount(registrants),
    };

    res.json({ stats });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error: ${err.message}`);
  }
});

const env = process.env.NODE_ENV;
const port = env === `development` ? 2000 : process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}`));
