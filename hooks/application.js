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

export const UpdateApplicationHook = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const result = await ApplicationsService.update(data.id, data.dataObj);
        setData(result);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [data]);

  const update = (id, dataObj) => {
    setData({ dataObj, id });
  };

  return { data, loading, error, update };
};

export const AddApplication = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const add = async () => {
      try {
        setLoading(true);
        const result = await ApplicationsService.add(data);

        setData(result);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    add();
  }, [data]);

  const InsertApp = (dataObj) => {
    return setData(dataObj);
  };

  return { data, loading, error, InsertApp };
};

export const RemoveApplicationHook = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const remove = async () => {
      try {
        setLoading(true);
        const result = await ApplicationsService.remove(data);
        setData(result);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    remove();
  }, [data]);

  const removeApplication = (id) => {
    return setData(id);
  };

  return {
    data,
    loading,
    error,
    removeApplication,
  };
};
