import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { login, logout } from "./features/auth/authSlice";
import { getCurrentUser, getCsrfCookie } from "./features/auth/api/auth.js";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await getCsrfCookie();

        const response = await getCurrentUser();

        dispatch(
          login({
            userData: response.data,
          }),
        );
      } catch (error) {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App;
