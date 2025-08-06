import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import paths from '../../router/paths';
import Loading from '../../components/loading';
import Welcome from '../../components/welcome';
import Heading from '../../components/heading';
import ScoreBoard from '../../components/score-board';
import { FOX_POSITION, DEFAULT_POSITION, TIME_LEFT } from '../../constants';
import { shuffleArray } from '../../utils';
import { useImageLoader } from '../../hooks/use-image-loader/use-image-loader';

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [positions, setPositions] = useState<number[]>(
    shuffleArray(DEFAULT_POSITION),
  );
  const [timeLeft, setTimeLeft] = useState<number>(TIME_LEFT);
  const [score, setScore] = useState<number>(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const { images, loading } = useImageLoader(isGameStarted);

  const handleOnImageClick = (position: number) => {
    if (position === FOX_POSITION) {
      setScore((prev) => prev + 1);
    } else {
      setScore((prev) => prev - 1);
    }
    setCurrentSetIndex((prev) => (prev + 1) % images.length);
    setPositions((prev) => shuffleArray(prev));
  };

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  const handleEndGame = () => {
    const currentScore = {
      name,
      score,
      date: new Date().toLocaleString(),
    };

    try {
      const raw = localStorage.getItem('scores');
      const scores: (typeof currentScore)[] = raw ? JSON.parse(raw) : [];

      scores.push(currentScore);
      localStorage.setItem('scores', JSON.stringify(scores));
      navigate(paths.scores);
    } catch (error) {
      console.error('Failed to save score:', error);
    }
  };

  useEffect(() => {
    if (timeLeft === 0 && !loading) {
      handleEndGame();
    }
  }, [timeLeft, loading]);

  useEffect(() => {
    if (loading || !isGameStarted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className="flex w-full min-h-screen justify-center items-center flex-col bg-gradient-to-br from-orange-50 to-yellow-100 p-4">
      <Heading />

      {isGameStarted ? (
        <div className="flex flex-col items-center">
          <ScoreBoard score={score} timeLeft={timeLeft} />
          {loading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-3 gap-2 w-[480px] h-[480px] bg-white p-4 rounded-xl shadow-md">
              {positions.map((position, index) => (
                <img
                  key={index}
                  src={images[currentSetIndex][position]}
                  alt={position === FOX_POSITION ? 'Fox' : 'Dog'}
                  onClick={() => handleOnImageClick(position)}
                  className="object-cover w-[140px] h-[140px] rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200"
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <Welcome
          value={name}
          onChange={(e) => setName(e.target.value)}
          handleStartGame={handleStartGame}
        />
      )}
    </div>
  );
};

export default Home;
