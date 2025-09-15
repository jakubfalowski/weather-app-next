export type GeocodeResponse = {
  results?: { name: string; country: string; latitude: number; longitude: number }[];
};

export type ForecastResponse = {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
};
