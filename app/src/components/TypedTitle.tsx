"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";

export function TypedTitle() {
  const el = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    if (el.current) {
      typed.current = new Typed(el.current, {
        strings: [
          "emil<b>ismayilzada</b>",
          "<b>emlsm</b>.<b>tech</b>",
        ],
        typeSpeed: 40,
        backSpeed: 40,
        backDelay: 4000,
        loop: true,
        showCursor: true,
        cursorChar: "|",
      });
    }

    return () => {
      typed.current?.destroy();
    };
  }, []);

  return (
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-mono text-foreground">
      <span ref={el}></span>
    </h1>
  );
}
