import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { checkValidData } from "../../utils/checkValidData";
import { addUser } from "../../utils/store/userSlice";
import { auth } from "../../utils/firebase";
import { useDispatch } from "react-redux";

const Login = () => {
    const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSignInForm, setIsSignInForm] = useState(false);

  // Toggle between sign-in and sign-up form
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setFormData({ firstName: "", lastName: "", email: "", password: "", gender: "" });
    setErrorMessage(null);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle button click (Submit logic)
  const handleButton = () => {
    let message = null;
    if (!isSignInForm) {
      message = checkValidData(formData.email, formData.password, formData.firstName);
    } else {
      message = checkValidData(formData.email, formData.password, null);
    }
    setErrorMessage(message);
    if (message) return;
    
    if (isSignInForm) {
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          const user = userCredential.user;
          // Handle successful login
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
        });
    } else {
        createUserWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
          )
            .then((userCredential) => {
              // Signed up
    
              const user = userCredential.user;
              // update profile logic
    
              updateProfile(user, {
                displayName: name.current.value,
                photoURL: headerUserLogo,
              })
                .then(() => {
                  // Profile updated!
                  const { uid, email, displayName, photoURL } = auth.currentUser;
                  dispatch(
                    addUser({
                      uid: uid,
                      email: email,
                      displayName: displayName,
                      photoURL: photoURL,
                    })
                  );
                })
                .catch((error) => {
                  setErrorMessage(error.message);
                });
            })
            .catch((error) => {
              setErrorMessage(error.code + "-" + error.message);
            });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-center">
              {isSignInForm ? "Log in to Facebook" : "Create a new account"}
            </h1>
            {!isSignInForm && <p className="text-center text-sm text-gray-500">It's quick and easy.</p>}
          </div>

          {/* Display error message if any */}
          {errorMessage && (
            <div className="bg-red-100 text-red-500 p-3 rounded mb-4 text-center">
              {errorMessage}
            </div>
          )}

          {!isSignInForm && (
            <div>
              <div className="space-y-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded"
                />
              </div>

              <div className="mt-4">
                <p className="mb-2 text-sm">Gender</p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="custom"
                      name="gender"
                      value="custom"
                      checked={formData.gender === "custom"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="custom">Custom</label>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded mb-4"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded"
              required
            />
          </div>

          <button
            type="button"
            onClick={handleButton}
            className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          {!isSignInForm && (
            <p className="text-xs text-center text-gray-500 mt-4">
              People who use our service may have uploaded your contact
              information to Facebook. Learn more. By clicking Sign Up, you
              agree to our Terms, Privacy Policy, and Cookies Policy. You may
              receive SMS notifications from us and can opt out at any time.
            </p>
          )}

          <div className="text-center mt-4">
            <label
              onClick={toggleSignInForm}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              {isSignInForm
                ? "New to Facebook? Sign Up Now."
                : "Already Registered? Sign In Now"}
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
