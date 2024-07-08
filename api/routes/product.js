const Product = require("../models/product");
const{
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin ,async (req, res) => {
    const newProduct = new Product(req, res);

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
});

//UPDATE PRODUCT
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
        try{
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {new : true},
            );
            res.status(200).json(updatedProduct); 
        }
        catch(err){
            res.status(500).json(err);
        }
});

//DELETE PRODUCT

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("product has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
});

//GET ALL PRODUCTS

router.get("/", async (req, res) => {
    const qNEW = req.query.new;
    const qCategorie = req.query.categorie;
    try{

        let products ;
        if(qNew){
            products = await Product.find().sort({_id : -1}).limit(5);
        }else if(qCategorie){
            products = await Product.find({
                categories: {
                    $in : [qCategorie],
                }
                });
        }else {
            products = await Product.find();
        }
        res.status(200).json(products);
    }catch (err){
        res.status(500).json(err);
    }   

});

module.exports = router;