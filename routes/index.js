var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Ad = require('../models/Ad');
var needlogin = require('../extras/login');

router.get("/", async (req, res) => {
    const myadd = await Ad.find({})
    if (!myadd) res.render("error", {
      message: "Currenty there are no Advertisements",
    });
    res.render('index', {
      ads: myadd
    });
  })


router.get("/addNew", (req, res) => {
  res.render("add")
});

router.get("/home", (req, res) => {
  res.render("home")
})


router.get("/viewAd/:id", async (req, res) => {
  const myadd = await Ad.findById(req.params.id);
    if (!myadd) {
      res.render("error", {
        message: "Error advertisement is removed"
      })
    }
    res.render("view", {
      ads: myadd
    })  
});

router.post("/addAd", needlogin, async (req, res) => {
  const { Title, Description, Price } = req.body;

  const myadd = new Ad({ Title, Description, Price });
  try {
    await myadd.save();
    res.redirect("/");
  } catch (err) {
    res.render("error", {
      message: "Exception in add",
    });
  }
});


router.get("/editAd/:id", needlogin, async (req, res) => {
  const myadd = await Ad.findById(req.params.id);

  try {
    if (!myadd) {
      res.render("error", {
        message: "Not Found"
      })
    }
    res.render("edit", {
      ads: myadd
    })
  } catch (err) {
    res.render("error", {
      message: "Exception in edit"
    })
  }
});


router.post('/updateAd/:id', needlogin, async (req, res) => {
  try {
    const myadd = await Ad.findByIdAndUpdate(req.params.id, req.body)
    await myadd.save()
    res.redirect("/");
  } catch (err) {
    res.render("error", {
      message: "Exception in update",
    });
  }
});

router.post("/deleteAd/:id", needlogin, async (req, res) => {
  try {
    const myadd = await Ad.findByIdAndDelete(req.params.id)
    if (!myadd) res.render("error", {
      message: "There is no such advertisement to delete",
    });
    res.redirect("/");
  } catch (err) {
    res.render("error", {
      message: "Exception in delete",
    });
  }
})

router.get("/AdsJSON", async (req, res) => {
  try {
    const myadd = await Ad.find({});
    if (!myadd)
      res.render("error",{
        message: "No Ads"
      });
    res.send({
      myadd
    });
  } catch (err) {
    res.render({
      ad: "Exception in Json"
    });
  }
});


module.exports = router;
