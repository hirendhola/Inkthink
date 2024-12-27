"use client";

interface TypefaceProps {
  word: string;
  activeIndexes?: number[];
  boxSize?: {
    width: number;
    height: number;
  };
}

export default function Typeface({
  word,
  activeIndexes = [],
  boxSize = { width: 20, height: 3 },
}: TypefaceProps) {
  const wordLengths = word.split(" ").map((w) => w.length);

  return (
    <div className=" flex flex-row flex-1 sm:gap-3 gap-2 w-full h-full ">
      <div className=" relative flex gap-2 items-baseline sm:text-3xl text-2xl  w-full h-full sm:mt-1 mt-3">
        {word.split("").map((char, index) => (
          <div className="h-full">
            <div className="m-0 p-0">
              <div
                key={index}
                style={{
                  width: `${boxSize.width}px`,
                  height: `${boxSize.height}px`,
                }}
                className={`m-0 p-0 rounded-lg
            ${activeIndexes.includes(index) ? "bg-transparent" : "bg-black"} 
          `}
              ></div>
            </div>
            <div className="">
              {activeIndexes.includes(index) && (
                <>
                  <span className="font-pencil sm:font-semibold font-bold inset-0 flex items-center justify-center text-black text-center ">
                    {char}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="sm:text-sm text-xs flex items-center gap-1">
        {" "}
        {wordLengths.map((length, idx) => (
          <span key={idx}>{length}</span>
        ))}
      </div>
    </div>
  );
}
