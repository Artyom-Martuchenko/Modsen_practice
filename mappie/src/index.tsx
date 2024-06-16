import React from 'react';
import {createRoot} from "react-dom/client";
import {App} from './components/App/App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Suspense} from "react";

const root = document.getElementById('root')

if(!root) {
    throw new Error('root not found')
}

const container = createRoot(root)

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/about',
                element:  <Suspense fallback={'Loading...'}><h1>Bye</h1></Suspense>
            },
            {
                path: '/shop',
                element: <Suspense fallback={'Loading...'}><h1>hello</h1></Suspense>
            },
        ]
    },
]);

container.render(
    <RouterProvider router={router} />
)