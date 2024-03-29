export interface MediaConfig {
  read_directory: string;
  write_directory: {
    dev: string;
    stag: string;
    prod: string;
  };
  mime_types: string[];
  serve_route: string;
}
