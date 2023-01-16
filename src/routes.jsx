import * as React from "react";

import { useRoutes, Navigate } from "react-router-dom";

import {Home,Calendar,Tasks,Charts,People,SellingPage} from "./pages";


export default function Router() {
    const routing = [
        { path: "/", element: <Home /> },
        { path: "calendar", element: <Calendar /> },
        { path: "tasks", element: <Tasks /> },
        { path: "charts", element: <Charts /> },
        { path: "selling", element: <SellingPage /> },
        { path: "People", element: <People /> },
        { path: "*", element: <Navigate to="/" replace /> },
    ];
    return useRoutes(routing);
}