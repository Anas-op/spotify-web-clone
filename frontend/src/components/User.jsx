import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserInfo } from "../spotify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { catchErrors } from "../utils";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { animated, useSpring } from "react-spring";
import { useScroll } from "react-use-gesture";

import Loader from "./Loader";
import TopTrackItem from "./TopTrackItem";

import IconUser from "./icons/IconUser";
import IconInfo from "./icons/IconInfo";
import styled from "styled-components";
import { theme, mixins, media, Main } from "../styles";
import RecentlyPlayed from "./RecentlyPlayed";

const { colors, fontSizes, spacing } = theme;

const clamp = (value) => {
  if (value > 0) {
    return value > 30 ? 30 : value;
  } else {
    return value < -30 ? -30 : value;
  }
};

const Header = styled.header`
  ${mixins.flexCenter};
  flex-direction: column;
  position: relative;
`;
const Avatar = styled(Link)`
  width: 45px;
  height: 45px;
  position: absolute;
  right: 0;
  img {
    border-radius: 100%;
  }
   ${media.tablet`
    position:relative;
  `};
`;
const NoAvatar = styled.div`
  border: 2px solid currentColor;
  border-radius: 100%;
  padding: ${spacing.md};
`;
const UserName = styled.span``;
const Name = styled.h1`
  font-size: 70px;
  font-weight: 700;
  margin: 0;
  ${media.tablet`
    font-size: 40px;
  `};
  ${media.phablet`
    font-size: 7vw;
  `};
`;
const Heading = styled.h1`
  font-size: 40px;
  font-weight: 700;
  margin: 0;
  color: #979797;
  ${media.tablet`
  font-size: 16px;
`};
  ${media.phablet`
  font-size: 4vw;
`};
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin-top: ${spacing.base};
`;
const Stat = styled.div`
  text-align: center;
`;
const Number = styled.div`
  color: ${colors.green};
  font-weight: 700;
  font-size: ${fontSizes.md};
`;
const NumLabel = styled.p`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${spacing.xs};
`;
const LogoutButton = styled.a`
  background-color: transparent;
  color: ${colors.white};
  border: 1px solid ${colors.white};
  border-radius: 30px;
  margin-top: 30px;
  padding: 12px 30px;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  &:hover,
  &:focus {
    background-color: ${colors.white};
    color: ${colors.black};
  }
`;

const SearchBar = styled.div`
  width: 300px;
  position:absolute;
  right: 10px;
  background-color: transparent;
  border: 1px solid #979797;
  border-radius: 10px;
  height: 40px;
  display: flex;
  opacity: 0.5;
  align-items: center;
  margin-right: 50px;
  justify-content: center;
  & input {
    width: 100%;
    padding: 10px;
    background-color: transparent;
    border-radius: 10px;
    border: 0;
    font-size: 13px;
    color: #979797;
  }
  & span .search-icon {
    margin-right: 15px;
    color: #979797;
  }

  ${media.tablet`
  position: relative;
  width: 100%;
  margin-top: 10px;
  margin-right: 0;
  right: 0;
`};
  
`;

const Preview = styled.section`
  // display: grid;
  // grid-template-columns: 1fr 1fr;
  // grid-gap: 70px;
  width: 100%;
  margin-top: 40px;
  ${media.tablet`
    display: block;
    margin-top: 30px;
  `};
`;
const Tracklist = styled.div`
  ${media.tablet`
    &:last-of-type {
      margin-top: 30px;
      
    }
  `};
`;
const TracklistHeading = styled.div`
  ${mixins.flexBetween};
  margin-bottom: 20px;
  align-items: center;
  h2 {
    display: inline-block;
    margin: 0;
    font-size: 17px;
  }
`;

const RecentTracklist = styled.div`
  ${media.tablet`
    &:last-of-type {
      margin-top: 0px;
    }
  `};
`;

const RecentTracklistHeading = styled.div`
  ${mixins.flexBetween};
  margin-bottom: 20px;
  align-items: center;
  h2 {
    display: inline-block;
    margin: 0;
    font-size: 17px;
  }
`;

const MoreButton = styled(Link)`
  text-align: center;
  white-space: nowrap;
  color: #979797;
  font-weight: 300;
  ${media.phablet`
    font-size: 12px;
  `};
`;
const Mask = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
  svg {
    width: 25px;
  }
`;
const Artist = styled.div`
  margin-bottom: ${spacing.md};
  display: flex !important;
  flex-direction: column;
  text-align: center;
  width: fit-content !important;
  justify-content: center;
  ${media.tablet`
    margin-bottom: ${spacing.md};
  `};
`;
const ArtistArtwork = styled(Link)`
  display: flex !important;
  position: relative;
  justify-content: center;
  align-items: center;
  width: auto;
  img {
    width: 300px;
    height: 250px;
    border-radius: 30px;
    filter: drop-shadow(0px 7px 8px rgba(0, 0, 0, 0.25));
  }
  ${media.tablet`
  img{
    width: 150px;
    height: 150px;
  }
  `};
