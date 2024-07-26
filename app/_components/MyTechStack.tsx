const MyTechStack: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex items-center space-x-2 px-4 py-2 m-1 bg-white border rounded-full shadow-sm hover:bg-gray-100">
      <span>{text}</span>
    </div>
  );
};

export default MyTechStack;
