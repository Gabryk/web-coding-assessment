import { ColorId, createApi } from "unsplash-js";
import { ACCESS_KEY } from "constants/unsplash";
import { Photos } from "unsplash-js/dist/methods/search/types/response";

const unsplash = createApi({
  accessKey: ACCESS_KEY,
});

interface UserPhotosRespose extends Photos {
  page: number;
}

export const getUserPhotosApi = (
  color: ColorId,
  page = 0,
  perPage = 8
): Promise<UserPhotosRespose> => {
  return unsplash.search
    .getPhotos({
      query: "*",
      page,
      color,
      perPage,
    })
    .then((result) => {
      if (result.errors) throw result.errors;

      return { ...result.response, page };
    });
};

export const getPhotoDetails = (photoId: string) => {
  if (!photoId) return Promise.reject("No provided photo id");

  return unsplash.photos.get({ photoId }).then((result) => {
    if (result.errors) throw result.errors;

    return result.response;
  });
};
