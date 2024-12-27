import Button from "../components/Button";
import ColorfulLogo from "../components/ColorfulLogo";
import Input from "../components/Input";

const Home = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-transparent">
      <ColorfulLogo className="text-[4rem]" />
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
        >
          Create Room
        </Button>
      </div>
    </div>
  );
};

export default Home;
