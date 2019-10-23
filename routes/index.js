const express = require('express'),
 router = express.Router(), 
 BuyerModel = require('../models/buyerModel'); 

router.get('/', async function(req, res, next) {
    const buyerData = await BuyerModel.getAll(); 
    // console.log("buyer data", buyerData); 

  res.render('template', { 
    locals: {
      title:"",
      data: buyerData,
      isLoggedIn: req.session.is_logged_in,
      userName: req.session.first_name
    },
    partials: {
      partial: "partial-index"
    }
  });
});

router.get('/:buyer_id', async function(req, res, next) {
  const { buyer_id } = req.params; 
  const theBuyer = await BuyerModel.getById(buyer_id); 
  // console.log("the buyer data is: ", theBuyer); 

  res.render("template", {
    locals: { 
      title: "This is one buyer",
      buyerData: theBuyer,
      isLoggedIn: req.session.is_logged_in,
      userName: req.session.first_name
    },
    partials: {
      partial: "partial-single-buyer"
    }
  }) 
  });

module.exports = router; 