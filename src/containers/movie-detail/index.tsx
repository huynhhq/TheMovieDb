import React, { useMemo } from 'react';

// navigation
import { RootStackParamList } from 'root-stack-params';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// components
import Container from '@components/container';
import { LogoHeader } from '@components/headers';

// styles
import styles from './styles';
import {
  useGetMovieCreditsQuery,
  useGetMovieDetailQuery,
} from '@services/movie-service';
import {
  FilmInfoSection,
  FilmOverviewSection,
  MovieDetailSkeleton,
  TopBilledCastSection,
} from './components';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'MovieDetail'> {}

const MovieDetailScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;

  const { data, isLoading, isFetching } = useGetMovieDetailQuery(id, {
    skip: !id,
  });

  const {
    data: credits,
    isLoading: isCreditsLoading,
    isFetching: isCreditsFetching,
  } = useGetMovieCreditsQuery(id, {
    skip: !id,
  });

  const loading = useMemo(
    () => isLoading || isFetching || isCreditsLoading || isCreditsFetching,
    [isLoading, isFetching, isCreditsLoading, isCreditsFetching],
  );

  if (loading) {
    return (
      <Container style={styles.container} scrollable>
        <LogoHeader />
        <MovieDetailSkeleton />
      </Container>
    );
  }

  return (
    <Container style={styles.container} scrollable>
      <LogoHeader />
      <FilmInfoSection movie={data} />
      <FilmOverviewSection movie={data} credits={credits} />
      <TopBilledCastSection casts={credits?.cast} />
    </Container>
  );
};

export default MovieDetailScreen;
