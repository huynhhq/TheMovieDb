import React, { useCallback, useState } from 'react';
import { View, RefreshControl } from 'react-native';

// navigation
import { RootStackParamList } from 'root-stack-params';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// components
import {
  FilmInfoSection,
  Recommendations,
  MovieDetailSkeleton,
  FilmOverviewSection,
  TopBilledCastSection,
} from './components';
import Container from '@components/container';
import { LogoHeader } from '@components/headers';
import { AppText, AppButton } from '@components/uikit';

// styles
import styles from './styles';

// services
import {
  useGetMovieCreditsQuery,
  useGetMovieDetailQuery,
} from '@services/movie-service';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'MovieDetail'> {}

const MovieDetailScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;
  const [refreshing, setRefreshing] = useState(false);

  const {
    data,
    isLoading,
    isFetching,
    error: movieError,
    refetch: refetchMovie,
  } = useGetMovieDetailQuery(id, {
    skip: !id,
  });

  const {
    data: credits,
    isLoading: isCreditsLoading,
    isFetching: isCreditsFetching,
    error: creditsError,
    refetch: refetchCredits,
  } = useGetMovieCreditsQuery(id, {
    skip: !id,
  });

  const loading =
    isLoading || isFetching || isCreditsLoading || isCreditsFetching;
  const hasError = movieError || creditsError;

  const handleRetry = useCallback(() => {
    if (movieError) {
      refetchMovie();
    }
    if (creditsError) {
      refetchCredits();
    }
  }, [movieError, creditsError, refetchMovie, refetchCredits]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchMovie(), refetchCredits()]);
    } finally {
      setRefreshing(false);
    }
  }, [refetchMovie, refetchCredits]);

  if (loading) {
    return (
      <Container style={styles.container} scrollable>
        <LogoHeader />
        <MovieDetailSkeleton />
      </Container>
    );
  }

  if (hasError) {
    return (
      <Container style={styles.container} scrollable>
        <LogoHeader />
        <View style={styles.errorContainer}>
          <AppText
            fontSize={20}
            fontWeight="semibold"
            style={styles.errorTitle}
          >
            Oops! Something went wrong
          </AppText>
          <AppText fontSize={16} style={styles.errorMessage}>
            {movieError
              ? 'Failed to load movie details. Please try again.'
              : 'Failed to load movie credits. Please try again.'}
          </AppText>
          <AppButton
            title="Retry"
            type="primary"
            onPress={handleRetry}
            style={styles.retryButton}
            accessibilityLabel="Retry loading movie details"
            accessibilityHint="Attempts to reload the movie information"
          />
        </View>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container style={styles.container} scrollable>
        <LogoHeader />
        <View style={styles.errorContainer}>
          <AppText
            fontSize={20}
            fontWeight="semibold"
            style={styles.errorTitle}
          >
            Movie Not Found
          </AppText>
          <AppText fontSize={16} style={styles.errorMessage}>
            The movie you're looking for doesn't exist or has been removed.
          </AppText>
        </View>
      </Container>
    );
  }

  return (
    <Container
      style={styles.container}
      scrollable
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <LogoHeader />
      <FilmInfoSection movie={data} />
      <FilmOverviewSection movie={data} credits={credits} />
      <TopBilledCastSection casts={credits?.cast} />
      <View style={styles.line} />
      <Recommendations id={id} />
    </Container>
  );
};

export default MovieDetailScreen;
