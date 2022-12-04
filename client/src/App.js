import React, { useState, useEffect } from "react";
import {Route,Link} from "react-router-dom";

import getWeb3 from "./getWeb3";
import Lottery from "./contracts/Lottery.json";
import "./App.css";

import Navbar from "./MyComponents/Navbar";
import Home from "./MyComponents/Home";
import Manager from "./MyComponents/Manager";
import Players from "./MyComponents/Players";

const App = () => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  const [address, setAddress] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();

        const deployedNetwork = Lottery.networks[networkId];
        console.log("Contract Address:", deployedNetwork.address);
        const instance = new web3.eth.Contract(
          Lottery.abi,
          deployedNetwork && deployedNetwork.address
        );
        setState({ web3, contract: instance });
        setAddress(deployedNetwork.address);
      } catch (error) {
        alert("Falied to load web3 or contract.");
        console.log(error);
      }
    };
    init();
  }, []);

  return (
    <>
    <Navbar/>
    <br />
    <Route exact path="/home">
      <Home/>
    </Route>
    <Route path="/manager">
      <Manager state={state}/>
    </Route>
    <Route path="/players">
      <Players state={state} address={address}/>
    </Route>
    </>
  );
};
export default App;
