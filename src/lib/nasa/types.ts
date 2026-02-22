// Descriptions from the official APOD GitHub repo

export interface ApodResponse {
    resource: string; // A dictionary describing the image_set or planet that the response illustrates, completely determined by the structured endpoint.
    concept_tags: boolean; // A boolean reflection of the supplied option. Included in response because of default values.
    title: string; // The title of the image.
    date: string; // Date of image.Included in response because of default values.
    url: string; // The URL of the APOD image or video of the day.
    hdurl?: string; // The URL for any high - resolution image for that day.Returned regardless of 'hd' param setting but will be omitted in the response IF it does not exist originally at APOD.
    media_type: "image" | "video"; // The type of media (data) returned. May either be 'image' or 'video' depending on content.
    explanation: string; // The supplied text explanation of the image.
    concepts?: string; // The most relevant concepts within the text explanation.Only supplied if concept_tags is set to True.
    thumbnail_url?: string; // The URL of thumbnail of the video.
    copyright?: string; // The name of the copyright holder.
    service_version: string; // The service version used.

}