import type { ChangeEventHandler } from 'react';

interface IWelcome {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  handleStartGame: () => void;
}

const Welcome = ({ value, onChange, handleStartGame }: IWelcome) => {
  return (
    <div className="flex flex-row justify-between w-full max-w-[450px] p-4 mb-4 bg-white rounded-xl shadow-md">
      <input
        type="text"
        placeholder="Enter your name"
        className="flex-1 mr-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
        value={value}
        onChange={onChange}
      />
      <button
        onClick={handleStartGame}
        disabled={!value.trim()}
        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors disabled:bg-gray-300"
      >
        Play
      </button>
    </div>
  );
};

export default Welcome;
