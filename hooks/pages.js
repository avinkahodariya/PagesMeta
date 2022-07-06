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

export const UpdatePagesHook = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const result = await PagesService.update(data.id, data.dataObj);
        setData(result);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [data]);

  const updatePage = (id, dataObj) => {
    setData({ dataObj, id });
  };

  return { data, loading, error, updatePage };
};

export const AddPageHook = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const add = async () => {
      try {
        setLoading(true);
        const result = await PagesService.add(data);
        setData(result);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    add();
  }, [data]);

  const addPage = (dataObj) => {
    return setData(dataObj);
  };

  return { data, loading, error, addPage };
};

export const RemovePageHook = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const remove = async () => {
      try {
        setLoading(true);
        const result = await PagesService.remove(data);
        setData(result);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    remove();
  }, [data]);

  const removePage = (id) => {
    return setData(id);
  };

  return {
    data,
    loading,
    error,
    removePage,
  };
};
