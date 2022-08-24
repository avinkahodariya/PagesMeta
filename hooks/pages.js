import { useEffect, useState } from "react";
import { PagesService } from "../utility/services";

export const GetPagesListHook = () => {
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const result = await PagesService.get();
        setData(result);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [refetch]);

  const getPages = () => {
    setRefetch(!refetch);
  };
  return { data, loading, error, getPages };
};
