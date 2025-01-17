const router = require("express").Router();
const stripe = require("stripe")(process.env.SRTIPE_KEY);


router.post("/payment" ,(req,res)=> {
    stripe.charge.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
    },
    (stripeErr , stripeRes) => {
            if(stripeErr)  {res.status(500).json(stripeErr);}
            else  {res.status(200).json(stripeRes);}
           
        }
    );
});




module.exports = router;