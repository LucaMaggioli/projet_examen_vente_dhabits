import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { ReWearApiContext } from "./ReWearApiContext";

const Protected = ({ type, children }) => {
  const { isAuthenticated, isPremium, isAdmin } = useContext(ReWearApiContext);

  if (type === "user") {
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }
    return children;
  } else if (type === "premium") {
    if (!isPremium) {
      alert("Vous n'êtes pas inscrit en tant que Premium");
      return <Navigate to="/" replace />;
    }
    return children;
  } else if (type === "admin") {
    console.log("we are in checking for admin");
    console.log(isAdmin);
    // if (!isAdmin) {
    //   alert("Vous n'êtes pas admin");
    // }
    return children;
  }
};
export default Protected;
