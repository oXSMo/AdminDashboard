import User from "../models/user.module.js";
import Order from "../models/order.module.js";
import Item from "../models/item.module.js";

export const adminDashboard = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const orders = await Order.countDocuments();
    const items = await Item.countDocuments();
    const totalPrice = await Order.aggregate([
      {
        $group: {
          _id: null, // Grouping by null means you get the sum for all orders
          totalPrice: { $sum: "$totalPrice" }, // Sum the "price" field from each order
        },
      },
    ]);

    res
      .status(202)
      .json({ users, orders, items, price: totalPrice[0].totalPrice });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const TotalEachDay = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } }, // Group by day
          totalPrice: { $sum: { $toDouble: "$totalPrice" } }, // Sum prices for each day
        },
      },
      {
        $sort: { _id: 1 }, // Sort by date ascending
      },
    ]);

    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 30);

    const last7Days = orders.filter((order) => {
      const date = new Date(order._id);
      return date >= sevenDaysAgo;
    });

    res.status(202).json(last7Days);
  } catch (error) {
    res.status(401).json(error);
  }
};

export const itemsTable = async (req, res) => {
  try {
    let itemIds = await Item.find().select("_id");
    itemIds = itemIds.map((e) => e._id);

    const stats = await Item.aggregate([
      // Filter to your list of items
      {
        $match: {
          _id: { $in: itemIds.map((id) => id) },
        },
      },
      // Left-join with orders for these items
      {
        $lookup: {
          from: "categories", // Name of the Category collection
          localField: "category", // Field in Item that references Category
          foreignField: "_id", // _id in the Category collection
          as: "category",
        },
      },

      {
        $lookup: {
          from: "orders", // Name of the Order collection
          localField: "_id",
          foreignField: "item",
          as: "orders",
        },
      },

      // Calculate count and total
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          count: { $size: "$orders" }, // Number of orders
          total: {
            $reduce: {
              input: "$orders",
              initialValue: 0,
              in: {
                $add: [
                  "$$value",
                  { $ifNull: ["$$this.totalPrice", 0] }, // Treat missing as 0
                ],
              }, // Sum totalPrice
            },
          },
          "category.name": 1,
          "category.image": 1,
        },
      },
    ]);

    res.status(202).json(stats);
  } catch (error) {
    res.status(401).json(error);
  }
};

export const countUsers = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $facet: {
          all: [{ $count: "total" }],
          normal: [{ $match: { role: "normal" } }, { $count: "total" }],
          super: [{ $match: { role: "super" } }, { $count: "total" }],
          admin: [{ $match: { role: "admin" } }, { $count: "total" }],
        },
      },
    ]);

    const latest = await User.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select("username");

    let ttl = {};
    Object.keys(users[0]).map((key, i) => {
      ttl[key] = Object.values(users[0])[i][0].total;
    });

    res.status(202).json({ ...ttl, latest: latest?.map((l) => l.username) });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const countOrders = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $facet: {
          all: [{ $count: "total" }],
          shipped: [
            { $match: { status: { $in: ["delivered", "shipped"] } } },
            { $count: "total" },
          ],
          cancelled: [{ $match: { status: "cancelled" } }, { $count: "total" }],
          pending: [
            {
              $match: {
                status: { $nin: ["delivered", "shipped", "cancelled"] },
              },
            },
            { $count: "total" },
          ],
        },
      },

      {
        $project: {
          all: { $ifNull: [{ $arrayElemAt: ["$all.total", 0] }, 0] },
          shipped: { $ifNull: [{ $arrayElemAt: ["$shipped.total", 0] }, 0] },
          cancelled: {
            $ifNull: [{ $arrayElemAt: ["$cancelled.total", 0] }, 0],
          },
          pending: { $ifNull: [{ $arrayElemAt: ["$pending.total", 0] }, 0] },
        },
      },
    ]);

    const latest = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(2)
      .select("createdAt item user")
      .populate([
        { path: "item", select: "name" },
        { path: "user", select: "username -_id" },
      ]);

    // let ttl = {};
    // Object.keys(orders[0]).map((key, i) => {
    //   ttl[key] = Object.values(orders[0])[i][0].total;
    // });

    res.status(202).json({ ...orders[0], latest });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const usersDetails = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $facet: {
          // Last 3 users (sorted by creation date)
          last: [
            { $sort: { createdAt: -1 } }, // Sort by newest first
            { $limit: 3 },
            { $project: { username: 1, _id: 1 } },
          ],
          lastSuper: [
            { $match: { role: "super" } },
            { $sort: { createdAt: -1 } }, // Sort by newest first
            { $limit: 3 },
            { $project: { username: 1, _id: 1 } },
          ],
          // Last 3 users with orders (assuming orders are in a separate collection)
          lastNoOrdered: [
            {
              $lookup: {
                from: "orders", // Join with the orders collection
                localField: "_id",
                foreignField: "user", // Field in orders referencing the user
                as: "orders",
              },
            },
            { $match: { orders: { $eq: [] } } }, // Filter users with at least 1 order
            { $sort: { createdAt: -1 } },
            { $limit: 3 },
            { $project: { username: 1, _id: 1 } }, // Exclude orders array from final output
          ],
          // Last 3 unverified users
          lastUnverified: [
            { $match: { isVerified: false } }, // Filter unverified users
            { $sort: { createdAt: -1 } },
            { $limit: 3 },
            { $project: { username: 1, _id: 1 } },
          ],
        },
      },
    ]);

    const count = await User.aggregate([
      {
        $facet: {
          all: [{ $count: "total" }],
          noOrder: [
            {
              $lookup: {
                from: "orders", // Join with the orders collection
                localField: "_id",
                foreignField: "user", // Field in orders referencing the user
                as: "orders",
              },
            },
            { $match: { orders: { $eq: [] } } },
            { $count: "total" },
          ],
          super: [{ $match: { role: "super" } }, { $count: "total" }],
          unVerified: [{ $match: { isVerified: false } }, { $count: "total" }],
        },
      },
    ]);

    let ttl = {};
    Object.keys(count[0]).map((key, i) => {
      ttl[key] = Object.values(count[0])[i][0].total;
    });

    res.status(202).json({ ...users[0], ...ttl });
  } catch (error) {
    res.status(401).json(error);
  }
};
