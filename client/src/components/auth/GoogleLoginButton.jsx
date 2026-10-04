import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleLoginButton = () => {
    const handleSuccess = async (credentialResponse) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/google",
                {
                    token: credentialResponse.credential,
                }
            );

            console.log(res.data);

            // We'll replace this later with Context/Auth
            localStorage.setItem("token", res.data.token);

        } catch (err) {
            console.log(err.response?.data);
        }
    };

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.log("Google Login Failed")}
        />
    );
};

export default GoogleLoginButton;