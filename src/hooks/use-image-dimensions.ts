import { useEffect, useState } from 'react';
import { Image, ImageRequireSource, ImageURISource } from 'react-native';

export interface URISource {
  uri: string;
}

export type ImageDimensionsSource = ImageRequireSource | URISource;

export interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

export interface ImageDimensionsResult {
  dimensions?: ImageDimensions;
  error?: Error;
  loading: boolean;
}

/**
 * @param source either a remote URL or a local file resource.
 * @param headers headers to be passed to a remote URL resource.
 * @returns original image dimensions (width, height and aspect ratio).
 */
export function useImageDimensions(
  source: ImageDimensionsSource,
  headers?: ImageURISource['headers'],
): ImageDimensionsResult {
  const [result, setResult] = useState<ImageDimensionsResult>({
    loading: true,
  });

  // Extract stable values for dependencies
  const uri = typeof source === 'object' && 'uri' in source ? source.uri : null;
  const isNumber = typeof source === 'number';
  const sourceNumber = isNumber ? source : null;

  useEffect(() => {
    try {
      if (sourceNumber !== null) {
        const { width, height } = Image.resolveAssetSource(sourceNumber);

        setResult({
          dimensions: { width, height, aspectRatio: width / height },
          loading: false,
        });

        return;
      }

      if (uri) {
        setResult(prev => ({ ...prev, loading: true }));

        if (typeof headers === 'object') {
          Image.getSizeWithHeaders(
            uri,
            headers,
            (width, height) =>
              setResult({
                dimensions: { width, height, aspectRatio: width / height },
                loading: false,
              }),
            error => setResult({ error, loading: false }),
          );
        } else {
          Image.getSize(
            uri,
            (width, height) =>
              setResult({
                dimensions: { width, height, aspectRatio: width / height },
                loading: false,
              }),
            error => setResult({ error, loading: false }),
          );
        }

        return;
      }

      throw new Error('not implemented');
    } catch (error: any) {
      setResult({ error, loading: false });
    }
  }, [headers, uri, sourceNumber]);

  return result;
}
