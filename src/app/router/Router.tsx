import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import LoginPage from "../../features/account/Login";
import PhotosessionList from "../../features/photosession/PhotosessionsList";
import CreatePhotosession from "../../features/photosession/CreatePhotosession";
import RequiredAuth from "./RequiredAuth";
import ServerError from "../errors/ServerError";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'photosessions/', element: <RequiredAuth />, children: [
                    {
                        path: 'get-photosession',
                        element: <PhotosessionList />
                    },
                    {
                        path: 'create-photosession',
                        element: <CreatePhotosession />
                    }
                ]
            },
            { path: 'login/', element: <LoginPage /> },
            { path: 'server-error', element: <ServerError /> },

            { path: '*', element: <h1>NOT FOUND KURWO</h1> },
        ]
    },
])