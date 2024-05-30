const product = require('../models/BaseProduct');
const { authcheck } = require('../middlewares/auth');

// Create a new product
const createProduct = async (req, res) => {
    if (authcheck) {
        const { name, description, price, image, catogory, stock } = req.body;
        if (!name) {
            res.status(400).json({ error: 'Missing name' });
        }
        if (!price) {
            res.status(400).json({ error: 'Missing price' });
        }
        if (!catogory) {
            res.status(400).json({ error: 'Missing category' });
        }
        if (!stock) {
            res.status(400).json({ error: 'Missing stock' });
        }
        const product1 = await product.findOne({ email });
        if (product1) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const product = new product({ name, description, price, image, catogory, stock });
        await product.save();
        res.status(200).json({ 
            id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            catogory: product.catogory,
            stock: product.stock
        });
    }
    else (error) => {
        handlserrors(error);
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: handlserrors(error) });
    }
};

// Update product by ID
const updateProduct = async (req, res) => {
    if (authcheck) {
        const { id, email, newData } = req.body
        if (!newData) {
            return res.status(400).json({ error: 'product ID and new data are required' });
        }
        const product = await product.findOneAndUpdate({ _id: id }, email, newData, { new: true });
        if (!product) {
            return res.status(404).json({ error: 'product not found' });
        }
        return product;
    }
};

// Delete product by ID
const deleteProduct = async (req, res) => {
    if (authcheck) {
        const { _id } = req.body
        if (!_id) {
            return res.status(400).json({ error: 'product ID is required' });
        }
        const delproduct = await product.findOne({ _id });
        if (!delproduct) {
            return res.status(400).json({ error: 'product not found' });
        };
        if (delproduct) {
            await product.deleteOne(delproduct);
            res.status(201).send({ message: 'product successfully deleted' })
        };
    };
};

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
};
