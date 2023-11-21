import Product from "../models/product_model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const productFound = await Product.findById(id);
    if (!productFound) {
      return res.status(400).json({ message: "Product not found" });
    }
    res.json({
      productFound,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductsByName = async (req, res) => {
  const { name } = req.params;
  try {
    const productsFound = await Product.find({ name: { $regex: name } });
    if (!productsFound) {
      return res.status(400).json({ message: "Product not found" });
    }
    res.json({
      productsFound,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productFound = await Product.findByIdAndDelete(id);
    if (!productFound) {
      return res.status(400).json({ message: "Product not found" });
    }
    res.json({
      message: "Product deleted successfully",
      id: productFound._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, category, image } = req.body;
  try {
    const productUpdated = await Product.findByIdAndUpdate(
      id,
      { name, price, category, image },
      { new: true }
    );
    if (!productUpdated) {
      return res.status(400).json({ message: "Product not found" });
    }
    res.json({
      message: "Product updated successfully",
      productUpdated,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, category, image } = req.body;
  try {
    const newProduct = new Product({
      name,
      price,
      category,
      image,
    });
    const productSaved = await newProduct.save();
    res.json({
      message: "Product saved successfully",
      productSaved,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
