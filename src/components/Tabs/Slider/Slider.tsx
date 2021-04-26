import React from "react";
import bem from "../../../helpers/bem";

export type SliderProps = {
  left: number;
  width: number;
};

function Slider({ left, width }: SliderProps) {
  return <div className="tabs-slider" style={{ left, width }} />;
}

export default Slider;
