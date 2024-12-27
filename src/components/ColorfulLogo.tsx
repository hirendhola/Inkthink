import clsx from "clsx";
import { Pencil } from "lucide-react";

interface prop {
  className?: string;
  size?: string;
}

const ColorfulLogo = ({ className, size }: prop) => {
  let MainClass = clsx(
    "flex items-center font-bold tracking-wider cursor-pointer mt-3",
    className
  );

  MainClass = clsx(MainClass, size);

  return (
    <div className="flex items-center justify-center gap-1 font-pencil">
      <h1 className={MainClass}>
        <span
          className="text-red-500 hover:scale-110 transition-transform drop-shadow	"
          style={{
            textShadow:
              "3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000",
          }}
        >
          I
        </span>
        <span
          className="text-orange-500 hover:scale-110 transition-transform"
          style={{
            textShadow:
              "3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000",
          }}
        >
          n
        </span>
        <span
          className="text-yellow-500 hover:scale-110 transition-transform"
          style={{
            textShadow:
              "3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000",
          }}
        >
          k
        </span>
        <span
          className="text-green-500 hover:scale-110 transition-transform"
          style={{
            textShadow:
              "3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000",
          }}
        >
          T
        </span>
        <span
          className="text-blue-500 hover:scale-110 transition-transform"
          style={{
            textShadow:
              "3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000",
          }}
        >
          h
        </span>
        <span
          className="text-indigo-500 hover:scale-110 transition-transform"
          style={{
            textShadow:
              "3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000",
          }}
        >
          i
        </span>
        <span
          className="text-purple-500 hover:scale-110 transition-transform"
          style={{
            textShadow:
              "3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000",
          }}
        >
          n
        </span>
        <span
          className="text-pink-500 hover:scale-110 transition-transform"
          style={{
            textShadow:
              "3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000",
          }}
        >
          k
        </span>
        <span
          className="text-purple-500 hover:scale-110 transition-transform"
          style={{
            textShadow:
              "3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000",
          }}
        >
          .
        </span>
        <span
          className="text-white hover:scale-110 transition-transform"
          style={{
            textShadow:
              "3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000",
          }}
        >
          i
        </span>
        <span
          className="text-white hover:scale-110 transition-transform"
          style={{
            textShadow:
              "3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000",
          }}
        >
          o
        </span>
      </h1>
      <Pencil
        className="mt-5 w-10 h-10 text-orange-600 -rotate-45 hover:-rotate-0 hover:scale-110  transition-transform cursor-pointer"
        strokeWidth={2.5}
      />
    </div>
  );
};

export default ColorfulLogo;
