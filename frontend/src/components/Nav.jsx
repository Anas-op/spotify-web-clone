import React from 'react';
import { Link, NavLink } from 'react-router-dom';




import styled from 'styled-components';
import { theme, mixins, media } from '../styles';
import IconSpotify from './icons/IconSpotify';
import IconUser from './icons/IconUser'
import IconTime from './icons/IconTime'
import IconMicrophone from './icons/IconMicrophone'
import IconPlaylist from './icons/IconPlaylist'
import IconMusic from './icons/IconMusic';
import IconGithub from './icons/IconGithub';


const { colors } = theme;

const Container = styled.nav`
  ${mixins.coverShadow};
  ${mixins.flexBetween};
  flex-direction: column;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left:0;
  width: ${theme.navWidth};
  background-color: rgba(32, 32, 32, 0.5);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px); 
  text-align: center;
  z-index: 99;
  ${media.tablet`
    top: auto;
    bottom: 0px;
    width: 100%;
    min-height: ${theme.navHeight};
    height: ${theme.navHeight};
    flex-direction: row;
    border-radius: 0px;
  `};
  & > * {
    width: 100%;
    ${media.tablet`
      height: 100%;
      border-radius: 100%;
    `};
  }
`;
const Logo = styled.div`
  color: ${colors.green};
  margin-top: 30px;
  width: 70px;
  position:relative;
  height: 70px;
  transition: ${theme.transition};
  ${media.tablet`
    display: none;
  `};
  &:hover,
  &:focus {
    color: ${colors.offGreen};
  }
  svg {
    width: 50px;
  }
  div{
    font-size: 11px;
    margin-bottom: 5px;
  }
`;
const Github = styled.div`
  color: ${colors.lightGrey};
  width: 45px;
  height: 45px;
  margin-bottom: 30px;
  ${media.tablet`
    display: none;
  `};
  a {
    &:hover,
    &:focus,
    &.active {
      color: ${colors.blue};
    }
    svg {
      width: 30px;
    }
  }
`;
const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  height: 100vh;
  ${media.tablet`
    flex-direction: row;
    margin-top:0;
    height:auto;
    align-items: flex-end;
    justify-content: center;
  `};
`;
const MenuItem = styled.li`
  color: ${colors.lightGrey};
  font-size: 10px;
  ${media.tablet`
    flex-grow: 1;
    flex-basis: 100%;
    height: 100%;
  `};
  a {
    display: block;
    padding: 20px 0;
    width: 100%;
    height: 100%;
    ${media.tablet`
      ${mixins.flexCenter};
      flex-direction: column;
      padding: 0;
      border-left: 0;
      border-top: 0px solid transparent;
    `};
    &:hover,
    &:focus,
    &.active {
      color: ${colors.white};
    }
  }
  svg {
    width: 20px;
    height: 20px;
    margin-bottom: 2px;
  }
`;


const Nav = () => (

  <Container>
    <Logo>
      <Link to="/">
        <div>Powered by</div>
        <IconSpotify />
      </Link>
    </Logo>
    <Menu>
      <MenuItem>
        <NavLink to="/">
        <svg fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 491.398 491.398" xmlSpace="preserve">
<g>
	<g id="Icons_19_">
		<path d="M481.765,220.422L276.474,15.123c-16.967-16.918-44.557-16.942-61.559,0.023L9.626,220.422
			c-12.835,12.833-12.835,33.65,0,46.483c12.843,12.842,33.646,12.842,46.487,0l27.828-27.832v214.872
			c0,19.343,15.682,35.024,35.027,35.024h74.826v-97.62c0-7.584,6.146-13.741,13.743-13.741h76.352
			c7.59,0,13.739,6.157,13.739,13.741v97.621h74.813c19.346,0,35.027-15.681,35.027-35.024V239.091l27.812,27.815
			c6.425,6.421,14.833,9.63,23.243,9.63c8.408,0,16.819-3.209,23.242-9.63C494.609,254.072,494.609,233.256,481.765,220.422z"/>
	</g>
</g>
        </svg>
          <div>Home</div>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="genres">
          <IconMicrophone />
          <div>Artists</div>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="tracks">
          <IconMusic />
          <div>Tracks</div>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="playlists">
        <IconPlaylist />
          <div>Playlists</div>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="profile">
        <IconUser />
          <div>Profile</div>
        </NavLink>
      </MenuItem>
    </Menu>
  </Container>
);

export default Nav;
