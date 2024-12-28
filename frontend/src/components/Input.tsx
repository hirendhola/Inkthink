interface InputProps {
  placeholder: string;
}

const Input = ({ placeholder }: InputProps) => {
  return (
    <input
      className="border-2 border-gray-300 p-3 text-xl rounded-lg text-black outline-none border-none focus:ring-0 focus:outline-none shadow-lg"
      placeholder={placeholder}
    />
  );
};

export default Input;
