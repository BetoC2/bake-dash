import Sale from "../models/sale_model.js";

// GET ALL
export const getAllSales = async (req, res) => {
    try {
        const sales = await Sale.find();
        res.json({
            sales,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//GET BY ID
export const getSaleById = async (req, res) => {
    const { id } = req.params;
    try {
        const aleFound = await Sale.findById(id);
        if (!saleFound) {
            return res.status(400).json({ message: "Sale not found" });
        }
        res.json([]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//DELETE
export const deleteSale = async (req, res) => {
    const { id } = req.params;
    try {
      const saleFound = await Sale.findByIdAndDelete(id);
      if (!saleFound) {
        return res.status(400).json({ message: "Sale not found" });
      }
      res.json({
        message: "Sale deleted successfully",
        id: saleFound._id,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

//UPDATE SALE
export const updateSale = async (req, res) => {
    const { id } = req.params;
    const { products, vendor, paymentMethod, advance, extraCost, comments, subtotal, total } = req.body;
    try {
      const saleUpdated = await Sale.findByIdAndUpdate(
        id,
        { products, vendor, paymentMethod, advance, extraCost, comments, subtotal, total },
        { new: true }
      );
      if (!saleUpdated) {
        return res.status(400).json({ message: "Sale not found" });
      }
      res.json({
        message: "Sale updated successfully",
        productUpdated,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

//CREATE SALE
export const createSale = async (req, res) => {
    const { products, vendor, paymentMethod, advance, extraCost, comments, subtotal, total  } = req.body;
    try {
      const newSale = new Sale({
        products, vendor, paymentMethod, advance, extraCost, comments, subtotal, total
      });
      const saleSaved = await newSale.save();
      res.json({
        message: "Sale saved successfully",
        saleSaved,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
