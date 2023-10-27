import productModel from "../models/productModel.js";

//fetch all product
export const fetchAllProductController = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).send({
      success: true,
      message: "All Products",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in Getting all product",
    });
  }
};

//fetch single product
export const fetchSingleProductController = async (req, res) => {
  try {
    const product = await productModel.findOne({ _id: req.params.id });
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

// create product
export const createProductController = async (req, res) => {
  try {
    const { image, name, description, price, color } = req.body;
    const product = new productModel({
      image,
      name,
      description,
      price,
      color,
    });
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in Creating product",
    });
  }
};

//update product
export const updateProductController = async (req, res) => {
  try {
    const { image, name, description, price, color } = req.body;

    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      {
        image,
        name,
        description,
        price,
        color,
      },
      { new: true }
    );
    await product.save();
    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updating product",
    });
  }
};

//delete product
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in deleting product",
    });
  }
};
