import axios from 'axios';
import { useEffect } from 'react';

const KeepAlive = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      // Send a keep-alive request to the server
      axios
        .get(
          `${process.env.NEXT_PUBLIC_AUTH_SERVER_ENDPOINT}/api/auth/sessions/keep-alive`,
          { withCredentials: true }
        )
        .then((response) => {})
        .catch((error: any) => {
          console.log(error.message);
        });
    }, 60000); // Specify the desired interval between requests in milliseconds

    return () => {
      clearInterval(interval); // Clean up the interval when the component is unmounted
    };
  }, []);

  return null; // Since this is a utility component, it doesn't render anything
};

export default KeepAlive;
