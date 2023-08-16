import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setdata] = useState("");
  const [datas, setdatas] = useState("");
  const [alertgagal, setalertgagal] = useState("");
  const [alertsukses, setalertsukses] = useState("");
  const [Loading, setLoading] = useState(false)
  const baseurl = 'https://incentivized-testnet.seinetwork.io/check-eligibility?seiAddress=';

  const check = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${baseurl}${data}`);
      console.log(response.data);
      setdatas(response.data);
      setalertsukses("Api Aktif");
      setalertgagal("");
      setLoading(false)
    } catch (error) {
      setalertgagal("Api Dari Sei Sedang dimatikan / Down");
      setalertsukses("");
      setLoading(false)
    }
  };

  const getEligibleAmount = () => {
    if (datas.eligibleAmount) {
      let numbers = datas.eligibleAmount.replace(/\D/g, '');
      return Math.floor(numbers / 1000000);
    }
    return "";
  };

  useEffect(() => {
    check()
  }, [data])

  if (!alertgagal) {
    return alertsukses
  }



  return (
    <>
      <input onChange={(e) => setdata(e.target.value)}></input>
      <button onClick={()=>check()}>
        {Loading ? 'Loading...' : 'Check'}
      </button>
      <p>Address Kamu : <span><h5>{data}</h5></span></p>
      <h2>EigibleAmount : {getEligibleAmount()} $SEI</h2>
      <h2>Reason : {datas.reason === undefined ? "" : datas.reason}</h2>
      <h4>
        <span style={{ color: 'black' }}>Status API : </span>
        <span style={{ color: alertgagal ? 'red' : 'green' }}>
          {alertgagal || alertsukses}
        </span>
      </h4>

    </>
  );
}

export default App;
