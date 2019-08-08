// const DEFAULT_API_URL = "http://localhost:8080";
const DEFAULT_API_URL = "http://192.168.1.110:8080";

export class Config {
  static readonly apiUrl = process.env.REACT_APP_API_URL || DEFAULT_API_URL;
}
