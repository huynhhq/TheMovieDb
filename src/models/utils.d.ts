interface ISvgIconProps {
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
}

interface IParams {
  [key: string]: any;
}

interface GetItemsResponse<T> {
  results: T[];
  page?: number;
  total_pages: number;
  total_results: number;
}