const cart = require("../models/cart");
const{
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");


const router = require("express").Router();

//CREATE

router.post("/", verifyToken ,async (req, res) => {
    const newCart = new cart(res.body);

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err);
    }
});


//UPDATE

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try{
        const updatedCart = await cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updatedCart);
    }catch(err){
        res.status(500).json(err);
    }
});


//DELETE

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try{
        await cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
});


//GET USER CART

router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try{
        const userCart = await cart.find({userId: req.params.userId});
        res.status(200).json(userCart);
    }catch(err){
        res.status(500).json(err);
    }
});


//Get ALL CART

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;