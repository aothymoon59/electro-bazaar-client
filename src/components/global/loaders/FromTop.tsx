import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const FromTop = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location?.pathname]);
  return children;
};

export default FromTop;
