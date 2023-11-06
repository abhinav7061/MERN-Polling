import React, { useState } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const CropImage = ({ src }) => {
    const [image, setImage] = useState(null)
    const [result, setResult] = useState(null)
    const [crop, setCrop] = useState({ aspect: 1 / 1 })

    const onImageLoad = image => {
        console.log(image);
    }

    return (
        <div>
            <ReactCrop src={src} onImageLoaded={onImageLoad} crop={crop} onChange={setCrop} />
        </div>
    )
}

export default CropImage