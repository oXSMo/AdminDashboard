import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

function Authroutes() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/auth");
  }, [pathname]);

  if (!localStorage.getItem("isAdmin")) return Navigate("/");
  else return <Outlet />;
}

export default Authroutes;
