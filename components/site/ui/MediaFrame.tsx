'use client';

import { Component, type ErrorInfo, type ReactNode, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Spline from '@splinetool/react-spline';

type MediaFrameProps = {
  src?: string;
  poster?: string;
  alt: string;
  caption?: string;
  ratio?: 'video' | 'square' | 'portrait' | 'wide';
  className?: string;
  fallbackLabel?: string;
  frameless?: boolean;
};

const ratioMap = {
  video: 'aspect-video',
  square: 'aspect-square',
  portrait: 'aspect-[4/5]',
  wide: 'aspect-[16/7]',
};

class SplineErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; onError: () => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

export default function MediaFrame({
  src,
  poster,
  alt,
  caption,
  ratio = 'video',
  className = '',
  fallbackLabel = 'Placeholder',
  frameless = false,
}: MediaFrameProps) {
  const frameRef = useRef<HTMLElement | null>(null);
  const isVideo = !!src && src.endsWith('.mp4');
  const isSplineScene = !!src && src.endsWith('.splinecode');
  const [shouldRenderSpline, setShouldRenderSpline] = useState(false);
  const [isSplineReady, setIsSplineReady] = useState(false);
  const [hasSplineError, setHasSplineError] = useState(false);
  const figureClassName = frameless
    ? className
    : `luxury-outline glass-panel overflow-hidden rounded-[2.2rem] ${className}`;

  useEffect(() => {
    if (!isSplineScene || !frameRef.current) {
      return;
    }

    const node = frameRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShouldRenderSpline(entry.isIntersecting);
      },
      {
        rootMargin: '240px 0px',
        threshold: 0.08,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [isSplineScene]);

  useEffect(() => {
    if (!isSplineScene || !shouldRenderSpline) {
      setIsSplineReady(false);
      return undefined;
    }

    if (hasSplineError) {
      return undefined;
    }

    const fallbackTimer = window.setTimeout(() => setIsSplineReady(true), 2200);

    return () => {
      window.clearTimeout(fallbackTimer);
    };
  }, [hasSplineError, isSplineScene, shouldRenderSpline]);

  useEffect(() => {
    if (!isSplineScene || !shouldRenderSpline) {
      return;
    }

    setHasSplineError(false);
  }, [isSplineScene, shouldRenderSpline]);

  return (
    <figure ref={frameRef} className={figureClassName}>
      <div
        className={`relative ${ratioMap[ratio]} ${frameless ? 'bg-transparent' : 'bg-[radial-gradient(circle_at_top,rgba(201,162,77,0.18),transparent_35%),linear-gradient(180deg,#121212,#050505)]'}`}
      >
        {isSplineScene && poster ? (
          <div className={`absolute inset-0 transition-opacity duration-500 ${isSplineReady && !hasSplineError ? 'opacity-0' : 'opacity-100'}`}>
            <Image
              src={poster}
              alt={alt}
              fill
              className="scale-[1.38] object-contain object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
            />
          </div>
        ) : null}
        {src ? (
          isVideo ? (
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={poster}
              aria-label={alt}
            >
              <source src={src} type="video/mp4" />
            </video>
          ) : isSplineScene && shouldRenderSpline && !hasSplineError ? (
            <div
              className={`h-full w-full transition-opacity duration-500 ${isSplineReady ? 'opacity-100' : 'opacity-0'} ${frameless ? 'bg-transparent' : 'bg-[radial-gradient(circle_at_top,rgba(201,162,77,0.12),transparent_36%),linear-gradient(180deg,#111,#060606)]'}`}
            >
              <SplineErrorBoundary
                onError={() => {
                  setHasSplineError(true);
                  setIsSplineReady(false);
                }}
              >
                <Spline scene={src} onLoad={() => setIsSplineReady(true)} />
              </SplineErrorBoundary>
            </div>
          ) : isSplineScene ? (
            <div className="h-full w-full bg-transparent" />
          ) : (
            <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          )
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="space-y-4 px-6 text-center">
              <p className="text-[11px] uppercase tracking-[0.42em] text-[#ddb25f]">{fallbackLabel}</p>
              <p className="max-w-xs text-sm leading-7 text-white/55">{alt}</p>
            </div>
          </div>
        )}
        {isSplineScene && shouldRenderSpline && !isSplineReady ? (
          <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-10">
            <div className="soft-glass-pill relative flex items-center gap-3 rounded-full px-4 py-3">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#ddb25f]" />
              <span className="text-[0.62rem] uppercase tracking-[0.22em] text-white/72">
                {hasSplineError ? 'Visual do app indisponível' : 'Carregando app 3D'}
              </span>
            </div>
          </div>
        ) : null}
        {!frameless ? <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/5" /> : null}
        {!frameless ? (
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        ) : null}
      </div>
      {!frameless && caption ? (
        <figcaption className="px-6 py-4 text-[10px] uppercase tracking-[0.28em] text-white/42">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
