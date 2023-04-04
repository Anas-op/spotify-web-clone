import styled from 'styled-components';
import media from './media';

const Main = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: 100%;
  min-height: 100vh;
  padding:30px 100px 100px 100px;
  ${media.desktop`
    padding: 30px 50px;
  `};
  ${media.tablet`
    padding: 20px 30px;
  `};
  ${media.phablet`
    padding: 15px 20px;
  `};
  h2 {
    ${media.tablet`
      text-align: center;
    `};
  }
`;

export default Main;
