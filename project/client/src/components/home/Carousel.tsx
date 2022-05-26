import { Carousel } from "antd";
import React from "react";
import styled from "styled-components";
import bgr1 from "../../asset/bgr1.webp";
import bgr2 from "../../asset/bgr2.webp";
import bgr3 from "../../asset/bgr3.webp";

const Wrapper = styled.div`
  background-color: #f0f0f0;
  box-shadow: none;
  margin-bottom: 0;
  padding: 20px 50px;
`;
const Slick = styled(Carousel)`
  img {
    width: 100%;
  }
`;
const StyleCarousel: React.FC = () => {
  return (
    <Wrapper>
      <Slick autoplay autoplaySpeed={1500} dotPosition="left" dots={false}>
        <div>
          <img src={bgr1} alt="" />
        </div>
        <div>
          <img src={bgr2} alt="" />
        </div>
        <div>
          <img src={bgr3} alt="" />
        </div>
      </Slick>
    </Wrapper>
  );
};

export default StyleCarousel;
