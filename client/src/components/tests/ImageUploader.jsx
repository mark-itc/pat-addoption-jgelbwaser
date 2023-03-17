import React, { useState } from 'react';
import { Button, Container, IconButton, Input } from '@mui/material';
import { AddPhotoAlternate, Photo } from '@mui/icons-material';
import { css } from '@emotion/react';

const imagePreviewStyle = css`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #e0e0e0;
  cursor: pointer;
`;

const iconButtonStyle = css`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #1976d2;
  color: white;
  &:hover {
    background-color: #0d47a1;
  }
`;

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDefaultImageClick = () => {
    document.getElementById('imageInput').click();
  };

  return (
    <Container maxWidth="sm">
      <input
        accept="image/*"
        css={{ display: 'none' }}
        id="imageInput"
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="imageInput">
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="selected"
            css={imagePreviewStyle}
          />
        ) : (
          <IconButton
            component="span"
            css={iconButtonStyle}
            onClick={handleDefaultImageClick}
          >
            <Photo />
          </IconButton>
        )}
      </label>
    </Container>
  );
};

export default ImageUploader;