import { useState, SyntheticEvent, useEffect } from "react";
import {
  Container,
  Dimmer,
  DropdownProps,
  Form,
  Loader,
  Segment,
} from "semantic-ui-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { ColorId } from "unsplash-js";
import UserPhotos from "components/UsersPhotos/UserPhotos";
import DimmerMessage from "components/DimmerMessage/DimmerMessage";
import { getUserPhotosApi } from "api/users";
import { SEARCH_COLORS } from "constants/unsplash";
import "./styles.css";

type ColorOption = {
  key: string;
  text: string;
  value: ColorId;
};
const colorOptions: ColorOption[] = SEARCH_COLORS.map((color) => ({
  key: color,
  text: color,
  value: color as ColorId,
}));

const UserPhotosPage = () => {
  const [searchColor, setSearchColor] = useState(colorOptions[0]);

  const { status, data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["users-photos", searchColor.value],
    queryFn: ({ pageParam = 1 }) =>
      getUserPhotosApi(searchColor.value, pageParam),
    getNextPageParam: ({ page, total_pages }) =>
      page + 1 <= total_pages ? page + 1 : undefined,
    getPreviousPageParam: ({ page }) => page - 1,
  });

  const handleColorChange = (
    e: SyntheticEvent<HTMLElement>,
    { value }: DropdownProps
  ) => {
    if (typeof value !== "string") return;

    const color = colorOptions.find((color) => color.value === value);
    if (!color) return;

    return setSearchColor(color);
  };

  const isLoading = status === "loading";
  const items =
    data?.pages?.reduce(
      (items, page) => [...items, ...page.results],
      [] as Basic[]
    ) ?? [];
  const isEmpty = !isLoading && !data?.pages[0]?.results?.length;

  useEffect(() => {
    if (!hasNextPage || isLoading) return;
    const el = document.querySelector("#user-photos-page") as HTMLElement;
    if (el?.scrollHeight !== el?.offsetHeight) return;

    fetchNextPage();
  }, [status, searchColor]);

  return (
    <Container className="user-photos-page" id="user-photos-page">
      <Form>
        <Form.Select
          fluid
          label="Color"
          onChange={handleColorChange}
          options={colorOptions}
          placeholder="Color"
          value={searchColor.value}
        />
      </Form>

      <Dimmer.Dimmable dimmed={isLoading} as={Segment}>
        <Loader active={isLoading} />

        <DimmerMessage
          active={isEmpty}
          icon="meh"
          text="Apparently there are no good matches for your search!"
        />
        <DimmerMessage
          active={status === "error"}
          icon="frown outline"
          text="Something went wrong. Please try again later."
        />

        <UserPhotos
          hasMore={!!hasNextPage}
          images={items}
          onLoadNext={fetchNextPage}
        />
      </Dimmer.Dimmable>
    </Container>
  );
};

export default UserPhotosPage;
