import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatWithCommas, catchErrors } from '../utils';
import { getArtist, getRecommendationsForTracks } from '../spotify';
import TrackItem from './RecentTrackItem';
import Loader from './Loader';
import { Container, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import { theme, mixins, media, Main } from '../styles';
import { useParams } from 'react-router-dom';
const { colors, fontSizes, spacing } = theme;

const ArtistContainer = styled(Main)`
  ${mixins.flexCenter};
  flex-direction: column;
  text-align: center;
  padding: 30px;
  position:relative;
  overflow: hidden;
  justify-content:flex-end;
  min-height: 100%;
  height: 50vh;
  box-shadow: inset 0px -20px 10px rgba(0,0,0,1);
  >img{
    position:absolute;
    object-fit: cover;
    height:100%;
    top:0;
    scale: 1.1;
    z-index:-1;
    filter: blur(10px);
    -webkit-filter: blur(10px);
  }

  ${media.thone}{
    height: 60vh;
  }

`;
const Artwork = styled.div`

  border-radius: 100%;
  img {
    object-fit: cover;
    border-radius: 100%;
    width: 200px;
    height: 200px;
    ${media.tablet`
      width: 150px;
      height: 150px;
    `};
  }
`;
const ArtistName = styled.h1`
  font-size: 70px;
  margin-top: ${spacing.sm};
  ${media.tablet`
    font-size: 5vw;
  `};
`;
const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  margin-top: ${spacing.md};
  text-align: center;
`;
const Stat = styled.div``;
const Number = styled.div`
  color: ${colors.lightGrey};
  font-weight: 700;
  font-size: 35px;
  text-transform: capitalize;
  ${media.tablet`
    font-size: 14px;
  `};
`;

const NumLabel = styled.p`
  color: ${colors.white};
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${spacing.xs};
`;


const ReccomendedTracks = styled.div`
  flex-grow: 1;
  margin: 10px 20px;
  ${media.tablet`
    margin: 10px 20px;
  `};
`;




const ReccomendedTracklistHeading = styled.div `
margin-bottom: 20px;
align-items: center;
h2 {
  display: inline-block;
  margin: 0;
  font-size: 17px;
}
`

const Artist = props => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [recommendedTracks, setReccomendedTracks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getArtist(artistId);
      setArtist(data);
    };
    catchErrors(fetchData());
  }, [artistId]);


  useEffect(() => {
    const fetchData = async () => {
      if (artistId) {
        const { data } = await getRecommendationsForTracks('' ,artistId);
        setReccomendedTracks(data.tracks);
      }
    }
    catchErrors(fetchData());
  }, [artist]);

  return (
    <React.Fragment>
      {artist ? (
        <Container className="p-0" fluid>
        <ArtistContainer>
         
          <img src={artist.images[0].url} alt="Artist Artwork" />
          <Row>
            <Col className="d-flex justify-content-center align-items-center" xs={3}>
            <Stat>
                <Number>{formatWithCommas(artist.followers.total)}</Number>
                <NumLabel>Followers</NumLabel>
              </Stat>
            </Col>
            <Col className="d-flex justify-content-center align-items-center" xs={6}>
          <Artwork>
            <img src={artist.images[0].url} alt="Artist Artwork" />
          </Artwork>
          </Col>
        <Col className="d-flex justify-content-center align-items-center" xs={3}>
        {artist.popularity && (
                <Stat>
                  <Number>{artist.popularity}%</Number>
                  <NumLabel>Popularity</NumLabel>
                </Stat>
              )}
        
        </Col>
       <Col xs={12}><ArtistName>{artist.name}</ArtistName></Col>
        </Row>
      
        </ArtistContainer>
    
         <ReccomendedTracks>
         <ReccomendedTracklistHeading>
                <h2>Reccomended Tracks</h2>
              </ReccomendedTracklistHeading>
       <Row>
        <ul>
              {recommendedTracks &&
            
                  recommendedTracks.map((track, i) =><Col xs={12}> <TrackItem track={track} key={i} /> </Col>)}
          </ul>
          </Row>   

            </ReccomendedTracks>
            {/* <Stats>


              {/* {artist.genres && (
                <Stat>
                  <Number>
                    {artist.genres.map(genre => (
                      <Genre key={genre}>{genre}</Genre>
                    ))}
                  </Number>
                  <NumLabel>Genres</NumLabel>
                </Stat>
              )} 
              
            </Stats> */}
           
           
            </Container>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

Artist.propTypes = {
  artistId: PropTypes.string,
};

export default Artist;
