/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import ErrorLayout from "./layouts/Error";
import DashboardLayout from "./layouts/Dashboard";
import Login from "./views/Login/index";

export default [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/login" />,
  },
  {
    path: "/errors",
    component: ErrorLayout,
    routes: [
      {
        path: "/errors/error-401",
        exact: true,
        component: lazy(() => import("src/views/Error401")),
      },
      {
        path: "/errors/error-404",
        exact: true,
        component: lazy(() => import("src/views/Error404")),
      },
      {
        path: "/errors/error-500",
        exact: true,
        component: lazy(() => import("src/views/Error500")),
      },
      {
        component: () => <Redirect to="/errors/error-404" />,
      },
     
    ],
  },
  {
    path: "/login",
    exact: true,
    component: Login,
  },
  {
    route: "*",
    component: DashboardLayout,
    routes: [
      {
        path: "/management/Orders",
        exact: true,
        component: lazy(() =>
          import("src/views/Management/Orders")
        ),
      },
      {
        component: () => <Redirect to="/errors/error-404" />,
      },
    ],
  },
];
