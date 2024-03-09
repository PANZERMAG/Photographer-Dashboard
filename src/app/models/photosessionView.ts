export interface PhotosessionView {
    id: number;
    title: string;
    reviewed: boolean;
    date: string;
    photos: Photo[];
    photosessionKey: string;
}

export interface Photo {
    id: number;
    path: string;
}
