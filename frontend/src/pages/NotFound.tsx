import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <h1 className=" text-[4rem] font-bold text-white font-inter">
        Page Not Found !
      </h1>
      <Button
        className="w-fit text-[2rem] text-black bg-blue-100 rounded-3xl p-0 mt-4"
        onClick={() => navigate("/")}
      >
        Go to Home Page
      </Button>
    </div>
  );
}

export default NotFound;
