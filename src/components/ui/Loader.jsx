import { Spin } from "antd";
import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <Spin size="large" />
    </div>
  );
};

export default Loader;
