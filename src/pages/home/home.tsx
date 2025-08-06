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
  const [images, setImages] = useState<string[]>([]);
  const [positions, setPositions] = useState<number[]>(
    shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8]),
  );
  const [foxPosition, setFoxPosition] = useState<number>(8);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [score, setScore] = useState<number>(0);

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
    const dogUrls = await Promise.all(
      Array.from({ length: 8 }).map(async () => await fetchDogImages()),
    );

    const foxUrl = await Promise.all(
      Array.from({ length: 1 }).map(async () => await fetchFoxImage()),
    );

    const loadPromises: Promise<string>[] = [...dogUrls, ...foxUrl].map(
      (url) =>
        new Promise<string>((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = () => {
            resolve(url);
          };
          img.onerror = reject;
        }),
    );

    const loadedImages: string[] = await Promise.all(loadPromises);
    setImages(loadedImages);
    setLoading(false);
  };

  const handleOnClick = (position: number) => {
    console.log(position);
    if (position === foxPosition) {
      setScore((prev) => prev + 1);
    } else {
      setScore((prev) => prev - 1);
    }
    setPositions((prev) => shuffleArray(prev));
  };

  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate(paths.scores);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [loading]);

  console.log(images);

  return (
    <div className="flex w-[100%] h-[100vh] justify-center items-center flex-col">
      <div>
        <h1>Click the Fox! Game</h1>
      </div>
      <div className="flex flex-row justify-between w-[450px] p-2">
        <div className="flex flex-row gap-1">
          <p>Score:</p>
          <p>{score}</p>
        </div>
        <div className="flex flex-row gap-1">
          <p>Time left:</p>
          <p>{timeLeft}</p>
        </div>
      </div>

      <div className="flex items-center flex-row flex-wrap w-[450px] h-[450px] justify-center">
        {positions.map((position, index) => (
          <img
            className="object-cover w-[150px] h-[150px]"
            key={index}
            src={images[position]}
            width="300px"
            height="300px"
            onClick={() => handleOnClick(position)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
