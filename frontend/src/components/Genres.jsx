import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  getTopArtistsShort,
  getTopArtistsMedium,
  getTopArtistsLong,
  getGenres,
} from "../spotify";
import { catchErrors } from "../utils";


import IconInfo from "./icons/IconInfo";
import Loader from "./Loader";

import styled from "styled-components";
import { theme, mixins, media, Main } from "../styles";
import {Row, Container, Col} from "react-bootstrap"
const { colors, fontSizes, spacing } = theme;

const Header = styled.header`
  ${mixins.flexBetween};
  ${media.tablet`
    display: block;
  `};
  h2 {
    margin: 0;
  }
`;
const Ranges = styled.div`
  display: flex;
  margin-right: -11px;
  ${media.tablet`
    justify-content: space-around;
    margin: 30px 0 0;
  `};
`;
const RangeButton = styled.button`
  background-color: transparent;
  color: ${(props) => (props.isActive ? colors.white : colors.lightGrey)};
  font-size: ${fontSizes.base};
  font-weight: 500;
  padding: 10px;
  ${media.phablet`
    font-size: ${fontSizes.sm};
  `};
  span {
    padding-bottom: 2px;
    border-bottom: 1px solid
      ${(props) => (props.isActive ? colors.white : `transparent`)};
    line-height: 1.5;
    white-space: nowrap;
  }
`;
const GenresContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
  margin-top: 50px;
  ${media.tablet`
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  `};
  ${media.phablet`
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  `};
`;
const Genre = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
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
  border-radius: 100%;
  font-size: 20px;
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
  svg {
    width: 25px;
  }
`;
const GenreArtwork = styled(Link)`
  position: relative;
  background: #1e1e1e;
  justify-content:flex-start;
  text-align: left;
  width:100%;
  height: 180px;
  ${media.tablet`
    height: 120px;
  `};
  ${media.phablet`
    height: 100px;
  `};
  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }
  img {
    border-radius: 100%;
    object-fit: cover;
    width: 200px;
    height: 200px;
    ${media.tablet`
      width: 150px;
      height: 150px;
    `};
    ${media.phablet`
      width: 120px;
      height: 120px;
    `};
  }
`;
const GenreName = styled.h1`
  margin: ${spacing.base} 20px;
  font-weight: 700;
  font-size: 14px;
  text-transform: capitalize;
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.white};
  }
`

const Genres = () => {
  const [genres, setGenres] = useState(null);
  let colors = [
    '#545DB2','#678026','#54B263','#268060', '#B27B54','#1F1F22' ,'#EF2F62', '#678026', '#B25459', '#B25459'
  ]

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getGenres();
      setGenres(data);

    };
    catchErrors(fetchData());
  }, []);

  const changeRange = async (range) => {
    const { data } = await apiCalls[range];
    setTopArtists(data);
    setActiveRange(range);
  };
  
  return (
    <Main>
      <Header>
        <h2>Genres</h2>
      </Header>
      <GenresContainer>
        <Row >
        {genres ? (
          genres.genres.map((genre, i) => (
            <Col xs={6} key={i} className="p-3">
            <Genre key={i}>
              <GenreArtwork style={{background: `${colors[Math.floor(Math.random()*colors.length)]}`}} to={`/artists/${genre}`}>
              <GenreName>{genre}</GenreName>
              </GenreArtwork>            
            </Genre>
            </Col>
          ))
        ) : (
          <Loader />
        )}
        </Row>
      </GenresContainer>
    </Main>
  );
};

export default Genres;
