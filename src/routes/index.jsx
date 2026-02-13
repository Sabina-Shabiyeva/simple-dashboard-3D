import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
          <Route index element={<Designers />} />
          <Route path="designers" element={<Designers />} />
          <Route path="editor" element={<Editor />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
