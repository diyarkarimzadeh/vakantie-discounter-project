const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-4 p-6 bg-white rounded-xl shadow-md w-[480px]">
      <svg
        className="animate-spin h-6 w-6 text-orange-500 mb-3"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="60"
          strokeDashoffset="20"
        />
      </svg>
      <p className="text-gray-700 text-base font-medium">
        Loading images, please wait...
      </p>
    </div>
  );
};

export default Loading;
