const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 3000;
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
// Setup handlebars engine & views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")));
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Andrew mead",
    company: "Academind"
  });
});

// for about page
app.get("/about", (req, res) => {
  // not send, but render which allows us to render view templates
  res.render("about", {
    title: "About",
    name: "Hari",
    company: "Academind"
  });
});

// for about page
app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "To get help contact abc@gmail.com",
    title: "Help",
    name: "Hari",
    company: "Academind"
  });
});

app.get("/weather", (req, res) => {
  let address = req.query.address;
  console.log("Address received::", address);
  if (!address) {
    return res.send({ error: "Please provide address" });
  } else {
    geocode(address, (error, { lat, lng, location } = {}) => {
      if (error) {
        //return console.log(error);
        res.send({
          error: `There was an error while contacting the geocode server`
        });
      }
      forecast(lat, lng, (error, forecastData) => {
        if (error) {
          res.send({
            error: `There was an error while connecting with forecast server`
          });
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: address
        });
      });
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found"
  });
});
// should come last
app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page you are looking for, doesnt exist"
  });
});

app.listen(port, () => {
  console.log("Server is up in port " + port);
});
