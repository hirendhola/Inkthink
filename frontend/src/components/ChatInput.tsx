const ChatInput = () => {
  return (
    <div className="bg-green-500 h-14 w-full">
      <input
        placeholder="Enter Guess"
        className="w-full h-full p-1.5 text-2xl text-black outline-none border-none focus:ring-0 focuc-outline-none"
      />
    </div>
  );
};

export default ChatInput;
