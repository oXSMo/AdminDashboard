import mongoose from "mongoose";
import Order from "../models/order.module.js";

//////////!   CREATE ORDER   !//////////

export const createOrder = async ({ body: b, user }, res) => {
  if (!b?.item) return res.status(404).json("item is missing");

  try {
    const order = await Order.create({ ...b, user: user._id });
    res.status(201).json(order);
  } catch (error) {
    res.status(401).json(error);
  }
};

//////////!   GET ORDER   !//////////

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params._id).populate([
      {
        path: "options",
        select: "name",
      },
      {
        path: "item",
        select: "name category",
        populate: { path: "category", select: "name" },
      },
    ]);
    res.status(202).json(order);
  } catch (error) {
    res.status(401).json();
  }
};

//////////!   GET ALL ORDERS   !//////////

export const getAllOrders = async ({ query }, res) => {
  let args = {};
  if (query?.status) args.status = query.status;
  if (query?.totalPrice) args.totalPrice = { $gt: Number(query.totalPrice) };
  if (query?.item) args.item = query.item;

  if (isValidId(query?.search))
    args.$or = [{ user: query.search }, { _id: query.search }];
  else if (query?.search)
    args.$or = [{ status: { $regex: query.search, $options: "i" } }];

  console.log({ args });

  let sort = {};
  if (query.sort) sort = { ...sort, [query.sort]: -1 };
  try {
    const totalCount = await Order.countDocuments(args);
    const orders = await Order.find(args)
      .sort({
        [query?.sort || "createdAt"]: -1,
      })
      .limit(query?.limit || 10)
      .skip((query?.page - 1) * query?.limit)
      .select("-__v")
      .populate([
        {
          path: "item",
          select: " name category",
          populate: { path: "category", select: "name image" },
        },
        { path: "user", select: "email username" },
      ]);

    res.status(202).json({
      orders,
      total: totalCount,
      pages: {
        current: Number(query?.page) || 1,
        total: Math.ceil(totalCount / query?.limit) || 1,
      },
    });
  } catch (error) {
    res.status(401).json(error);
  }
};

//////////!   GET MY ORDERS   !//////////

export const getMyOrders = async ({ query, user }, res) => {
  try {
    const orders = await Order.find({ user: user._id })
      .populate([
        {
          path: "item",
          select: "name category",
          populate: { path: "category", select: "name" },
        },
        { path: "options", select: "name" },
      ])
      .limit(query?.limit || 10)
      .skip((query?.page - 1) * query?.limit)
      .select("-__v   ");
    res.status(202).json(orders);
  } catch (error) {
    res.status(401).json(error);
  }
};

//////////!   UPDATE ORDER   !//////////

export const updateOrder = async ({ body, params }, res) => {
  try {
    const valid = await Order.findById(params._id);
    if (!valid) return res.status(404).json("order not found");

    const order = await Order.findByIdAndUpdate(params._id, body, {
      new: true,
    });
    res.status(202).json(order);
  } catch (error) {
    res.status(401).json(error);
  }
};

//////////!   DELETE ORDER   !//////////

export const deleteOrder = async ({ params }, res) => {
  try {
    await Order.findByIdAndDelete(params._id);
    res.status(202).json(`order with id ${params._id} deleted successfuly`);
  } catch (error) {
    res.status(401).json(error);
  }
};

export const deleteMyOrder = async (req, res) => {
  try {
    await Order.findOneAndDelete({ user: req.user._id, _id: req.params._id });
    res.status(202).json(`your order deleted successfuly`);
  } catch (error) {
    res.status(401).json(error);
  }
};

const isValidId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

//////////!   LAST WEEK    !//////////

export const lastWeekOrders = async (req, res) => {
  try {
    const lastWeekStart = new Date();
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);

    const orders = await Order.find({
      updatedAt: {
        $gte: lastWeekStart,
      },
    })
      .limit(6)
      .select("-options -node -image -__v")
      .populate([
        { path: "user", select: "username" },
        { path: "item", select: "name" },
        { path: "options", select: "name" },
      ]);

    res.status(202).json(orders);
  } catch (error) {
    res.status(402).json(error);
  }
};

//////////!   CREATE ORDER FOR USER   !//////////

export const createOrderUser = async({body},res) => {
  try {
    if (!body?.item) return res.status(404).json("item is missing");
    if (!body?.user) return res.status(404).json("user is missing");
    const order = await Order.create(body)

    res.status(201).json(order)
  } catch (error) {
    res.status(401).json(error)
  }
}

