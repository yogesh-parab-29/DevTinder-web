import { Outlet, useNavigate } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = async () => {
    try {
      const response = await axios.get(BASE_URL + "profile/view", {
        withCredentials: true,
      });
      // console.log(response.data);
      dispatch(addUser(response.data));
    } catch (err) {
      if (err.status === 401) {
        return navigate("/login");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    userData();
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <main className="flex flex-1 flex-col align-middle justify-center">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </>
  );
};
export default Layout;
