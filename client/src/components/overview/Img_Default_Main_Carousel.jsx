import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import ImageDefaultThumbnail from './Img_Default_Thumbnails.jsx';

const SubWrapper = styled.div`
  background-color: grey;
  position: relative;
  display: grid;
  height: 60vh;
  width: 90vh;
  // min-height: 200px;
  // min-width: 300px;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(8, 1fr);
  // justify-content: center;
  // align-content: center;
  justify-items: center;
  align-items: center;
`;

const Image = styled.img`
  position: absolute;
  z-index: 50;
  grid-row: 1 / 9;
  grid-column: 1/ 13;
  height: 100%;
  width: 100%;
  min-width: 600px;
  min-height: 400px;
  object-fit: contain;
  cursor: zoom-in;
`;

function MainImage(
  {
    images, currImgIndex, setCurrImgIndex, thumbnailIndexMin,
    thumbnailIndexMax, setThumbnailIndexMin, setThumbnailIndexMax, setExpandedView,
  },
) {
  if (images.length > 0) {
    const navigateLeft = () => {
      if (currImgIndex - 1 < thumbnailIndexMin) {
        setThumbnailIndexMin(thumbnailIndexMin - 1);
        setThumbnailIndexMax(thumbnailIndexMax - 1);
      }
      setCurrImgIndex(currImgIndex - 1);
    };

    const navigateRight = () => {
      if (currImgIndex + 1 > thumbnailIndexMax) {
        setThumbnailIndexMax(thumbnailIndexMax + 1);
        setThumbnailIndexMin(thumbnailIndexMin + 1);
      }
      setCurrImgIndex(currImgIndex + 1);
    };

    return (
      <div>
        {images.map((image, index) => (
          <div key={index}>
            {index === currImgIndex && (
              <SubWrapper>
                <ImageDefaultThumbnail
                  images={images}
                  currImgIndex={currImgIndex}
                  setCurrImgIndex={setCurrImgIndex}
                  thumbnailIndexMin={thumbnailIndexMin}
                  thumbnailIndexMax={thumbnailIndexMax}
                  setThumbnailIndexMin={setThumbnailIndexMin}
                  setThumbnailIndexMax={setThumbnailIndexMax}
                />
                {index > 0 && (
                  <FaArrowCircleLeft
                    data-testid="left-arrow"
                    onClick={navigateLeft}
                    style={{
                      position: 'absolute',
                      zIndex: 70,
                      height: '3vh',
                      width: '3vh',
                      minHeight: '20px',
                      minWidth: '20px',
                      gridColumn: '1 / 2',
                      gridRow: '5 / 6',
                      cursor: 'pointer',
                    }}
                  />
                )}
                <Image
                  src={images[currImgIndex].url}
                  alt="A representation of this product"
                  onClick={() => { setExpandedView(true); }}
                  loading="lazy"
                />
                {index < images.length - 1 && (
                  <FaArrowCircleRight
                    style={{
                      position: 'absolute',
                      zIndex: 70,
                      height: '3vh',
                      width: '3vh',
                      minHeight: '20px',
                      minWidth: '20px',
                      gridColumn: '12 / 13',
                      gridRow: '5 / 6',
                      cursor: 'pointer',
                    }}
                    data-testid="right-arrow"
                    onClick={navigateRight}
                  />
                )}
              </SubWrapper>
            )}
          </div>
        ))}
      </div>
    );
  }
}

MainImage.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    thumbnail_url: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
  currImgIndex: PropTypes.number,
  setCurrImgIndex: PropTypes.func.isRequired,
  thumbnailIndexMin: PropTypes.number,
  thumbnailIndexMax: PropTypes.number,
  setThumbnailIndexMin: PropTypes.func.isRequired,
  setThumbnailIndexMax: PropTypes.func.isRequired,
  setExpandedView: PropTypes.func.isRequired,
};

MainImage.defaultProps = {
  currImgIndex: null,
  thumbnailIndexMax: null,
  thumbnailIndexMin: null,
};

export default MainImage;
