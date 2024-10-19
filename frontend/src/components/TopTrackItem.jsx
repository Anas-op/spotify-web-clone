import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatDuration } from "../utils";

import IconInfo from "./icons/IconInfo";

import styled from "styled-components";
import { theme, mixins, media } from "../styles";
const { colors, fontSizes, spacing } = theme;

const TrackArtwork = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  img {
    width: 100%;
  }
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
const TrackContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  overflow: hidden;
  text-align: center;
  border-radius: 8px !important;
  &:hover,
  &:focus {
    color: ${colors.white};
  }
  margin-bottom: ${spacing.md};
  ${media.tablet`
    margin-bottom: ${spacing.base};
    width: 150px;
  `};
  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }
`;
const TrackName = styled.span`
  margin-top: 4px;
  font-size: 10px;
  text-align: center;
  font-size: 14px;
  font-weight 400;
  overflow: hidden; 
  white-space:nowrap; 
  text-overflow: ellipsis;
  font-weight: 700;
  margin-left: 10px;
  z-index:0;
  
`;
const TrackArtist = styled.div`
  color: ${colors.lightGrey};
  font-size: 12px;
  font-weight 700;
  justify-content: center;
  text-align: center;
  margin-left: 10px;
  margin-top: 3px;
  font-weight: 700;
  z-index:0;
`;

const TrackInfo = styled.div`
  position: relative;
  flex-direction: column;
  align-items: start;
  width: 100%;
  display: flex;
  overflow: hidden;
  justify-content: center;
  text-align: center;
  height: 90px;
  z-index: 1;
`;
const Blur = styled.div`
  display: flex;
  margin-top: -10px;
  position: absolute;
  z-index: 0;
  overflow: auto;
  opacity: 0.5;
  img {
    filter: blur(20px);
    height: 100%;
    width: 100%;
    -webkit-filter: blur(20px);
  }
`;

const TopTrackItem = ({ track }) => (
  <TrackContainer to={`/track/${track.id}`}>
    <TrackArtwork>
      {track.album.images.length && (
        <img src={track.album.images[1].url} alt="Album Artwork" />
      )}
      <Mask>
        <IconInfo />
      </Mask>
    </TrackArtwork>
    <TrackInfo>
      <Blur>
        {track.album.images.length && (
          <img src={track.album.images[0].url} alt="Album Artwork" />
        )}
      </Blur>
      {track.name && <TrackName>{track.name}</TrackName>}
      <TrackArtist>
        {track.artists &&
          track.artists.map(({ name }, i) => (
            <span key={i}>
              {name}
              {track.artists.length > 0 && i === track.artists.length - 1
                ? ""
                : ","}
            </span>
          ))}
      </TrackArtist>
    </TrackInfo>
  </TrackContainer>
);

TopTrackItem.propTypes = {
  track: PropTypes.object.isRequired,
};

export default TopTrackItem;
