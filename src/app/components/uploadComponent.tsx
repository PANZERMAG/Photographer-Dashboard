import { useState } from 'react';
import { useAppDispatch } from '../store/configureStore';
import { uploadPhoto } from '../../features/photosession/photosessionSlicer';

const ImageUploader = () => {
    const dispatch = useAppDispatch()
    const [selectedImages, setSelectedImages] = useState([]);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleImageChange = (e: any) => {
        setSelectedImages(Array.from(e.target.files));
    };

    const handleUpload = async () => {
        if (selectedImages.length === 0) {
            setUploadStatus('Please select at least one image.');
            return;
        }
        selectedImages.forEach((image) => {
            const formData = new FormData();
            formData.append('image', image);
            try {
                const response = dispatch(uploadPhoto(formData))
                console.log('Upload successful:', response);
                setUploadStatus('Upload successful!');
            } catch (error) {
                console.error('Error uploading images:', error);
                setUploadStatus('Error uploading images. Please try again.');
            }
        });


    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} multiple />
            <button onClick={handleUpload}>Upload</button>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default ImageUploader;
