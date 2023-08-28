import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { Grid, Image, Loader } from "semantic-ui-react";
import { Basic } from "unsplash-js/dist/methods/photos/types";

interface PhotoDetail {
  image: Basic
}

const UserImage = ({ image }: PhotoDetail) => {
  const { urls, id } = image
  return (
    <Grid.Column mobile={16} tablet={8} computer={4} stretched>
      <Link to={`/photo-details/${id}`} relative="path" state={{ image }}>
        <Image size="small" src={urls.thumb} />
      </Link>
    </Grid.Column>
  );
};

interface UserPhotosProps {
  images: Basic[] | undefined;
  onLoadNext: () => void
  hasMore: boolean
}

const UserPhotos = ({ images = [], onLoadNext, hasMore }: UserPhotosProps) => {
  return (
    <Grid stackable className="users-list" container as={InfiniteScroll}
      next={onLoadNext}
      dataLength={images.length}
      hasMore={hasMore}
      loader={<Loader active />}>

      {images.map(image => (
        <UserImage key={image.id} image={image} />
      ))}
    </Grid>
  );
};

export default UserPhotos;
