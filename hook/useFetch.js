import { useState, useEffect } from "react";
import axios from "axios";



const useFetch = (endpoint,query) => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: {
         ...query
        },
        headers: {
          'X-RapidAPI-Key':'252cb040f6msh8d5876bc0e04bd2p15dde5jsn4e6bf1aee0a8' ,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
      };

      const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);
            setData(response.data.data);
            setIsLoading(false);
            
        } catch (error) {
            setError(error);
            alert("There is an error");
        } finally {
            setIsLoading(false);
        }
      }

      useEffect(() => {
        fetchData();
      }, [])
      
      const refresh = () => {
        setIsLoading(true);
        fetchData();
      }
    

    return {data, isLoading, error, refresh}
}
export default useFetch