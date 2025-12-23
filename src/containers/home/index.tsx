import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';

// components
import {
  AppInput,
  AppButton,
  MovieCard,
  Container,
  LogoHeader,
  DropdownMenu,
} from '@components';

// styles
import styles from './styles';

// constants
import {
  MOVIE_SORTING_OPTIONS,
  MOVIE_STATUS_FILTER_OPTIONS,
} from './constants';

// navigation
import { RootStackParamList } from 'root-stack-params';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// context
import {
  useFetchData,
  useAdditionalFilterActions,
} from './hooks';
import { FilterMoviesProvider } from './context';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Home'> {}

const HomeScreenContent: React.FC<Props> = () => {
  const {
    status,
    sortBy,
    searchQuery,
    isValid,
    handleStatusChange,
    handleSortByChange,
    handleSearchQueryChange,
    handleSearch,
  } = useAdditionalFilterActions();

  const { loading, result, onRefresh, loadMore } = useFetchData();

  const renderHeader = useMemo(() => {
    return (
      <>
        <LogoHeader />
        <View style={styles.filterContainer}>
          <DropdownMenu
            title="Movie status"
            selectedValue={status}
            options={MOVIE_STATUS_FILTER_OPTIONS}
            onChange={handleStatusChange}
          />
          <DropdownMenu
            title="Sort by"
            selectedValue={sortBy}
            options={MOVIE_SORTING_OPTIONS}
            onChange={handleSortByChange}
          />
          <AppInput
            value={searchQuery}
            placeholder="Search..."
            onChangeText={handleSearchQueryChange}
          />
          <AppButton
            title="Search"
            type="rounded"
            disabled={!isValid}
            style={styles.searchButton}
            onPress={handleSearch}
          />
        </View>
      </>
    );
  }, [
    isValid,
    status,
    sortBy,
    searchQuery,
    handleStatusChange,
    handleSortByChange,
    handleSearchQueryChange,
    handleSearch,
  ]);

  const renderItem = useMemo(() => {
    return ({ item }: { item: Movie }) => <MovieCard item={item} />;
  }, []);

  return (
    <Container style={styles.container}>
      <FlatList
        data={result}
        refreshing={loading}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(item: Movie, index: number) => `${item.id}-${index}`}
        onRefresh={onRefresh}
        renderItem={renderItem}
        onEndReached={loadMore}
      />
    </Container>
  );
};

const HomeScreen: React.FC<Props> = props => {
  return (
    <FilterMoviesProvider>
      <HomeScreenContent {...props} />
    </FilterMoviesProvider>
  );
};

export default HomeScreen;
