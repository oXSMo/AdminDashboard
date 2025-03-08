////////!    DELETE ITEM    !////////

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useDeleteItem = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);

  const Delete = async (_id) => {
    try {
      await axios.delete(`/api/item/${_id}`);
      seterr(false);
      toast.success("Item Deleted Successfuly");
    } catch (error) {
      console.log(error);
      seterr(true);
      toast.err("Something Went Wrong");
    } finally {
      setloading(false);
    }
  };
  return { err, loading, Delete };
};

////////!    GET ALL ITEMS    !////////

export const useGetAllItems = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);
  const [items, setitems] = useState([]);

  const getItems = async () => {
    try {
      setloading(true);
      const resp = await axios.get("/api/item");
      setitems(resp.data);
    } catch (error) {
      console.log(error);
      seterr(true);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return { loading, err, getItems, items };
};

////////!    GET OPTIONS    !////////

export const useGetOption = (_id) => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);
  const [options, setoptions] = useState([]);

  useEffect(() => {
    if (_id)
      (async () => {
        setloading(true);
        try {
          const resp = await axios.get(`/api/item/options/${_id}`);
          setoptions(resp.data);
        } catch (error) {
          seterr(true);
          console.log(error);
        } finally {
          setloading(false);
        }
      })();
  }, [_id]);

  return { err, loading, options };
};
