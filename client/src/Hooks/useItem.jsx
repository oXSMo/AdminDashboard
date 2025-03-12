import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

////////!    DELETE ITEM    !////////

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

////////!    CREATE ITEM    !////////

export const useCreateItem = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState({ name: "" });
  const naivgate = useNavigate();
  const create = async (credentials, options) => {
    try {
      if (checkErr(credentials, options, seterr)) return;

      setloading(true);
      const resp = await axios.post(`/api/item`, credentials);

      await axios.post(
        "/api/item/options",
        options .map((e) => ({ ...e, item: resp.data._id }))
      );
      seterr({ name: "" });
      toast.success("Item Created Successfuly");
      naivgate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    } finally {
      setloading(false);
    }
  };

  return { create, err, loading };
};

const checkErr = ({ name }, options, seterr) => {
  if ((!name, !options.length)) {
    seterr({
      name: !name ? "Please Enter A Name" : "",
      options: !options.length ? "At Leaset Enter One Option" : "",
    });
    return true;
  }
  return false;
};

////////!    UPDATE ITEM    !////////

export const useUpdateItem = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);

  const update = async (credentials, options, _id) => {
    try {
      const NewO = options
        .filter((e) => !!e.name)
        .map((o) => ({
          name: o.name,
          item: _id,
          price: o?.price,
          description: o?.description,
        }));

      await axios.put("/api/item/optionss", NewO);

      await axios.put(`/api/item/${_id}`, credentials);
      toast.success("Item Updated Successfuly");

      setloading(true);
    } catch (error) {
      console.log(err);
      seterr(true);
    } finally {
      setloading(false);
    }
  };
  return { loading, err, update };
};

////////!    GET ONE ITEM    !////////

export const useGetItem = (_id) => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);
  const [item, setitem] = useState();
  const [opts, setopt] = useState([]);

  const getItem = async () => {
    try {
      const resp = await axios.get(`/api/item/${_id}`);

      setitem(resp.data);
    } catch (error) {
      console.log(error);
      seterr(true);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  return { item, err, loading, getItem, opts };
};
