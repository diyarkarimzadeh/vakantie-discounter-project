import { useState, useEffect } from 'react';
import { DOG_BASE_API, FOX_BASE_API } from '../../constants';

const fetchDogImage = async (): Promise<string> => {
  const response = await fetch(DOG_BASE_API);
  const data = await response.json();
  return data.message;
};

const fetchFoxImage = async (): Promise<string> => {
  const response = await fetch(FOX_BASE_API);
  const data = await response.json();
  return data.image;
};

const preloadImage = (url: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(url);
    img.onerror = reject;
  });

export function useImageLoader(isActive: boolean) {
  const [images, setImages] = useState<string[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isActive) return;

    const loadImages = async () => {
      setLoading(true);

      try {
        const imageSets = await Promise.all(
          Array.from({ length: 4 }).map(async () => {
            const dogs = await Promise.all(
              Array.from({ length: 8 }).map(fetchDogImage),
            );
            const fox = await fetchFoxImage();
            return [...dogs, fox];
          }),
        );

        const loadedImageSets: string[][] = await Promise.all(
          imageSets.map((set) => Promise.all(set.map(preloadImage))),
        );

        setImages(loadedImageSets);
      } catch (error) {
        console.error('Image loading failed:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [isActive]);

  return { images, loading };
}
