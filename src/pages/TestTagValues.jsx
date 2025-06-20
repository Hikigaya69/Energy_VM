import axios from 'axios';
import { useEffect } from 'react';

export const TestTagValues = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
     const res=await axios.get('http://127.0.0.1:7055/oee/krbl/acquisition/currenttagvalues');


        console.log('📦 Tag Values:', res.data);
      } catch (err) {
        console.error('❌ Error fetching tag values:', err);
      }
    };

    fetchData();
  }, []);

  return <div>Open the browser console to see tag values</div>;
};
