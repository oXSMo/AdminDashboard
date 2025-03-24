import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUploadImg } from "../Utils/Hooks";
import { useNavigate } from "react-router-dom";
import { shipSlice } from "../Store/dashboard";
import { useGetOneUser } from "./useUser";

//////!   CREATE NEW ORDER   !//////

export const useCreateOrder = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);
  const { upload, image } = useUploadImg();
  const navigate = useNavigate();

  const create = async (credentials) => {
    try {
      setloading(true);
      if (credentials.img) await upload(credentials.img);
      await axios.post("/api/order/orderUser", {
        ...credentials,
        image,
      });
      toast.success("Order Created Successfuly");
      seterr(false);
      navigate("/orders");
    } catch (error) {
      seterr(true);
      toast.error("Somthing Went Wrong");
    } finally {
      setloading(false);
    }
  };

  return { create, loading, err };
};

//////!   GET ALL ORDERS   !//////

export const useGetAllOrders = ({ filter }) => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);
  const [orders, setorders] = useState([]);

  const getAll = async () => {
    let args = [
      `page=${filter.page}`,
      `limit=${filter.limit}`,
      `sort=${filter?.sort}`,
    ];
    if (filter.search) args.push(`search=${filter.search}`);
    if (filter.item) args.push(`item=${filter.item}`);

    try {
      setloading(true);
      const resp = await axios.get(`/api/order?${args.join("&")}`);
      setorders(resp.data);
    } catch (error) {
      seterr(true);
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getAll();
  }, [filter]);

  return { orders, getAll, loading, err };
};

//////!   UPDATE ORDER   !//////

export const useUpdateOrder = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);
  const { upload, image } = useUploadImg();
  const Update = async (_id, credentials) => {
    try {
      if (credentials?.img) await upload(credentials?.img);
      console.log(credentials?.img);

      setloading(true);
      await axios.put(`/api/order/${_id}`, { ...credentials, image });
      toast.success("order updated successfuly");
    } catch (error) {
      seterr(true);
      console.log(error);
      toast.error("somthing went wrong");
    } finally {
      setloading(false);
    }
  };

  return { loading, err, Update };
};

//////!   DELETE ORDER   !//////

export const useDeleteOrderById = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);

  const Delete = async (_id) => {
    try {
      setloading(true);
      await axios.delete(`/api/order/${_id}`);
      toast.success("Order deleted successfuly");
    } catch (error) {
      seterr(true);
      console.log(error);
      toast.error("somthing went wrong");
    } finally {
      setloading(false);
    }
  };

  return { loading, err, Delete };
};

//////!   GET ORDER   !//////

export const useGetOrder = (_id) => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);
  const [order, setorder] = useState();

  const getOrder = async () => {
    try {
      setloading(true);
      const resp = await axios.get(`/api/order/${_id}`);
      setorder(resp.data);
    } catch (error) {
      seterr(true);
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return { loading, err, getOrder, order };
};

//////!   CREATE COIL   !//////

export const useCreateCoil = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);

  const create = async (credenitals, _id) => {
    try {
      setloading(true);

      const resp = await axios.post(
        `/api/order/coil/${_id || "67901da92d8f14643a385852"}`,
        credenitals
      );

      toast.success("Coil Created Successfuly");
    } catch (error) {
      seterr(true);
      toast.error("Somthing Went Wrong");
    } finally {
      setloading(false);
    }
  };

  return { loading, err, create };
};

//////!   GET COIL   !//////

export const useGetTracking = (Tracking) => {
  const [loading, setloading] = useState();
  const [err, seterr] = useState(false);
  const [tracking, settracking] = useState();

  const getOne = async () => {
    try {
      setloading(true);
      const resp = await axios.get(`/api/order/coil/${Tracking}`);
      settracking(resp.data);
    } catch (error) {
      seterr(true);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (Tracking) getOne();
  }, []);

  return { loading, err, getOne, tracking };
};

//////!   UPDATE COIL CREDENITALS   !//////

export const useCoilCred = (o, u) => {
  const { setcredentials: setCoil } = shipSlice();
  const navigate = useNavigate();
  const { loading, getOne } = useGetOneUser(u?._id, false);

  const send = async () => {
    const user = await getOne();

    setCoil({
      Client: user?.username,
      MobileA: user?.phoneNumber,
      Adresse: user?.streetAddress1,
      Commune: user?.city,
      Total: o?.totalPrice,
      TProduit: o?.item?.name,
      Confrimee: "",
      TypeColis: "0",
      TypeLivraison: "0",
      IDWilaya: user?.state,
      Note: o?.node,
    });
    navigate("/shipping");
  };

  return { send, loading };
};

export const useCreateCoils = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);

  const createMany = async (colis) => {
    try {
      setloading(true);
      await axios.post("/api/order/coils/", colis);
      toast.success("Created Many Colis Successfuly");
    } catch (error) {
      seterr(true);
      toast.error("Somthing Went Wrong");
    } finally {
      setloading(false);
    }
  };

  return { loading, err, createMany };
};
