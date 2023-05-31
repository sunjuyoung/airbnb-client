import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
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

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
