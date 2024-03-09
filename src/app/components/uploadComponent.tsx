// import React, { useState } from 'react';
// import { PlusOutlined } from '@ant-design/icons';
// import { Modal, Upload } from 'antd';
// import type { GetProp, UploadFile, UploadProps } from 'antd';
// import agent from '../api/agent';
// import axios from 'axios';
// import { deletePhoto, setPhotosId, uploadPhoto } from '../../features/photosession/photosessionSlicer';
// import { useAppDispatch } from '../store/configureStore';
// import Item from 'antd/es/list/Item';

// type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

// const getBase64 = (file: FileType): Promise<string> =>
//     new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result as string);
//         reader.onerror = (error) => reject(error);
//     });


// const props: UploadProps = {
//     name: 'image',
//     action: 'http://localhost:5233/api/Images',
//     headers: {
//         accept: '*/*',
//     },
//     // onChange(info) {
//     //     console.log(info)
//     //     if (info.file.status == 'done') {
//     //         console.log(info.file, info.fileList);
//     //     }
//     // }
//     onSuccess
// }

// const App: React.FC = () => {
//     const [previewOpen, setPreviewOpen] = useState(false);
//     const [previewImage, setPreviewImage] = useState('');
//     const [previewTitle, setPreviewTitle] = useState('');
//     const [fileList, setFileList] = useState<UploadFile[]>([]);
//     const [photosId, setPhotosId] = useState<number[]>();
//     const dispatch = useAppDispatch()

//     const handleCancel = () => setPreviewOpen(false);

//     const handlePreview = async (file: UploadFile) => {
//         if (!file.url && !file.preview) {
//             file.preview = await getBase64(file.originFileObj as FileType);
//         }

//         setPreviewImage(file.url || (file.preview as string));
//         setPreviewOpen(true);
//         setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
//     };

//     const handleChange: UploadProps['onChange'] = ({ fileList: newFileList, }) => {
//         setTimeout(() => {
//             console.log(fileList.map((photo) => photo.response));
//         }, 4000);
//         setFileList(newFileList);

//         // setPhotosId(fileList.map((photo) => photo.id))
//         // dispatch(setPhotosId(fileList))
//     }

//     const uploadButton = (
//         <button style={{ border: 0, background: 'none' }} type="button">
//             <PlusOutlined />
//             <div style={{ marginTop: 8 }}>Upload</div>
//         </button>
//     );

//     function handleDownload(file: UploadFile) {
//         console.log(1111)
//         console.log(file.response.id)
//         dispatch(uploadPhoto(file.response.id))
//     }

//     function handleDelete(item: UploadFile) {
//         console.log(item.response.id)
//         dispatch(deletePhoto(item.response.id))
//     }


//     return (
//         <>
//             <Upload
//                 {...props}

//                 listType="picture-card"
//                 fileList={fileList}
//                 onPreview={handlePreview}
//                 // onChange={handleChange}
//                 onDownload={() => handleDownload}
//                 onRemove={(item) => handleDelete(item)}
//             >
//                 {fileList.length >= 8 ? null : uploadButton}
//             </Upload>
//             <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
//                 <img alt="example" style={{ width: '100%' }} src={previewImage} />
//             </Modal>
//         </>
//     );
// };

// export default App;



import React, { useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { uploadPhoto } from '../../features/photosession/photosessionSlicer';

const ImageUploader = () => {
    const dispatch = useAppDispatch()
    const [selectedImages, setSelectedImages] = useState([]);
    const [uploadStatus, setUploadStatus] = useState('');
    const { photosession } = useAppSelector(state => state.photosession)

    const handleImageChange = (e) => {
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
                var response = dispatch(uploadPhoto(formData))
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
