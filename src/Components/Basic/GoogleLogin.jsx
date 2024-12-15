import GoogleAuth from "./GoogleAuth";
import { googleImg } from "./googleImg";

const GoogleLogin = () => {
  return (
    <>
      <div class="grid grid-cols-3 gap-4 p-4">
        {googleImg.map((data, index) => (
          <div  key={index} class="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={data.img}
              alt={data.alt}
              class="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>
      <GoogleAuth/>
    </>
  );
};
export default GoogleLogin;
