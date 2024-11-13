import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

interface ControlProps {
  setId: (sceneId: string) => void;
  // Add a close button to the control
  setVisibility: (isVisible: boolean) => void;
}

const Control = forwardRef(({setId, setVisibility}: ControlProps, ref) => {
  console.log("control rendered")

  const windowRef = useRef<Window | null>(null);
  const containerElement: HTMLDivElement = document.createElement("div");

  useImperativeHandle(ref, function() {
    return {
      close() { windowRef.current?.close()}
    }
  }, [])

  useEffect(() => {
    const features = "width=800, height=500, left=300, top=200";
    windowRef.current = window.open("", "", features);
    
    windowRef.current?.document.body.appendChild(containerElement);

    return () => {
      windowRef.current?.close()
    }
  }, [])

  function close () {
    windowRef.current?.close()
    setVisibility(false)
  }

  return (
    <>
      {createPortal(
        <div>
          <h1>Controller!</h1>
          <input
            type="text"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </div>,
        containerElement
      )}
    </>
  );

})

export default React.memo(Control);