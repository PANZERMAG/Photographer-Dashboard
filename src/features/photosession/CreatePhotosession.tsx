import { useEffect } from "react";
import UploadComponent from "../../app/components/uploadComponent";
import { Input } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { createPhotosession, initPhotosession, textFieldChanged } from "./photosessionSlicer";


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
}