import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PreventBackNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      navigate(location.pathname); // Stay on the current page
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate, location]);

  return null;
};

export default PreventBackNavigation;