`;

const ArtistName = styled(Link)`
  flex-grow: 1;
  font-size: 14px;
  font-weight 400;
  margin-top: 4px;
  color: ${colors.lightGrey};
  span {
    border-bottom: 1px solid transparent;
    &:hover,
    &:focus {
      border-bottom: 1px solid ${colors.white};
    }
  }
`;



const User = () => {
  const [user, setUser] = useState(null);
  const [followedArtists, setFollowedArtists] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);

  const [styleArtists, setStyleArtists] = useSpring(() => ({
    transform: "perspective(500px) rotateY(0deg)",
  }));


  const [styleTracks, setStyleTracks] = useSpring(() => ({
    transform: "perspective(500px) rotateY(0deg)",
  }));

  const bindTracks = useScroll((e) => {
    setStyleTracks({
      transform: `perspective(500px) rotateY(${
        e.scrolling ? clamp(e.delta[0]) : 0
      }deg)`,
    });
  });


  const bindArtists = useScroll((e) => {
    setStyleArtists({
      transform: `perspective(500px) rotateY(${
        e.scrolling ? clamp(e.delta[0]) : 0
      }deg)`,
    });
  });

  useEffect(() => {
    const fetchData = async () => {
      const { user, followedArtists, playlists, topArtists, topTracks } =
        await getUserInfo();
      setUser(user);
      setFollowedArtists(followedArtists);
      setPlaylists(playlists);
      setTopArtists(topArtists);
      setTopTracks(topTracks);
    };
    catchErrors(fetchData());
  }, []);

  const totalPlaylists = playlists ? playlists.total : 0;
  return (
    <>
      {user ? (
        <Main>
          <Header>
            <Row className="w-100">
              <Col xs={{span:6, order:1}} md={{span: 12, order:3}} className="m-0 mt-md-4 p-0">
                <UserName>
                  <Heading>Hello</Heading>
                  <Name>{user.display_name}</Name>
                </UserName>
              </Col>
              <Col className="d-flex justify-content-end justify-content-md-start align-items-center p-0" xs={{span:6, order:2}} md={{span:3, order:1}}>
                <Avatar to="/profile">
                  {user.images.length > 0 ? (
                    <img src={user.images[0].url} alt="avatar" />
                  ) : (
                    <NoAvatar>
                      <IconUser />
                    </NoAvatar>
                  )}
                </Avatar>
              </Col>
            </Row>
            {/* <Stats>
              <Stat>
                <Number>{user.followers.total}</Number>
                <NumLabel>Followers</NumLabel> 
              </Stat>
              {followedArtists && (
                <Stat>
                  <Number>{followedArtists.artists.items.length}</Number>
                  <NumLabel>Following</NumLabel>
                </Stat>
              )}
              {totalPlaylists && (
                <Stat>
                  <Link to="playlists">
                    <Number>{totalPlaylists}</Number>
                    <NumLabel>Playlists</NumLabel>
                  </Link>
                </Stat>
              )}
            </Stats> */}
            {/* <LogoutButton onClick={logout}>Logout</LogoutButton> */}
          </Header>

          <Preview>
            <Tracklist>
              <TracklistHeading>
                <h2>Top Artists of All Time</h2>
                <MoreButton to="/genres">View All</MoreButton>
              </TracklistHeading>

              {topArtists ? (
                <div
                  style={{
                    display: "flex",
                    overflowX: "scroll",
                    width: "100%",
                    padding: "30px 0",
                  }}
                  {...bindArtists()}
                >
                  {topArtists.items.slice(0, 10).map((artist, i) => (
                    <animated.div
                      style={{
                        ...styleArtists,
                        flexShrink: 0,
                        width: "auto",
                        height: "auto",
                        borderRadius: "10px",
                        marginLeft: "30px",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                      }}
                    >
                      <Artist key={i}>
                        <ArtistArtwork>
                          {artist.images.length && (
                            <img src={artist.images[0].url} alt="Artist" />
                          )}
                        </ArtistArtwork>
                        <ArtistName to={`/artist/${artist.id}`}>
                          <span>{artist.name}</span>
                        </ArtistName>
                      </Artist>
                    </animated.div>
                  ))}
                </div>
              ) : (
                <Loader />
              )}
            </Tracklist>

            <Tracklist>
              <TracklistHeading>
                <h2>Top Tracks of All Time</h2>
                <MoreButton to="/tracks">View All</MoreButton>
              </TracklistHeading>
              
              <div
                style={{
                  display: "flex",
                  overflowX: "scroll",
                  width: "100%",
                  padding: "50px 0",
                }}
                {...bindTracks()}
              >

         
                {topTracks ? (
                  topTracks.items.slice(0, 10).map((track, i) => (
                    <animated.div
                      style={{
                        ...styleTracks,
                        flexShrink: 0,
                        width: "auto",
                        height: "auto",
        
                        borderRadius: "10px",
                        marginLeft: "30px",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                      }}
                    >
                      <TopTrackItem track={track} key={i} />
                    </animated.div>
                  ))
                ) : (
                  <Loader />
                )}
              </div>
            </Tracklist>

            <RecentTracklist>
              <RecentTracklistHeading>
                <h2>Recently Played</h2>
              </RecentTracklistHeading>
              <RecentlyPlayed />
            </RecentTracklist>
          </Preview>
        </Main>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default User;
