import { useState, useEffect } from 'react';
import { http } from './http';

export interface IOverviewRequestParams {
  knowfirst_id: string;
  database_id?: number;
}

const useOverviewRequest = (params: IOverviewRequestParams) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await http.get(`https://api.knowfirst.ai/v1/business/overview`, {
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

export default useOverviewRequest;