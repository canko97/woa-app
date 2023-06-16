import { useRouter } from 'next/router';
import axios from 'axios';

function VerifyEmail() {
  const router = useRouter();
  const { verificationCode, id } = router.query;
  console.log(verificationCode, id);
  // Send a request to your API endpoint to verify the user's email
  const apiUrl = `${process.env.NEXT_PUBLIC_AUTH_SERVER_ENDPOINT}/api/users/verify/${id}/${verificationCode}`;

  console.log(apiUrl);

  axios
    .post(apiUrl)
    .then((response) => {
      console.log(response.data);
      // Handle the response from the API endpoint as needed
    })
    .catch((error) => {
      console.error(error.message);
      // Handle the error as needed
    });

  return <p>Email Verified</p>;
}

export default VerifyEmail;
