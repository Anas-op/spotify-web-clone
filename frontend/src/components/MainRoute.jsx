import React from 'react';
import {Route, Routes} from 'react-router-dom'

import ScrollToTop from './ScrollToTop';
import Nav from './Nav';
import User from './User'
import RecentlyPlayed from './RecentlyPlayed';
import TopArtists from './TopArtists';
import Genres from './Genres';

import styled from 'styled-components'
import {theme, media} from '../styles'
import TopTracks from './TopTracks';
import Playlists from './Playlists';
import Playlist from './Playlist';
import Recommendations from './Recommendations';
import Track from './Track';
import Artist from './Artist';





const SiteWrapper = styled.div`
  padding-left: ${theme.navWidth};
  z-index:1;
  ${media.tablet`
    padding-left: 0;
    padding-bottom: 50px;
  `};
`;




const MainRoute = () => {
  
    return (
        <SiteWrapper>
          <Nav />
          <Routes>
           {/* <Route path="" element={<ScrollToTop/>} > */}
            <Route  path="/" element={<User/>} /> 
            <Route  path="/recent" element={<RecentlyPlayed />} />
            <Route  path="/genres" element={<Genres />} />
            <Route  path="/artists/:genreId" element={<TopArtists />} />
            <Route  path="/tracks" element={<TopTracks />} />
            <Route  path="/playlists" element={<Playlists />} />
            <Route  path="/playlists/:playlistId" element={<Playlist />} />
            <Route  path="/recommendations/:playlistId" element={<Recommendations />}/>
            <Route  path="/track/:trackId" element={<Track />} />
            <Route  path="/artist/:artistId" element={<Artist/>}/>
           {/* </Route>  */}
          </Routes>
        </SiteWrapper>
    );
}

export default MainRoute;