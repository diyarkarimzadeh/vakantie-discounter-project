interface IScoreBoard {
  score: number;
  timeLeft: number;
}

const ScoreBoard = ({ score, timeLeft }: IScoreBoard) => {
  return (
    <div className="flex flex-row justify-between w-full max-w-[450px] p-4 mb-4 bg-white rounded-xl shadow-md">
      <div className="flex flex-row gap-2 items-center text-gray-700">
        <p className="font-semibold">Score:</p>
        <p className="text-lg font-bold text-green-600">{score}</p>
      </div>
      <div className="flex flex-row gap-2 items-center text-gray-700">
        <p className="font-semibold">Time left:</p>
        <p className="text-lg font-bold text-red-600">{timeLeft}</p>
      </div>
    </div>
  );
};

export default ScoreBoard;
