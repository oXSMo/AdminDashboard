import Category from "../models/category.module.js";
import axios from "axios";
import Order from "../models/order.module.js";
import Item from "../models/item.module.js";
import Option from "../models/options.module.js";

//////////!   CREATE CATEGORY   !//////////

export const createCategory = async (req, res) => {
  if (!req.body.name) return res.status(404).json("category name missing");
  if (!req.body.image) return res.status(404).json("category image missing");

  try {
    const category = await Category.create(req.body);

    res.status(201).json(category);
  } catch (error) {
    if (error.errorResponse.code === 11000)
      return res.status(406).json("category name already exist");
    res.status(401).json(error);
  }
};

//////////!   GET CATEGORY   !//////////

export const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params._id);
    res.status(202).json(category);
  } catch (error) {
    res.status(401).json(error);
  }
};

//////////!   GET CATEGORIES   !//////////

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().select("image name description");
    res.status(202).json(categories);
  } catch (error) {
    res.status(401).json(error);
  }
};

//////////!   UPDATE CATEGORY   !//////////

export const updateCategory = async (req, res) => {
  if (!req.body.name) return res.status(404).json("category name missing");
  if (!req.body.image) return res.status(404).json("category image missing");
  if (!req.params._id) return res.status(404).json("category id missing");

  try {
    const category = await Category.findByIdAndUpdate(
      req.params._id,
      { ...req.body },
      { new: true }
    );
    res.status(202).json(category);
  } catch (error) {
    res.status(401).json(error);
  }
};

//////////!   DELETE CATEGORY   !//////////

export const deleteCategory = async (req, res) => {
  if (!req.params._id) return res.status(404).json("category id missing");

  try {
    await Category.findByIdAndDelete(req.params._id);
    await Item.deleteMany({ category: req.params._id });
    return res
      .status(202)
      .json({ message: "category deleted", id: req.params._id });
  } catch (error) {
    res.status(402).json(error);
  }
};

//////////!   CATEGORY INFOS  !//////////

export const categoryInfo = async ({ params }, res) => {
  try {
    const items = await Item.find({ category: params._id }).select("_id");

    const orders = await order?.countDocuments({
      item: { $in: items.map((i) => i._id) },
    });
    const pending = await order?.countDocuments({
      item: { $in: items.map((i) => i._id) },
      status: { $in: ["processing", "pending"] },
    });

    const options = await Option.find({
      item: { $in: items.map((i) => i._id) },
    })
      .select("price")
      .sort({ price: 1 })
      .limit(1);

    res.json({ pending, orders, price: options[0]?.price || "N/A" });
  } catch (error) {
    res.status(401).json(error);
  }
};
