import Typeface from "./TypeFace";

const Bar = () => {
  return (
    <div className="w-full bg-white sm:pt-1 sm:pl-5 sm:pr-5 h-14 flex justify-between ">
      <img
        src="../../public/gifs/pocket-watch-unscreen.gif"
        className="sm:w-12 sm:h-12  rounded-lg cursor-pointer "
      ></img>
      <div className="w-fit h-fit rounded-lg">
        <Typeface word="clo ck" activeIndexes={[1, 2, 3, 4]} />
      </div>
      <img
        src="../../public/gifs/settings.gif"
        className="sm:w-12 sm:h-12 rounded-lg cursor-pointer"
      ></img>
    </div>
  );
};

export default Bar;
