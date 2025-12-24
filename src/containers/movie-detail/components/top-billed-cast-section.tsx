import { memo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { AppText } from '@components/uikit';
import { CastInfoCard } from '@components/cards';

interface Props {
  casts?: Cast[];
}

const TopBilledCastSection: React.FC<Props> = ({ casts = [] }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText fontSize={22} fontWeight="semibold">
          Top Billed Cast
        </AppText>
      </View>
      <FlatList
        horizontal
        data={casts}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <CastInfoCard cast={item} />}
      />
    </View>
  );
};

export default memo(TopBilledCastSection);

const styles = StyleSheet.create({
  container: {
    gap: 20,
    marginTop: 50,
  },
  header: {
    paddingHorizontal: 30,
  },
  listContainer: {
    gap: 16,
    paddingHorizontal: 30,
  },
});
