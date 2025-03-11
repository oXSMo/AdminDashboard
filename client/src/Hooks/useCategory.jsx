import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUploadImg } from "../Utils/Hooks";

////////!    GET CATEGORIES    !////////

export const useGetCategories = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    (async () => {
      setloading(true);
      try {
        const resp = await axios.get("/api/category");
        setcategories(resp.data);
      } catch (error) {
        seterr(true);
        console.log(error);
      } finally {
        setloading(false);
      }
    })();
  }, []);

  return { err, loading, categories };
};

////////!    GET CATEGORIES DASHBOARD    !////////

export const useGetDashCategories = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);
  const [categories, setcategories] = useState([]);

  const getCategories = async () => {
    try {
      setloading(true);
      const resp = await axios.get("api/category/dashboard");
      setcategories(resp.data);
    } catch (error) {
      seterr(true);
      toast.error("Somthing Went Wrong");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return { loading, getCategories, err, categories };
};

////////!    CREATE CATEGORY    !////////

export const useCreateCategory = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState({ name: "", description: "", image: "" });

  const { upload } = useUploadImg();

  const create = async (credentials) => {
    try {
      if (errCreate(credentials, seterr)) return;
      setloading(true);
      const image = await upload(credentials.image);
      await axios.post("/api/category", { ...credentials, image });

      toast.success("category created successfuly");

      seterr({ name: "", description: "", image: "", success: true });
    } catch (error) {
      seterr(true);
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  return { create, loading, err };
};

const errCreate = ({ name, image, description }, seterr) => {
  if (!name || !image || !description) {
    seterr((err) => ({
      ...err,
      name: !name ? "Please Enter Category Name" : "",
      image: !image ? "Please Enter Category Image" : "",
      description: !description ? "Please Enter Category Description" : "",
    }));
    return true;
  }

  return false;
};

////////!    EDIT CATEGORY    !////////

export const useEditCategory = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState({ name: "", description: "", image: "" });
  const { upload } = useUploadImg();

  const update = async (credentials, _id) => {
    try {
      if (errCreate(credentials, seterr)) return;
      setloading(true);
      let image;
      if (typeof credentials.image !== "string")
        image = await upload(credentials.image);
      const resp = await axios.put(`/api/category/${_id}`, {
        ...credentials,
        image:
          typeof credentials?.image === "string" ? credentials?.image : image,
      });

      toast.success("Category Updated Successfuly");
    } catch (error) {
      seterr({ ...err, fail: "Somthing Went Wrong" });
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return { update, err, loading };
};

////////!    DELETE CATEGORY    !////////

export const useDeleteCategory = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);
  const navigate = useNavigate();
  const Delete = async (_id) => {
    try {
      setloading(true);
      axios.delete(`/api/category/${_id}`);
      toast.success("Category Delete Successfuly");
    } catch (error) {
      console.log(error);
      seterr(true);
    } finally {
      setloading(false);
    }
  };

  return { loading, err, Delete };
};
