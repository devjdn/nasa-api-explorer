export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: AppError };

export type AppError =
  | {
      type: "RATE_LIMIT";
      status: 429;
      message?: string;
      retryAfter?: number;
    }
  | {
      type: "NOT_FOUND";
      status: 404;
      message?: string;
    }
  | {
      type: "SERVER_ERROR";
      status: number; // 500–599
      message?: string;
    }
  | {
      type: "NETWORK_ERROR";
      message?: string;
    }
  | {
      type: "UNKNOWN";
      status?: number;
      message?: string;
    };

// Descriptions from the official APOD GitHub repo

export interface ApodResponse {
  resource: string; // A dictionary describing the image_set or planet that the response illustrates, completely determined by the structured endpoint.
  concept_tags: boolean; // A boolean reflection of the supplied option. Included in response because of default values.
  title: string; // The title of the image.
  date: string; // Date of image. Included in response because of default values.
  url: string; // The URL of the APOD image or video of the day.
  hdurl?: string; // The URL for any high - resolution image for that day.Returned regardless of 'hd' param setting but will be omitted in the response IF it does not exist originally at APOD.
  media_type: "image" | "video"; // The type of media (data) returned. May either be 'image' or 'video' depending on content.
  explanation: string; // The supplied text explanation of the image.
  concepts?: string; // The most relevant concepts within the text explanation. Only supplied if concept_tags is set to True.
  thumbnail_url?: string; // The URL of thumbnail of the video.
  copyright?: string; // The name of the copyright holder.
  service_version: string; // The service version used.
}

// NeoWs types inferred from api.nasa.gov demo API responses

export interface NeoWsFeedResponse {
  links: {
    next: string;
    previous: string;
    self: string;
  };
  element_count: number;
  near_earth_objects: Record<string, NeoObject[]>;
}

export interface NeoObject {
  links: {
    self: string;
  };
  id: string;
  neo_reference_id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: EstimatedDiameter;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: CloseApproachData[];
  is_sentry_object: boolean;
}

export interface EstimatedDiameter {
  kilometers: DiameterRange;
  meters: DiameterRange;
  miles: DiameterRange;
  feet: DiameterRange;
}

export interface DiameterRange {
  estimated_diameter_min: number;
  estimated_diameter_max: number;
}

export interface CloseApproachData {
  close_approach_date: string;
  close_approach_date_full: string;
  epoch_date_close_approach: number;
  relative_velocity: {
    kilometers_per_second: string;
    kilometers_per_hour: string;
    miles_per_hour: string;
  };
  miss_distance: {
    astronomical: string;
    lunar: string;
    kilometers: string;
    miles: string;
  };
  orbiting_body: string;
}
