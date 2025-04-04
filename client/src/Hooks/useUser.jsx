import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { profileSlice } from "../Store/dashboard";

////////!    GET USERS DETAILS    !////////
export const usetGetUsersDetails = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);
  const [details, setdetails] = useState();

  const getDetails = async () => {
    try {
      setloading(true);
      const resp = await axios("/api/dashboard/userDetails");
      setdetails(resp.data);
    } catch (error) {
      seterr(true);
      toast.error("Somthing Went Wrong");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    (async () => await getDetails())();
  }, []);

  return { loading, err, getDetails, details };
};

//////!   GET ALL USERS   !//////
export const useGetAllUsers = ({ page, filter }) => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);
  const [users, setusers] = useState([]);

  const getAll = async () => {
    let args = [`page=${page}`, `limit=${filter.limit}`, `sort=${filter.sort}`];
    if (filter.search) args.push(`search=${filter.search}`);

    try {
      setloading(true);
      const resp = await axios.get(`/api/auth/all?${args.join("&")}`);
      setusers(resp.data);
    } catch (error) {
      seterr(true);
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getAll();
  }, [page, filter]);

  return { users, getAll, loading, err };
};

//////!   GET ONE USER   !//////
export const useGetOneUser = (_id, onload = true) => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);
  const [user, setuser] = useState();

  const getOne = async () => {
    try {
      setloading(true);
      const resp = await axios.get(`/api/auth/getone/${_id}`);
      setuser(resp.data);
      return resp.data;
    } catch (error) {
      seterr(true);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (_id && onload) getOne();
  }, []);
  return { loading, err, getOne, user };
};

//////!   REMOVE USER   !//////
export const useDeleteUser = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);

  const Delete = async (_id) => {
    try {
      setloading(true);
      const resp = await axios.delete(`/api/auth/delete/${_id}`);
      toast.success("Account Deleted");
    } catch (error) {
      seterr(true);
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return { loading, err, Delete };
};

//////!   CREATE USER   !//////
export const useCreateUser = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const createUser = async (credentials) => {
    if (checkUser(credentials, seterr)) return;

    try {
      setloading(true);
      const resp = await axios.post("/api/auth/createUser", credentials);
      toast.success("Account Created Successfuly");
      navigate("/users");
      seterr({ username: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      if (error.response.status === 402) {
        seterr({ ...err, email: "Email Already Exist " });
        return;
      }
      toast.error("Somthing Went Wrong");
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return { loading, err, createUser };
};

const checkUser = (c, set) => {
  const { username, email, password, confirmPassword } = c;

  if (
    !username ||
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !password ||
    !confirmPassword ||
    password !== confirmPassword
  ) {
    set((state) => ({
      ...state,
      username: username ? "" : "Username is Required",
      email:
        email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          ? ""
          : "Email is Not Valid",
      password: password ? "" : "Password is Required",
      confirmPassword:
        password !== confirmPassword || !confirmPassword
          ? "Must Be Equal to Password"
          : "",
    }));
    return true;
  }
  return false;
};

export const useUpdateUser = (_id) => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const update = async (credentials) => {
    if (checkUser(credentials, seterr)) return;
    try {
      setloading(true);
      const resp = await axios.put(`/api/auth/update/${_id}`, credentials);
      seterr({ username: "", email: "", password: "", confirmPassword: "" });
      toast.success("Profile Updated Successfuly");
    } catch (error) {
      toast.error("Somthing Went Wrong");
      seterr(true);
    } finally {
      setloading(false);
    }
  };

  return { update, loading, err };
};

//////!   LOGIN   !//////

export const useLogin = () => {
  const [loading, setloading] = useState(false);
  const [err, setErr] = useState({ email: "", password: "" });

  const login = async ({ email, password }) => {
    if (
      !email ||
      !password ||
      !/^(?=.*\d).{6,}$/.test(password) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      setErr({
        password: !password
          ? "Please fill the input with your password"
          : /^(?=.*\d).{6,}$/.test(password)
          ? ""
          : "Please Enter Valid Password",
        email: !email
          ? "Please fill the input with your email"
          : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          ? ""
          : "Please Enter Valid Email",
      });
      return;
    }
    setloading(true);

    try {
      const resp = await axios.post("/api/auth/", { email, password });
      setErr({ email: "", password: "" });
      localStorage.setItem("isAdmin", resp.data.isAdmin.toString());

      window.location.reload();
    } catch (error) {
      if (error.response.status === 402 || error.response.status === 403)
        setErr({
          password: error.response.status === 402 ? "Incorrect Password" : "",
          email: error.response.status === 403 ? "Email Not Found" : "",
        });
      toast.error("Somthing Went Wrong");
    } finally {
      setloading(false);
    }
  };

  return { login, loading, err };
};

//////!   LOGOUT   !//////

export const useLogout = () => {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  const logout = async () => {
    try {
      setloading(true);
      localStorage.clear();
      await axios.get("/api/auth/logout");
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return { logout, loading, error };
};

//////!   GET PROFILE   !//////

export const useGetPorfile = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);
  const { setprofile } = profileSlice();
  const { logout } = useLogout();

  const get = async () => {
    try {
      setloading(true);
      console.log("xqsdqsd");
      
      const resp = await axios.get("/api/auth/profile");
      setprofile(resp.data);
    } catch (error) {
      seterr(true);
      if (error.response.status === 401) {
        logout();
      }
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    get();
  }, []);

  return { loading, err, get };
};
