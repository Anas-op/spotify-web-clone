import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserInfo, logout } from "../spotify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { catchErrors } from "../utils";
import Loader from "./Loader";
import {Row, Col} from "react-bootstrap"
import IconUser from "./icons/IconUser";
import styled from "styled-components";
import { theme, mixins, media, Main } from "../styles";

const { colors, fontSizes, spacing } = theme;

const Header = styled.header`
  ${mixins.flexCenter};
  flex-direction: column;
  position: relative;
`;
const Avatar = styled.div`
  width: 150px;
  height: 150px;
  img {
    border-radius: 100%;
  }
`;
const NoAvatar = styled.div`
  border: 2px solid currentColor;
  border-radius: 100%;
  padding: ${spacing.md};
`;
const UserName = styled.a`
  &:hover,
  &:focus {
    color: ${colors.offGreen};
  }
`;
const Name = styled.h1`
  font-size: 50px;
  font-weight: 700;
  margin: 20px 0 0;
  ${media.tablet`
    font-size: 40px;
  `};
  ${media.phablet`
    font-size: 8vw;
  `};
`;
const Stats = styled.div`
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
const Profile = () => {
  const [user, setUser] = useState(null);
  const [followedArtists, setFollowedArtists] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { user, followedArtists, playlists } = await getUserInfo();
      setUser(user);
      setFollowedArtists(followedArtists);
      setPlaylists(playlists);
    };
    catchErrors(fetchData());
  }, []);

  const totalPlaylists = playlists ? playlists.total : 0;

  return (
    <React.Fragment>
      {user ? (
        <Main>
          <Row className="mt-5">
            <Col className="d-flex align-items-center flex-column">
            <Avatar>
              {user.images.length > 0 ? (
                <img src={user.images[0].url} alt="avatar" />
              ) : (
                <NoAvatar>
                  <IconUser />
                </NoAvatar>
              )}
            </Avatar>
            <UserName
              href={user.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Name>{user.display_name}</Name>
            </UserName>
            </Col>
            <Stats>
              <Row className="d-flex justify-content-center">
              <Col xs={4} sm={3}  md={2} xl={1} xxl={1}>
              <Stat>
                <Number>{user.followers.total}</Number>
                <NumLabel>Followers</NumLabel>
              </Stat>
              </Col>
              {followedArtists && (
                <Col  xs={3} sm={3}  md={3} xl={3} xxl={2}>
                <Stat>
                  <Number>{followedArtists.artists.items.length}</Number>
                  <NumLabel>Following</NumLabel>
                </Stat>
                </Col>
              )}
              
              {totalPlaylists && (
                <Col  xs={4} sm={3} md={2}  xl={1} xxl={1}>
                <Stat>
                  <Link to="playlists">
                    <Number>{totalPlaylists}</Number>
                    <NumLabel>Playlists</NumLabel>
                  </Link>
                </Stat>
                </Col>
              )}
              </Row>
            </Stats>

           <Row className="m-0">
            <Col className="d-flex justify-content-center">
            <LogoutButton onClick={logout}>Logout</LogoutButton>
            </Col>
            </Row>
        
          </Row>
        </Main>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

export default Profile;
