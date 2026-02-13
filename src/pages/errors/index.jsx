import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/designers");
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Result
        status="404"
        title="404"
        subTitle="Səhifə tapılmadı"
        extra={
          <Button type="primary" size="large" onClick={handleRedirect}>
            Əsas səhifəyə qayıt
          </Button>
        }
      />
    </div>
  );
};

export default Error404;
