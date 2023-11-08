import { useState, useEffect } from 'react';
import { http } from './http';

const useListRequest = (params: Object) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await http.get(`https://api.knowfirst.ai/v1/business/list`, {
          headers: {
            "x-api-key": "1115-ARLKPGH0jzN15zS4wZ0p4RiT1E47fvlsPYVC"
          },
          params: { ...params },
        });
        setData(res.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    }
    fetchData();
  }, [params]);

  return [data, loading, error]
}

export default useListRequest;