import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./layout/Layout.js";
import Home from "./components/Home.js";
import About from "./components/About.js";
import Login from "../src/components/Login.js";
import Signup from "./components/Signup.js";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="createuser" element={<Signup />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
