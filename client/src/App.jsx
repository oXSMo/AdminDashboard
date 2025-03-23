import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/layouts/Navbar";
import Home from "./Pages/Home";
import Sidebar from "./Components/layouts/Sidebar";
import { useEffect } from "react";
import "preline/preline";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { Bounce, ToastContainer } from "react-toastify";
import { darkSlice } from "./Store/darktheme";
import UserOverview from "./Pages/Users/UserOverview";
import AddUser from "./Components/forms/AddUser";
import UserCreate from "./Pages/Users/UserCreate";
import UserEdit from "./Pages/Users/UserEdit";
import OrdersOverview from "./Pages/Orders/OrdersOverview";
import CreateOrder from "./Pages/Orders/CreateOrder";
import EditOrder from "./Pages/Orders/EditOrder";
import Test from "./Pages/Test";
import Authroutes from "./Pages/Auth/Auth.routes";
import Auth from "./Pages/Auth/Auth";
import CategoryOverView from "./Pages/Categories/CategoryOverView";
import CategoryCreate from "./Pages/Categories/CategoryCreate";
import ShippingCreate from "./Pages/Shipping/ShippingCreate";
import CreateItem from "./Pages/Items/CreateItem";
import EditItem from "./Pages/Items/EditItem";
import { useGetPorfile } from "./Hooks/useUser";

function App() {
  const location = useLocation();
  useGetPorfile();

  console.log(localStorage.getItem("isAdmin"));

  if (!localStorage.getItem("isAdmin")) return <Auth />;
  else
    return (
      <>
        <main className="min-h-screen dark:bg-qua bg-pri dark:text-neutral-200 text-zinc-700 md:grid md:grid-cols-[auto_1fr]">
          <Sidebar />
          <article className="w-full relative z-40">
            <Navbar />
            <aside className="p-5 max-w-full ">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<UserOverview />} />
                <Route path="/addUser" element={<UserCreate />} />
                <Route path="/editUser/:_id" element={<UserEdit />} />
                <Route path="/orders" element={<OrdersOverview />} />
                <Route path="/addOrder" element={<CreateOrder />} />
                <Route path="/editOrder/:_id" element={<EditOrder />} />
                <Route path="/categories" element={<CategoryOverView />} />
                <Route path="/shipping" element={<ShippingCreate />} />
                <Route path="/createItem" element={<CreateItem />} />
                <Route path="/editItem/:_id" element={<EditItem />} />
                <Route path="/test" element={<Test />} />
              </Routes>
            </aside>
          </article>
          <div id="portal-root"></div>
        </main>
        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          limit={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={"dark"}
          transition={Bounce}
        />
      </>
    );
}

export default App;
