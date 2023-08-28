import { Navigate, Route, Routes } from "react-router-dom";
import { routerType } from "types/router.types";
import UserPhotosPage from "pages/UserPhotosPage/UserPhotosPage";
import PhotoDetailsPage from "pages/PhotoDetailsPage/PhotoDetailsPage";

const paths: routerType[] = [
  {
    path: "user-photos",
    element: <UserPhotosPage />,
    title: "User Photos",
  },
  {
    path: "photo-details/:photoId",
    element: <PhotoDetailsPage />,
    title: "User Photos",
  },
];

const Router = () => {
  const pageRoutes = paths.map(({ path, title, element }: routerType) => {
    return <Route key={title} path={`/${path}`} element={element} />;
  });

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/user-photos" replace />} />
      {pageRoutes}
    </Routes>
  );
};

export default Router;
