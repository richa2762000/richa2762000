import GoogleAuth from "./GoogleAuth";
import { googleImg } from "./googleImg";
import { BrowserRouter as Router } from 'react-router-dom';


const GoogleLogin = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-4">
        {/* Iterate over googleImg array to display images */}
        {googleImg.map((data, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={data.img}
              alt={data.alt}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
        {/* Include Google Login */}
          {/* Other routes/components */}
          <GoogleAuth />
      </div>
    </>
  );
};
export default GoogleLogin;
