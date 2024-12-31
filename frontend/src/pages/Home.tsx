import { useEffect } from "react";
import Button from "../components/Button";
import ColorfulLogo from "../components/ColorfulLogo";
import Input from "../components/Input";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("INKTHINK-playerId") === null ||
      !localStorage.getItem("INKTHINK-playerId")
    ) {
      localStorage.setItem("INKTHINK-playerId", uuidv4());
    }
  }, []);

  async function createRoom() {
    if (!localStorage.getItem("INKTHINK-name")) {
      alert("Please enter your name");
      return;
    } else {
      const responce = await axios.post(
        "http://localhost:4000/api/create-room",
        {
          playerId: localStorage.getItem("INKTHINK-playerId"),
        }
      );
      navigate(`/room/${responce.data.roomId}`);
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-transparent ">
      <ColorfulLogo className="sm:text-[4rem] text-[2.5rem] m-0 p-0" />
      <div className="min-w-[24rem] p-5 rounded-xl flex flex-col gap-2 mt-4 bg-[#153B82] bg-opacity-[0.9] shadow-lg">
        <Input placeholder="Enter your name" />
        <Button
          className="bg-green-600 hover:bg-green-700  text-white text-xl"
          style={{ padding: "1rem 2rem" }}
        >
          Start
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white text-xl"
          style={{ padding: "1rem 2rem" }}
          onClick={createRoom}
          onKeyDown={(e) => {
            e.preventDefault();
            if (e.key === "Enter") {
              console.log("Enter key pressed");
              createRoom();
            }
          }}
        >
          Create Room
        </Button>
      </div>
    </div>
  );
};

export default Home;
