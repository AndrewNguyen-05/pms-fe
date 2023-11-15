import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ourRequest = axios.CancelToken.source(); // <--- 1st step
    async function fetchData() {
      try {
        let res = await axios.get(url, {
          cancelToken: ourRequest.token, //<-- 2nd step
        });
        let currentData = res && res.data ? res.data : [];
        setData(currentData);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        }
      }
    }

    setTimeout(() => {
      fetchData();
    }, 1000);
    return () => {
      ourRequest.cancel("Operation canceled by the user."); //<--- 3rd step
    };
  }, [url]);

  return {
    data,
  };
};

export default useFetch;
