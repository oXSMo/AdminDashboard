import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
