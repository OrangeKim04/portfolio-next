"use client";

import Giscus from "@giscus/react";
import { useThemeColors } from "@/contexts/ThemeContext";

export default function GiscusComments() {
  const { isDark } = useThemeColors();

  return (
    <div className="mt-10">
      <Giscus
        repo="OrangeKim04/portfolio-next"
        repoId="R_kgDOSywi0Q"
        category="General"
        categoryId="DIC_kwDOSywi0c4DAhpo"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={isDark ? "dark" : "light"}
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
