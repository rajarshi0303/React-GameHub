import React from "react";
import { Suspense, useRef } from "react";
import useIntersectionObserver from "./useIntersectionObserver";
import LoadingDots from "./LoadingDots";

export default function LazyComponent({ children, threshold = 0, className }) {
  const ref = useRef();
  const entered = useIntersectionObserver(ref, threshold);
  console.log("re-render");
  return (
    <div ref={ref} className={className}>
      {!entered && (
        <div className="min-h-[400px] text-white text-2xl">
          <LoadingDots />
        </div>
      )}
      {entered && <Suspense fallback={<LoadingDots />}>{children}</Suspense>}
    </div>
  );
}
