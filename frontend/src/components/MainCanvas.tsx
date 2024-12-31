/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState, useEffect } from "react";
import { Eraser, Trash2, Redo, Undo } from "lucide-react";

interface MainCanvasProps {
  onDraw: (data: any) => void;
  drawData: any;
}

const MainCanvas = ({ onDraw, drawData }: MainCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [isErasing, setIsErasing] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.lineCap = "round";
        const initialState = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        setHistory([initialState]);
        setCurrentStep(0);
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.strokeStyle = isErasing ? "white" : brushColor;
        context.lineWidth = isErasing ? 35 : brushSize;
      }
    }
  }, [brushColor, brushSize, isErasing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.strokeStyle = drawData?.color;
        context.lineWidth = drawData?.size;
        context.beginPath();
        context.moveTo(drawData?.startX, drawData?.startY);
        context.lineTo(drawData?.endX, drawData?.endY);
        context.stroke();
      }
    }
  }, [drawData]);

  useEffect(() => {
    setIsErasing(false);
  }, [brushColor]);

  const startDrawing = (event: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.beginPath();
        context.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
        setIsDrawing(true);
      }
    }
  };

  const draw = (event: React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
        context.stroke();
      }
    }
    const data = {
      type: "draw",
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
      brushColor,
      brushSize,
      isErasing,
    };

    onDraw(data);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveState();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        setHistory([]);
        setCurrentStep(-1);
      }
    }
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const newHistory = history.slice(0, currentStep + 1);
        setHistory([...newHistory, imageData]);
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const undo = () => {
    if (currentStep > 0) {
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext("2d");
        if (context) {
          setCurrentStep(currentStep - 1);
          context.putImageData(history[currentStep - 1], 0, 0);
        }
      }
    }
  };

  const redo = () => {
    if (currentStep < history.length - 1) {
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext("2d");
        if (context) {
          setCurrentStep(currentStep + 1);
          context.putImageData(history[currentStep + 1], 0, 0);
        }
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center w-full h-full"
    >
      <div className="absolute flex gap-2 mb-2 top-0 z-10 w-[95%] mt-2 items-center justify-center p-1 bg-slate-200 rounded-[1rem] shadow-slate-400 shadow-2xl ">
        <button
          type="button"
          className="bg-[#000000] w-7 h-7 rounded-full z-10"
          onClick={() => {
            setBrushColor("#000000");
            setIsErasing(false);
          }}
        ></button>
        <button
          type="button"
          className="bg-[#6b7280] w-7 h-7 rounded-full z-10"
          onClick={() => {
            setBrushColor("#6b7280");
            setIsErasing(false);
          }}
        ></button>
        <button
          type="button"
          className="bg-[#ef4444] w-7 h-7 rounded-full z-10"
          onClick={() => {
            setBrushColor("#ef4444");
            setIsErasing(false);
          }}
        ></button>
        <button
          type="button"
          className="bg-[#3b82f6] w-7 h-7 rounded-full z-10"
          onClick={() => {
            setBrushColor("#3b82f6");
            setIsErasing(false);
          }}
        ></button>
        <button
          type="button"
          className="bg-[#22c55e] w-7 h-7 rounded-full z-10"
          onClick={() => {
            setBrushColor("#22c55e");
            setIsErasing(false);
          }}
        ></button>
        <button
          type="button"
          className="bg-[#eab308] w-7 h-7 rounded-full z-10"
          onClick={() => {
            setBrushColor("#eab308");
            setIsErasing(false);
          }}
        ></button>
        <button
          type="button"
          className="bg-[#a855f7] w-7 h-7 rounded-full z-10"
          onClick={() => {
            setBrushColor("#a855f7");
            setIsErasing(false);
          }}
        ></button>
        <input
          type="color"
          value={brushColor}
          placeholder="Brush Color"
          onChange={(e) => {
            setBrushColor(e.target.value);
            setIsErasing(false);
          }}
          className="border p-0.5 rounded-lg border-black"
        />
        <select
          value={brushSize}
          onChange={(e) => {
            setBrushSize(Number(e.target.value));
          }}
          className="border p-1 text-black rounded-full"
        >
          <option value={2}>2</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
        <button
          onClick={() => setIsErasing(!isErasing)}
          className={`border p-0 ${
            isErasing ? "bg-black" : "bg-gray-400"
          } rounded-full`}
        >
          <Eraser className="w-9 h-9 p-1.5" />
        </button>
        <button onClick={clearCanvas} className="p-0 rounded-full">
          <Trash2 className="w-9 h-9 p-1.5 hover:bg-black bg-gray-400 rounded-full" />
        </button>
        <button
          onClick={undo}
          className={`p-2 bg-gray-400 hover:bg-black rounded-full ${
            currentStep <= 0 ? "cursor-not-allowed" : ""
          }`}
          disabled={currentStep <= 0}
        >
          <Undo />
        </button>
        <button
          onClick={redo}
          className={`p-2 bg-gray-400 hover:bg-black rounded-full ${
            currentStep >= history.length - 1 ? "cursor-not-allowed" : ""
          }`}
          disabled={currentStep >= history.length - 1}
        >
          <Redo />
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className="border w-full h-full"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      ></canvas>
    </div>
  );
};

export default MainCanvas;
