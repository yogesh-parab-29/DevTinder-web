import "./App.css";
import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout";
import ReactDOM from "react-dom/client";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connection from "./components/Connection";
import Request from "./components/Request";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <div className="min-h-screen flex flex-col">
          <Layout></Layout>
        </div>
      </>
    ),
    children: [
      { index: true, element: <Feed /> },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup", 
        element: <Signup />,
      },
      {
        path: "profile", 
        element: <Profile />,
      },
      {
        path: "connections", 
        element: <Connection />,
      },
      {
        path: "requests", 
        element: <Request />,
      },
    ],
  },
]);

const root = document.getElementById("root");

function App() {

  
  return (
    <>
      <Provider store={appStore}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
