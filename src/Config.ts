const DEFAULT_API_URL = "http://localhost:8080";

export class Config {
  static readonly apiUrl = process.env.REACT_APP_API_URL || DEFAULT_API_URL;
}
