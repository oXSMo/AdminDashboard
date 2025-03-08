import axios from "axios";
import { useEffect, useState } from "react";
import { dashboardSlice } from "../Store/dashboard";
import { toast } from "react-toastify";

////////!    GET LATEST USERS    !////////

export const useGetLatestUsers = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);
  const [info, setinfo] = useState();

  const getUsers = async () => {
    try {
      setloading(true);
      const resp = await axios.get("/api/dashboard");
      console.log(resp);
      setinfo(resp.data);
    } catch (error) {
      seterr(err);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return { loading, getUsers, err, info };
};

////////!    GET TOTAL SALLERY    !////////

export const useGetTotal = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);
  const { total, settotal } = dashboardSlice();
  const get = async () => {
    try {
      setloading(true);
      const resp = await axios.get("/api/dashboard/total");
      settotal(resp.data);
    } catch (error) {
      seterr(true);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    (async () => await get())();
  }, []);

  return { get, loading, total, err };
};

////////!    GET ITEMS    !////////

export const useGetItems = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);
  const [items, setitems] = useState([]);

  const getItems = async () => {
    try {
      setloading(true);
      const resp = await axios.get("/api/dashboard/items");
      setitems(resp.data);
    } catch (error) {
      seterr(true);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    (async () => await getItems())();
  }, []);

  return { loading, err, getItems, items };
};

////////!    GET USERS    !////////

export const usetGetLatesUsers = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);
  const [users, setusers] = useState([]);

  const getLatest = async () => {
    try {
      setloading(true);

      const resp = await axios.get("/api/dashboard/users");
      setusers(resp.data);
    } catch (error) {
      seterr(true);
      toast.error("Somthing Went Wrong");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    (async () => await getLatest())();
  }, []);

  return { loading, err, users, getLatest };
};
////////!    GET ORDERS    !////////

export const usetGetLatesOrders = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);
  const [orders, setorders] = useState([]);

  const getLatest = async () => {
    try {
      setloading(true);

      const resp = await axios.get("/api/dashboard/orders");
      setorders(resp.data);
    } catch (error) {
      seterr(true);
      toast.error("Somthing Went Wrong");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    (async () => getLatest())();
  }, []);

  return { loading, err, orders, getLatest };
};
