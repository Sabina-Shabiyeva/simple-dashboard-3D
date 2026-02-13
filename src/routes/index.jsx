import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Loader from "@/components/ui/Loader";

const Designers = lazy(() => import("@/pages/designers"));
const Editor = lazy(() => import("@/pages/editor"));
const ErrorPage = lazy(() => import("@/pages/errors"));

import Layout from "@/layout/wrapper";

const AppRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/designers" replace />} />
          <Route path="designers" element={<Designers />} />
          <Route path="editor" element={<Editor />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
