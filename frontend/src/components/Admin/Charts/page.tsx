"use client";
import React from "react";
import ChartOne from "./ChartOne";
import ChartTwo from "./ChartTwo";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";

const Chart: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
      </div>
    </>
  );
};

export default Chart;
