import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { SortedScenes } from "../../types";
import Control from "./Control";
import { useAppDispatch } from "../reducers/hooks";
import { setControlVisibility } from "../reducers/appStateSlice";

interface ControlWindowProps {
  // Add a close button to the control
  sortedScenes: SortedScenes;
  styles: CSSStyleSheet[];
}

const ControlWindow = forwardRef(
  ({ sortedScenes, styles }: ControlWindowProps, ref) => {

    const dispatch = useAppDispatch();

    const windowRef = useRef<Window | null>(null);
    const containerElement: HTMLDivElement = document.createElement("div");

    useImperativeHandle(
      ref,
      function () {
        return {
          close() {
            windowRef.current?.close();
          },
        };
      },
      []
    );

    useEffect(() => {
      openWindowAndCopyStyles();

      return () => {
        windowRef.current?.close();
      };
    }, []);

    function openWindowAndCopyStyles() {
      const features = "width=400, height=500, left=300, top=200";
      windowRef.current = window.open("", "", features);
 
      windowRef.current?.document.body.appendChild(containerElement);

      styles.forEach((stylesheet) => {
        const css = stylesheet as CSSStyleSheet;

        if (stylesheet.href) {
          const newStyleElement = document.createElement("link");
          newStyleElement.rel = "stylesheet";
          newStyleElement.href = stylesheet.href;
          windowRef.current?.document.head.appendChild(newStyleElement);
        } else if (css && css.cssRules && css.cssRules.length > 0) {
          const newStyleElement = document.createElement("style");
          Array.from(css.cssRules).forEach((rule) => {
            newStyleElement.appendChild(document.createTextNode(rule.cssText));
          });
          windowRef.current?.document.head.appendChild(newStyleElement);
        }

        if (windowRef.current) windowRef.current.document.title = "Controller";
      });
    }

    function close() {
      windowRef.current?.close();
      dispatch(setControlVisibility(false));
    }

    return (
      <>
        {createPortal(
          <Control sortedScenes={sortedScenes} />,
          containerElement
        )}
      </>
    );
  }
);

  export default React.memo(ControlWindow);
