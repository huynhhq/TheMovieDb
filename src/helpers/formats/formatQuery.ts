import DeviceInfo from '@helpers/device-info';
import queryString from 'query-string';

export const formatParamsSerializer = (params: IParams) => {
  return queryString.stringify(params, {
    skipNull: true,
    skipEmptyString: true,
    arrayFormat: 'bracket',
    encode: DeviceInfo.isAndroid,
  });
};

export const formatStringifyUrl = (
  pathname: string,
  params: IParams,
  options?: queryString.StringifyOptions,
) => {
  return queryString.stringifyUrl(
    {
      url: pathname,
      query: params,
    },
    {
      arrayFormat: 'bracket',
      skipNull: true,
      skipEmptyString: true,
      ...options,
    },
  );
};
