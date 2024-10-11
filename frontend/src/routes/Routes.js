import React, { Suspense } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import routesTemplates from "./index";
import PublicLayout from "../layouts/public/Layout";
import PageNotFound from "../views/errors/PageNotFound";
import { createMemoryHistory } from "history";

import Auth from "./Auth";
import Spinner from "../components/Spinner";

const AppRoutes = () => {
  const history = createMemoryHistory();

  return (
    <Suspense fallback={<Spinner />}>
      <BrowserRouter location={history.location} navigator={history}>
        <Routes>
          <Route
            path="*"
            element={<PublicLayout Component={PageNotFound} route={true} />}
          />
          {routesTemplates.map((routesTemplate) => {
            const {
              routes: appRoutes,
              template: Template,
              type,
            } = routesTemplate;

            return appRoutes.map((appRoute) => (
              <Route
                path={appRoute.path}
                key={appRoute.path}
                element={
                  <Auth
                    appRoute={appRoute}
                    Template={Template}
                    route={appRoute.path}
                    type={type}
                  />
                }
              />
            ));
          })}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRoutes;
