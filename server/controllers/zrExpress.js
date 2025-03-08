import Order from "../models/order.module.js";
import axios from "axios";
import { generateRandomString } from "../utils/functions.js";
import { Mailer } from "../utils/Emailer.pipe.js";
import { contactHTML, SendPassword } from "../utils/html.js";

//////!  CREATE COIL  !//////

export const addCoil = async ({ body, params }, res) => {

  try {
    const resp = await axios.post(
      `https://procolis.com/api_v1/add_colis`,
      {
        Colis: [body],
      },
      {
        headers: {
          token: process.env.TOKEN,
          key: process.env.KEY,
        },
      }
    );

    if (params._id) {
      var order = await Order.findByIdAndUpdate(
        params._id,
        {
          Tracking: resp.data.Colis[0].Tracking,
          TRK: generateRandomString(9),
        },
        { new: true }
      );
    }
    res.header("Access-Control-Allow-Origin", "*");

    res.status(202).json(order || resp.data.Colis[0]);
  } catch (error) {
    res.status(401).json(error);
  }
};

//////!  READT ONE COIL  !//////

export const readCoil = async ({ params }, res) => {
  console.log(params);

  try {
    const resp = await axios.post(
      "https://procolis.com/api_v1/lire",
      {
        Colis: [
          {
            Tracking: params.Tracking,
          },
        ],
      },
      {
        headers: {
          token: process.env.TOKEN,
          key: process.env.KEY,
        },
      }
    );
    res.status(202).json(resp.data.Colis[0]);
  } catch (error) {
    res.status(401).json(error);
  }
};

//////!  SEND MANY COILS  !//////

export const sendCoils = async ({ body }, res) => {
  try {
    const orders = await Order.find({ _id: { $in: body } })
      .select("totalPrice TRK Tracking node user item")
      .populate([
        {
          path: "user",
          select: "firstName state city streetAddress1 phoneNumber",
        },
        { path: "item", select: "name" },
      ]);

    const coils = {
      Colis: orders.map((c) => ({
        Client: c?.user?.firstName,
        MobileA: c?.user?.phoneNumber,
        Adresse: c?.user?.streetAddress1,
        Commune: c?.user?.city,
        Note: "Fragil",
        Total: c?.totalPrice,
        TProduit: c?.item?.name,
        Confrimee: "",
        TypeColis: "0",
        TypeLivraison: "0",
        IDWilaya: c?.user?.state,
        Tracking: c?.TRK,
      })),
    };

    const resp = await axios.post(
      `https://procolis.com/api_v1/add_colis`,
      coils,
      {
        headers: {
          token: process.env.TOKEN,
          key: process.env.KEY,
        },
      }
    );

    const bulk = resp.data.Colis.map((O) => ({
      updateOne: {
        filter: {
          TRK: O.Tracking,
        }, // The query to find the document
        update: {
          $set: {
            shipping: true,
            TRK: generateRandomString(9),
            Tracking: O.Tracking,
          },
        }, // The update to apply
        usert: true,
      },
    }));

    await Order.bulkWrite(bulk);

    res.status(202).json(resp.data);
  } catch (error) {
    res.status(401).json(error);
  }
};

//////!  CONTACT  !//////

export const contact = async ({ body }, res) => {
  try {
    console.log();

    Mailer({
      email: "fixiiit04@gmail.com",
      text: contactHTML({
        logoURL: "https://i.ibb.co/6RRD03j5/qsdqsd.png",
        supportEmail: "fixiiit04@gmail.com",
        username: body?.username,
        OTP: Object.keys(body).map(
          (key, i) => `<p>${key}: ${Object.values(body)[i]}</p>`
        ),
      }),
    });

    res.status(202).json("qsd");
  } catch (error) {
    res.status(401).json(error);
  }
};
