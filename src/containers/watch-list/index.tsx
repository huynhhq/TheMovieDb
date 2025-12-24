import React from 'react';

// components
import { MainFilter, UserInfoSection } from './components';
import { Container, LogoHeader } from '@components';

// styles
import styles from './styles';

// context
import { FilterWatchlistProvider } from './context';

// navigation
import { BottomTabStackParamList } from 'root-stack-params';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface Props
  extends NativeStackScreenProps<BottomTabStackParamList, 'Watchlist'> {}
const WatchListContent: React.FC<Props> = () => {
  return (
    <Container style={styles.container}>
      <LogoHeader />
      <UserInfoSection />
      <MainFilter />
    </Container>
  );
};

const WatchListScreen: React.FC<Props> = props => {
  return (
    <FilterWatchlistProvider>
      <WatchListContent {...props} />
    </FilterWatchlistProvider>
  );
};

export default WatchListScreen;
