import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useImageLoader } from './use-image-loader';

const mockDogUrl = 'https://dog.test/image.jpg';
const mockFoxUrl = 'https://fox.test/image.jpg';

globalThis.fetch = vi.fn();

const mockFetch = (url: string) => {
  if (url.includes('dog')) {
    return Promise.resolve({
      json: () => Promise.resolve({ message: mockDogUrl }),
    });
  }
  if (url.includes('fox')) {
    return Promise.resolve({
      json: () => Promise.resolve({ image: mockFoxUrl }),
    });
  }
  return Promise.reject(new Error('Unknown URL'));
};

const mockImageLoad = () => {
  vi.stubGlobal(
    'Image',
    class {
      src = '';
      onload: () => void = () => {};
      onerror: () => void = () => {};
      constructor() {
        setTimeout(() => this.onload(), 10);
      }
    },
  );
};

describe('useImageLoader', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fetch as any).mockImplementation(mockFetch);
    mockImageLoad();
  });

  it('loads and preloads images when active', async () => {
    const { result } = renderHook(() => useImageLoader(true));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.images.length).toBeGreaterThan(0);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.images.length).toBe(4);
    expect(result.current.images[0].length).toBe(9);
    expect(result.current.images[0][0]).toBe(mockDogUrl);
  });

  it('does not load images when inactive', () => {
    const { result } = renderHook(() => useImageLoader(false));
    expect(result.current.images).toEqual([]);
    expect(result.current.loading).toBe(true);
  });
});
