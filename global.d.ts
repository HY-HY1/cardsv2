// global.d.ts
import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "math-field": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        value?: string;
        getValue?: () => string;
        setValue?: (val: string) => void;
        virtualKeyboardMode?: "auto" | "onfocus" | "off";
        smartFence?: boolean;
        // add other props if needed
      };
    }
  }
}
