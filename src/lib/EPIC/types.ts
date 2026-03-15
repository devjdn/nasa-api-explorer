export type EpicImageType =
    | "natural"
    | "enhanced"
    | "aerosol"
    | "cloud";

export const EPIC_IMAGE_TYPES: EpicImageType[] = [
    "natural",
    "enhanced",
    "aerosol",
    "cloud",
];

export interface EpicCoordinates {
    lat: number;
    lon: number;
}

export interface EpicPosition {
    x: number;
    y: number;
    z: number;
}

export interface EpicAttitudeQuaternions {
    q0: number;
    q1: number;
    q2: number;
    q3: number;
}

export interface EpicImage {
    identifier: string;
    caption: string;
    image: string;
    date: string;
    centroid_coordinates: EpicCoordinates;
    dscovr_j2000_position: EpicPosition;
    lunar_j2000_position: EpicPosition;
    sun_j2000_position: EpicPosition;
    attitude_quaternions: EpicAttitudeQuaternions;
    coords: {
        centroid_coordinates: EpicCoordinates;
        dscovr_j2000_position: EpicPosition;
        lunar_j2000_position: EpicPosition;
        sun_j2000_position: EpicPosition;
        attitude_quaternions: EpicAttitudeQuaternions;
    };
}