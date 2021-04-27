import React from "react";

export type SliderProps = {
  left: number;
  width: number;
};

function Slider({ left, width }: SliderProps) {
  return <div className="tabs-slider" style={{ left, width }} />;
}

export default Slider;
