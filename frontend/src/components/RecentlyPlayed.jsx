import React, { useState, useEffect } from 'react';
import { getRecentlyPlayed } from '../spotify';
import { catchErrors } from '../utils';

import Loader from './Loader';
import RecentTrackItem from './RecentTrackItem';

import styled from 'styled-components';
import { Main } from '../styles';

const TracksContainer = styled.ul`
  margin-top: 15px;
`;

const RecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getRecentlyPlayed();
      setRecentlyPlayed(data);
    };
    catchErrors(fetchData());
  }, []);

  return (

      <TracksContainer>
        {recentlyPlayed ? (
          recentlyPlayed.items.map(({ track }, i) => <RecentTrackItem track={track} key={i} />)
        ) : (
          <Loader />
        )}
      </TracksContainer>
    
  );
};

export default RecentlyPlayed;
