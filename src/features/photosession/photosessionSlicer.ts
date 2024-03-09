import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Photosession } from "../../app/models/photosession";
import agent from "../../app/api/agent";

interface PhotosessionSlice {
    photosessions: Photosession[];
    loading: boolean;
    photosession: Photosession | null;
}

const initialState: PhotosessionSlice = {
    photosessions: [],
    loading: false,
    photosession: null,
};

export const getPhotosession = createAsyncThunk(
    "photosession/GetPhotosessionAsync",
    async () => {
        try {
            return await agent.Photosession.getPhotosession();
        } catch (error) {
            console.log(error);
        }
    }
);

export const initPhotosession = createAsyncThunk(
    "photosession/initNew",
    async () => {
        try {
            return agent.Photosession.initPhotosession();
        } catch (error) {
            console.log(error);
        }
    }
);

export const createPhotosession = createAsyncThunk(
    "photosession/createPhotosession",
    async (photosession: Photosession) => {
        try {
            return agent.Photosession.createPhotosession(photosession);
        } catch (error) {
            console.log(error);
        }
    }
);

export const uploadPhoto = createAsyncThunk(
    "photos/UploadPhoto",
    async (formData: FormData) => {
        // Змінено тип параметра з { formData: FormData } на FormData
        try {
            return agent.Photos.uploadPhoto(formData);
        } catch (error) {
            console.log(error);
        }
    }
);

export const deletePhoto = createAsyncThunk(
    "photos/deletePhoto",
    async (id: number) => {
        try {
            console.log(id);
            agent.Photos.deletePhoto(id);
            return id;
        } catch (error) {
            console.log(error);
        }
    }
);

export const photosessionSlicer = createSlice({
    name: "photosession",
    initialState,
    reducers: {
        textFieldChanged: (state, action) => {
            switch (action.payload.name) {
                case "title":
                    state.photosession!.title = action.payload.value;
                    break;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPhotosession.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getPhotosession.fulfilled, (state, action) => {
            state.loading = false;
            state.photosessions = action.payload;
        });
        builder.addCase(initPhotosession.fulfilled, (state, action) => {
            state.photosession = action.payload;
        });
        builder.addCase(uploadPhoto.fulfilled, (state, action) => {
            state.photosession?.photosId.push(action.payload.id);
        });
        builder.addCase(createPhotosession.fulfilled, (state) => {
            state.photosession = null;
        });
        builder.addCase(deletePhoto.fulfilled, (state, action) => {
            console.log(action.payload);
            const index = state.photosession?.photosId.indexOf(action.payload!);

            state.photosession!.photosId.splice(index!, 1);
        });
    },
});

export const { textFieldChanged } = photosessionSlicer.actions;
