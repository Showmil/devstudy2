import React, { useMemo, useState } from 'react'
import { Banner as IBanner } from "@/models/banner.model";
import styled from "styled-components";
import BannerItem from './BannerItem';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface Props {
  banners: IBanner[];
}

function Banner({ banners }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);

const transformValue = useMemo(() => {
  return currentIndex * -100;
}, [currentIndex]);

const handlePrev = () => {
  if (currentIndex === 0) return;
  setCurrentIndex(currentIndex - 1);
};

const handleNext = () => {
  if (currentIndex === banners.length - 1) return;
  setCurrentIndex(currentIndex + 1);
    };
    
    const handleIndicatorClick = (index: number) => {
  setCurrentIndex(index);
};


return (
  <BannerStyle>
    {/* 배너 그룹 */}
    <BannerContainerStyle $transformValue={transformValue}>
      {banners.map((item, index) => (
        <BannerItem banner={item} />
      ))}
    </BannerContainerStyle>

    {/* 버튼 */}
    <BannerButtonStyle>
      <button className="prev" onClick={handlePrev}>
        <FaAngleLeft />
      </button>
      <button className="next" onClick={handleNext}>
        <FaAngleRight />
      </button>
    </BannerButtonStyle>

    {/* 인디케이터 */}
    <BannerIndicatorStyle>
      {banners.map((_, index) => (
        <span
          className={index === currentIndex ? "active" : ""}
          onClick={() => handleIndicatorClick(index)}
        ></span>
      ))}
    </BannerIndicatorStyle>
  </BannerStyle>
);

}

const BannerStyle = styled.div`
  overflow: hidden;
  position: relative;
`;

interface BannerContainerStyleProps {
  $transformValue: number;
}

const BannerContainerStyle = styled.div<BannerContainerStyleProps>`
  display: flex;
  transform: translateX(${(props) => props.$transformValue}%);
  transition: transform 0.5s ease-in-out;
`;

const BannerButtonStyle = styled.div`
  button {
    border: 0;
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 500px;
    font-size: 2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    svg {
        fill: #fff;
    }

    &.prev {
        left: 10px;
    }

    &.next {
        right: 10px;
    }

  @media screen AND ${({ theme }) => theme.mediaQuery.mobile} {
      width: 28px;
      height: 28px;
      font-size: 1.5rem;

      &.prev {
          left: 0;
      }

      &.next {
          right: 0;
      }
  }
  }
`;

const BannerIndicatorStyle = styled.div`
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);

    span {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 100px;
        background: #fff;
        margin: 0 4px;
        cursor: pointer;
    }

    &.active {
        background: ${({ theme }) => theme.color.primary};
    }

    @media screen AND ${({ theme }) => theme.mediaQuery.mobile} {
        bottom: 0;

        span {
            width: 12px;
            height: 12px;
        }

        &.active {
            width: 24px;
        }
    }

`;

export default Banner;
