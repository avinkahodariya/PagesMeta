import { useEffect, useState } from "react";
import { MetaService } from "../utility/services";

export const GetMetasListHook = () => {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   useEffect(() => {
      const fetch = async () => {
         try {
            setLoading(true);
            const result = await MetaService.get();
            setData(result);
         } catch (e) {
            setError(e);
         } finally {
            setLoading(false);
         }
      };

      fetch();
   }, []);

   return { data, loading, error };
};

export const UpdateMetaHook = () => {
   const [data, setData] = useState({});
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   useEffect(() => {
      const fetch = async () => {
         try {
            setLoading(true);
            const result = await MetaService.update(data.id, data.dataObj);
            setData(result);
         } catch (e) {
            setError(e);
         } finally {
            setLoading(false);
         }
      };

      fetch();
   }, [data]);

   const updateMeta = (id, dataObj) => {
      setData({ dataObj, id });
   };

   return { data, loading, error, updateMeta };
};

export const AddMetaHook = () => {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   useEffect(() => {
      const add = async () => {
         try {
            setLoading(true);
            const result = await MetaService.add(data);
            setData(result);
         } catch (e) {
            setError(e);
         } finally {
            setLoading(false);
         }
      };
      add();
   }, [data]);

   const AddMeta = (dataObj) => {
      return setData(dataObj);
   };

   return { data, loading, error, AddMeta };
};

export const RemovePageHook = () => {
   const [data, setData] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   useEffect(() => {
      const remove = async () => {
         try {
            setLoading(true);
            const result = await MetaService.remove(data);
            setData(result);
         } catch (e) {
            setError(e);
         } finally {
            setLoading(false);
         }
      };
      remove();
   }, [data]);

   const removeMeta = (id) => {
      return setData(id);
   };

   return {
      data,
      loading,
      error,
      removeMeta,
   };
};
