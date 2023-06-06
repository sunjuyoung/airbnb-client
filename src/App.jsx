import "./App.css";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home";

import { Toaster } from "react-hot-toast";
import { defaultFormat } from "moment/moment";
import ListingForm from "./pages/listing/ListingForm";
import ListingPage from "./pages/listing/ListingPage";
import TripPage from "./pages/trip/TripPage";
import FavoritesPage from "./pages/favorites/FavoritesPage";
import PropertiesPage from "./pages/properties/PropertiesPage";
import SearchLocationModal from "./components/modal/SearchLocationModal";
import SearchDateModal from "./components/modal/SearchDateModal";
import NotificationPage from "./pages/notific/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import newRequest from "./utils/newRequest";
import { toast } from "react-hot-toast";
import ReviewModal from "./components/modal/ReviewModal";
function App() {
  const Layout = () => {
    const navigate = useNavigate();

    newRequest.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response?.data?.code === 401) {
          toast.error(error.response.data.msg);
          navigate("/login");
          return;
        }

        return Promise.reject(error);
      }
    );
    return (
      <div className="app">
        <Navbar />
        <ReviewModal />
        <SearchDateModal />
        <SearchLocationModal />
        <Outlet />
        <Toaster />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/listingForm",
          element: <ListingForm />,
        },
        {
          path: "/listing/:id",
          element: <ListingPage />,
        },
        {
          path: "/trips",
          element: <TripPage />,
        },
        {
          path: "/favorites",
          element: <FavoritesPage />,
        },
        {
          path: "/properties",
          element: <PropertiesPage />,
        },
        {
          path: "/notification",
          element: <NotificationPage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
