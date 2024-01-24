import React, { useContext } from "react";
import ContextStore, { Store } from "../Datastore/Context_SignUpAndLogin";
import Login from "./LoginIn";
import SignUp from "./SignUp";

const Home = () => {
  let data = useContext(Store);
  console.log(data);
  return <>home</>;
};

export default Home;
