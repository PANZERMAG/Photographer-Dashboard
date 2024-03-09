export interface PhotosessionCreate {
    id: number;
    title: string;
    reviewed: boolean;
    date: string;
    photosId: number[];
    photosessionKey: string;
}
