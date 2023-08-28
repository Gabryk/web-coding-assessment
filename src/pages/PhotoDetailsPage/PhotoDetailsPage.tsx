import { useLocation, useParams } from "react-router-dom"
import { Segment, Image, Card, Icon } from "semantic-ui-react"
import { getPhotoDetails } from 'api/users';
import { useQuery } from '@tanstack/react-query';
import './styles.css'
import DimmerMessage from "components/DimmerMessage/DimmerMessage";


type PhotoDetailsProps = {
  photoId: string
}

const PhotoDetailsPage = () => {
  const { state } = useLocation()
  const { photoId } = useParams<PhotoDetailsProps>()

  const { data, status } = useQuery({ queryKey: ['photo-details', photoId], queryFn: () => getPhotoDetails(photoId ?? "") })

  let image = state?.image ?? data

  return <Segment className="photo-details-page" style={{ backgroundImage: `url('${image?.urls?.regular}')` }} loading={status === 'loading'}>
    <DimmerMessage active={status === 'error'} icon="frown outline" text="Something went wrong. Please try again later." />

    {image?.id ? (
      <Card centered>
        <Image
          src={image?.urls?.regular}
          size='medium'
          href={image?.urls?.full}
          target='_blank'
        />

        <Card.Content>
          <Card.Header>{`${image?.user?.first_name} ${image?.user?.last_name}`}</Card.Header>
          <Card.Meta>
            <span className='date'>Created in {new Date(image?.created_at).getUTCFullYear()} </span>
          </Card.Meta>

          <Card.Description>
            {image?.description}
          </Card.Description>
        </Card.Content>

        <Card.Content extra>
          <div>
            <Icon name='heart' />
            {image?.likes} Likes
          </div>
          <a href={image?.urls?.full} download>
            <Icon name='download' /> Download
          </a>
        </Card.Content>
      </Card>

    ) : null}
  </Segment>
}

export default PhotoDetailsPage