import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [data , setdata] = useState("");
  const [datas , setdatas] = useState({});
  const baseurl = 'https://incentivized-testnet.seinetwork.io/check-eligibility?seiAddress=';

  const check = async () => {
    try {
      const response = await axios.get(`${baseurl}${data}`);
      console.log(response.data);
      setdatas(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getEligibleAmount = () => {
    if (datas.eligibleAmount) {
      let numbers = datas.eligibleAmount.replace(/\D/g, '');
      return Math.floor(numbers / 1000000);
    }
    return "";
  };

  return (
    <>
      <input onChange={(e) => setdata(e.target.value)}></input>
      <button onClick={check}>Check</button>
      <p>Address<span><h5>{data}</h5></span></p>
      <h2>eligibleAmount : {getEligibleAmount()} $SEI</h2>
      <h2>reason : {datas.reason === undefined ? "Anda Beruntung" : datas.reason}</h2>
    </>
  );
}

export default App;
