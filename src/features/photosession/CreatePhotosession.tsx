import { useEffect, useState } from "react";
import UploadComponent from "../../app/components/uploadComponent";
import { Input, UploadFile } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { createPhotosession, initPhotosession, textFieldChanged } from "./photosessionSlicer";
import Search from "antd/es/input/Search";
import { FileTextFilled } from "@ant-design/icons";


export default function CreatePhotosession() {
    const { photosession } = useAppSelector(state => state.photosession)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(initPhotosession())
    }, [dispatch])

    const handleTextChange = (name: string, value: string) => {
        console.log(value)
        dispatch(textFieldChanged({ name, value }))
    }

    function handleClickCreate() {
        if (photosession !== null) {
            console.log(dispatch(createPhotosession(photosession)))
        }
    }


    return (
        <div>
            <Input
                name="title"
                placeholder="input search text"
                onChange={(value) => handleTextChange(value.target.name, value.target.value)}
            />

            <UploadComponent />
            <button onClick={() => handleClickCreate()}>Create</button>
        </div>
    )


    // const [selectedFile, setSelectedFile] = useState(null);

    // const handleFileChange = (event) => {
    //     setSelectedFile(event.target.files[0]);
    // };

    // const handleUpload = () => {
    //     if (!selectedFile) {
    //         alert("Будь ласка, виберіть файл для завантаження.");
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append('image', selectedFile);

    //     fetch('http://localhost:5233/api/Images', {
    //         method: 'POST',
    //         // headers: {
    //         //     'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3RyaW5nIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiTWVtYmVyIiwiZXhwIjoxNzA5MTk1MjE3fQ.E4Hn2xfzNMRDnn7TqKZiOvs4o-plxbOcVfUYflHg45UQ_3DUPp7x_x6d78HOea0q4akc2qrCtKCRTtkv165gLg',
    //         //     'accept': '*/*',
    //         // },
    //         body: formData
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Помилка при відправці файлу на сервер.');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log('Файл успішно відправлено на сервер:', data);
    //         // Тут можна виконати додаткові дії після успішного завантаження файлу
    //     })
    //     .catch(error => {
    //         console.error('Помилка:', error);
    //     });
    // };

    // return (
    //     <div>
    //         <h2>Завантажити файл і відправити на API</h2>
    //         <input type="file" onChange={handleFileChange} accept=".png,.jpg,.jpeg" />
    //         <button onClick={handleUpload}>Відправити файл</button>
    //     </div>
    // );
}