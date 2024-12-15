import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { NavLink } from "react-router-dom";

const GoogleAuth = () => {
  const handleSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    const decoded = jwtDecode(credentialResponse?.credential);
    console.log(decoded);
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <>
      <GoogleOAuthProvider clientId="962249825996-ahaqdg85j9ureqqnq88b412erli15p1t.apps.googleusercontent.com">
        {/* You may want to add additional styling or error handling here */}
        <GoogleLogin 
          onSuccess={handleSuccess} 
          onError={handleError}
          useOneTap
        />
      </GoogleOAuthProvider>
      <div>
        <p><NavLink to='/login'>Don't have an account? Sign Up</NavLink></p> 
      </div>
    </>
  );
};

export default GoogleAuth;
