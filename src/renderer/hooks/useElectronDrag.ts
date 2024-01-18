import { useEffect, useRef, useCallback } from "react";

export const useElectronDrag = () => {
  const offsetX = useRef(0);
  const offsetY = useRef(0);
  const electronWinPos = useRef(null);
  const isDragging = useRef(false);

  const handleMouseDown = useCallback(async (e) => {
    console.log("handleMouseDown");
    e.stopPropagation();
    e.preventDefault();
    const position = await window.api.getWinPosition();
    electronWinPos.current = position;
    isDragging.current = true;
    offsetX.current = e.screenX;
    offsetY.current = e.screenY;
  }, []);
  const handleMouseMove = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isDragging.current && electronWinPos.current) {
      requestAnimationFrame(() => {
        const x = e.screenX - offsetX.current + electronWinPos.current[0];
        const y = e.screenY - offsetY.current + electronWinPos.current[1];
        const pos = {
          x: x,
          y: y,
        };
        console.log(pos);
        window.api.dragWin(pos);
      });
    }
  }, []);
  const handleMouseUp = useCallback((e) => {
    isDragging.current = false;
  }, []);
  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
};
