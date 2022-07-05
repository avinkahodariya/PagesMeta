import { useEffect, useState } from "react"
import { ApplicationsService } from "../utility/services";

export const GetApplicationListHook = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] =useState(false);
    const [error,setError] = useState('')

    useEffect(() => {
        const fetch = async () => {
            try{
                setLoading(true)
                const result = await ApplicationsService.get()
                setData(result)
            } catch(e){
                setError(e)
            } finally{
                setLoading(false)
            }
        }

        fetch()
    },[])

    return  { data,loading,error}
}


// export const UpdateApplicationHook = () => {

//     const [data, setData] = useState([]);
//     const [loading, setLoading] =useState(false);
//     const [error,setError] = useState('')

//     useEffect(() => {
//         const fetch = async () => {
//             try{
//                 setLoading(true);
//                 const result = await ApplicationsService.update({id,data})
//                 setData(result)
//             } catch(e){
//                 setError(e)
//             } finally{
//                 setLoading(false)
//             }
//         }

//         fetch()
//     },[])

//     return  { data,loading,error}
// }

export const AddApplication = (dataObj) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] =useState(false);
    const [error,setError] = useState('')

    useEffect(() => {
        const add = async () => {
            try{
                setLoading(true);
                const result = await ApplicationsService.add(data)
                console.log("🚀 ~ file: application.js ~ line 66 ~ add ~ result", result)
                setData(result)
            } catch(e){
                setError(e)
            } finally{
                setLoading(false)
            }
        }
        add();
        
    },[data])

    const InsertApp = (dataObj) => {
      return  setData(dataObj)
    }

    return  { data,loading,error, InsertApp }
}
