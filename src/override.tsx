import React from 'react';
import PropTypes from 'prop-types';
import ReactImageLightbox from 'react-image-lightbox';

let angle:any;

export const changeAngle = (newAngle:any) => {
    angle = newAngle;
};
// @ts-ignore
const parentTransform = ReactImageLightbox.getTransform;
// @ts-ignore
ReactImageLightbox.getTransform = (args:any) => {
    const
        parent = parentTransform(args);

    if (angle && angle !== 0) {
        parent[Object.keys(parent)[0]] += `rotate(${angle}deg)`;
    }

    return parent;
};

// @ts-ignore
Object.assign(ReactImageLightbox.propTypes, {
    angle: PropTypes.number,
});

export default ReactImageLightbox;
