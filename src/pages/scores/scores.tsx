import { useNavigate } from 'react-router';
import paths from '../../router/paths';

type TScore = {
  name: string;
  score: number;
  date: string;
};

const Scores = () => {
  const navigate = useNavigate();
  const rawScores = localStorage.getItem('scores');

  let scores: TScore[] = [];

  if (rawScores) {
    try {
      scores = JSON.parse(rawScores).sort(
        (a: TScore, b: TScore) => b.score - a.score,
      );
    } catch (error) {
      console.error('Failed to parse scores from localStorage:', error);
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Click the Fox! Game Leaderboard
      </h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Rank
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Score
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {scores.map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2 text-sm text-gray-800 font-medium">
                  {index + 1}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.name}</td>
                <td className="px-4 py-2 text-sm text-green-600 font-semibold">
                  {item.score}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => navigate(paths.home)}
        className="px-4 py-2 mt-6 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors disabled:bg-gray-300"
      >
        Play Again!
      </button>
    </div>
  );
};

export default Scores;
