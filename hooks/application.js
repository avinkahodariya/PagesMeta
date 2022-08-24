import { useEffect, useState } from "react";
import { ApplicationsService } from "../utility/services";

export const GetApplicationListHook = () => {
  const [data, setData] = useState([]);
  const [reftch, setrefetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const result = await ApplicationsService.get();
        setData(result);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [reftch]);

  const getApplication = () => {
    setrefetch(!reftch);
  };

  return { data, loading, error, getApplication };
};





