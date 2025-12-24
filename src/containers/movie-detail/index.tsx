import React, { useMemo } from 'react';
import { View } from 'react-native';

// navigation
import { RootStackParamList } from 'root-stack-params';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// components
import Container from '@components/container';
import { LogoHeader } from '@components/headers';

// styles
import styles from './styles';
import { useGetMovieCreditsQuery, useGetMovieDetailQuery } from '@services/movie-service';
import { FilmInfoSection, FilmOverviewSection } from './components';

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
    return <View />;
  }

  return (
    <Container style={styles.container} scrollable>
      <LogoHeader />
      <FilmInfoSection movie={data} />
      <FilmOverviewSection movie={data} credits={credits} />
    </Container>
  );
};

export default MovieDetailScreen;
