import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import paths from '../../router/paths';

const shuffleArray = <T,>(array: T[]): T[] => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [images, setImages] = useState<string[][]>([[]]);
  const [positions, setPositions] = useState<number[]>(
    shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8]),
  );
  const FOX_POSITION = 8;
  const [loading, setLoading] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [score, setScore] = useState<number>(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const fetchDogImages = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      return data.message;
    } catch (e) {
      console.error(e);
    }
  };

  const fetchFoxImage = async () => {
    try {
      const response = await fetch('https://randomfox.ca/floof/');
      const data = await response.json();
      return data.image;
    } catch (e) {
      console.error(e);
    }
  };

  const loadImages = async () => {
    const imageSets = await Promise.all(
      Array.from({ length: 4 }).map(async () => {
        const dogs = await Promise.all(
          Array.from({ length: 8 }).map(fetchDogImages),
        );
        const fox = await fetchFoxImage();
        const images = [...dogs, fox];
        return images;
      }),
    );

    const loadPromises: Promise<string>[][] = imageSets.map((imageSet) =>
      imageSet.map(
        (url) =>
          new Promise<string>((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
              resolve(url);
            };
            img.onerror = reject;
          }),
      ),
    );

    const loadedImages: string[][] = await Promise.all(
      loadPromises.map((promisesInSet) => Promise.all(promisesInSet)),
    );

    setImages(loadedImages);
    setLoading(false);
  };

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
      date: new Date().toLocaleString(),
      score,
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
    if (isGameStarted) {
      loadImages();
    }
  }, [isGameStarted]);

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
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-orange-600 drop-shadow-sm">
          Click the Fox! Game
        </h1>
      </div>

      {isGameStarted ? (
        <div className="flex flex-col items-center">
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
          {loading ? (
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
          ) : (
            <div className="grid grid-cols-3 gap-2 w-[480px] h-[480px] bg-white p-4 rounded-xl shadow-md">
              {positions.map((position, index) => (
                <img
                  key={index}
                  src={images[currentSetIndex][position]}
                  alt="fox"
                  onClick={() => handleOnImageClick(position)}
                  className="object-cover w-[140px] h-[140px] rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200"
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-row justify-between w-full max-w-[450px] p-4 mb-4 bg-white rounded-xl shadow-md">
          <input
            type="text"
            placeholder="Enter your name"
            className="flex-1 mr-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={handleStartGame}
            disabled={!name.trim()}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors disabled:bg-gray-300"
          >
            Play
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
