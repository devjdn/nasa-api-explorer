export type ApiResult<T> =
  { ok: true; data: T } | { ok: false; error: AppError };

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
  date: string; // Date of the APOD entry (YYYY-MM-DD).
  post_id: number; // The WordPress post ID for the entry.
  title: string; // The title of the image.
  permalink: string; // Link to the APOD article page on science.nasa.gov.
  media_type: "image" | "video"; // The type of media for the entry.
  explanation: string; // The text explanation of the image.
  credit?: string; // Image credit. May be absent on some entries.
  copyright?: string; // The copyright holder, if any.
  alt?: string; // Alt text describing the image.
  url: string; // URL for the entry. See note below.
  hdurl: string; // URL of the high-resolution image
  basic_html: string; // The page content as an HTML string.
  basic_html_url: string; // URL of the same HTML content via the WP REST API.
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
