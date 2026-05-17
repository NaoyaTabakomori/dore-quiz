import { useCallback, useEffect, useRef, useState } from 'react';

type PlayOptions = {
  loop?: boolean;
  volume?: number;
};

type WebkitWindow = Window & typeof globalThis & {
  webkitAudioContext?: typeof AudioContext;
};

function createAudio(src: string, options?: PlayOptions): HTMLAudioElement {
  const audio = new Audio(src);
  audio.preload = 'auto';
  audio.loop = options?.loop ?? false;
  audio.volume = options?.volume ?? 1;
  return audio;
}

async function safePlay(audio: HTMLAudioElement): Promise<boolean> {
  try {
    audio.currentTime = 0;
    await audio.play();
    return true;
  } catch (error) {
    console.warn('Audio playback skipped:', audio.src, error);
    return false;
  }
}

export function useAudio(bgmUrl: string, correctUrl: string, wrongUrl: string) {
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferCacheRef = useRef<Map<string, AudioBuffer>>(new Map());
  const [isBgmPlaying, setIsBgmPlaying] = useState(false);

  const getAudioContext = useCallback(() => {
    if (audioContextRef.current) {
      return audioContextRef.current;
    }

    const AudioContextClass = window.AudioContext ?? (window as WebkitWindow).webkitAudioContext;
    if (!AudioContextClass) {
      return null;
    }

    audioContextRef.current = new AudioContextClass();
    return audioContextRef.current;
  }, []);

  const unlockAudio = useCallback(() => {
    const audioContext = getAudioContext();
    if (!audioContext) {
      return;
    }

    void audioContext.resume().then(() => {
      const source = audioContext.createBufferSource();
      source.buffer = audioContext.createBuffer(1, 1, audioContext.sampleRate);
      source.connect(audioContext.destination);
      source.start(0);
    }).catch((error) => {
      console.warn('Audio unlock skipped:', error);
    });
  }, [getAudioContext]);

  const playWithAudioContext = useCallback(async (src: string, volume: number) => {
    const audioContext = getAudioContext();
    if (!audioContext) {
      return false;
    }

    try {
      await audioContext.resume();

      let buffer = audioBufferCacheRef.current.get(src);
      if (!buffer) {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        buffer = await audioContext.decodeAudioData(await response.arrayBuffer());
        audioBufferCacheRef.current.set(src, buffer);
      }

      const source = audioContext.createBufferSource();
      const gain = audioContext.createGain();
      gain.gain.value = volume;
      source.buffer = buffer;
      source.connect(gain);
      gain.connect(audioContext.destination);
      source.start(0);
      return true;
    } catch (error) {
      console.warn('AudioContext playback skipped:', src, error);
      return false;
    }
  }, [getAudioContext]);

  const playOneShot = useCallback((src: string, volume: number) => {
    void (async () => {
      const played = await safePlay(createAudio(src, { volume }));
      if (!played) {
        await playWithAudioContext(src, volume);
      }
    })();
  }, [playWithAudioContext]);

  const startBgm = useCallback(async () => {
    if (!bgmRef.current) {
      bgmRef.current = createAudio(bgmUrl, { loop: true, volume: 0.38 });
    }

    const played = await safePlay(bgmRef.current);
    setIsBgmPlaying(played);
  }, [bgmUrl]);

  const stopBgm = useCallback(() => {
    if (bgmRef.current) {
      bgmRef.current.pause();
      bgmRef.current.currentTime = 0;
    }

    setIsBgmPlaying(false);
  }, []);

  const playCorrect = useCallback(() => {
    playOneShot(correctUrl, 0.8);
  }, [correctUrl, playOneShot]);

  const playWrong = useCallback(() => {
    playOneShot(wrongUrl, 0.9);
  }, [playOneShot, wrongUrl]);

  const playQuestion = useCallback((questionAudioUrl?: string) => {
    if (!questionAudioUrl) {
      return;
    }

    playOneShot(questionAudioUrl, 0.95);
  }, [playOneShot]);

  useEffect(() => {
    return () => {
      stopBgm();
      void audioContextRef.current?.close();
    };
  }, [stopBgm]);

  return {
    isBgmPlaying,
    unlockAudio,
    startBgm,
    stopBgm,
    playCorrect,
    playWrong,
    playQuestion,
  };
}
