import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  getGenres,
} from "../spotify";
import { catchErrors } from "../utils";


import Loader from "./Loader";

import styled from "styled-components";
import { theme, mixins, media, Main } from "../styles";
import {Row, Col} from "react-bootstrap"
const { colors, fontSizes, spacing } = theme;

const Header = styled.header`
  ${mixins.flexBetween};
 
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
  &:hover{
    color: ${colors.grey};
  }
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
  font-size: 15px;
  &:hover,
  &:focus {
    color: ${colors.white};
  }
  text-transform: capitalize;
  border-bottom: 1px solid transparent;
`

const SearchBar = styled.input`
width: auto;
height: 40px;
padding: 10px;
background: ${colors.white};
border-radius: 10px;
background-color: #212529;
border: none;
color: ${colors.white};


`

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState("");

  let colors = [
    '#545DB2','#678026','#54B263','#268060', '#B27B54','#1F1F22' ,'#EF2F62', '#678026', '#B25459', '#B25459'
  ]

  useEffect(() => {
      const {genres} = getGenres();

    const obj = genres.map(genre => ({
        name: genre,
        color: colors[Math.floor(Math.random() * colors.length)]
      }))
    
     setGenres(obj);
      
  }, []);



  const filteredGenres = useMemo(() => {
      return genres.filter((item) => 
      item.name.toLowerCase().includes(search.toLowerCase()))

}, [genres, search]);


  
  return (
    <Main>
      <Header>
        <h2>Genres</h2>
        <SearchBar onChange={(e) => setSearch(e.target.value)} placeholder="Search Genre.." />
      </Header>
      <GenresContainer>
        <Row >
        {filteredGenres ? (
          filteredGenres.map((genres, id) => (
            <Col xs={6} key={id} className="p-3">
            <Genre key={id}>
              <GenreArtwork style={{background: genres.color}} to={`/artists/${genres.name}`}>
              <GenreName>{genres.name}</GenreName>
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
