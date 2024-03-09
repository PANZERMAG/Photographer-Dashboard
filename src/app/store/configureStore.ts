import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { accountSlicer } from "../../features/account/accountSlice";
import { photosessionSlicer } from "../../features/photosession/photosessionSlicer";

export const store = configureStore({
    reducer: {
        photosession: photosessionSlicer.reducer,
        account: accountSlicer.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
