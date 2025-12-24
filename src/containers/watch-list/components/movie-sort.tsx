import React, { useCallback, useRef, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { AppText } from '@components/uikit';
import { Cancel, ChevronDown, Check } from '@assets/icons';

import { colors } from '@theme/colors';
import { DEFAULT_FONTS } from '@theme/fonts';
import DeviceInfo from '@helpers/device-info';
import { MOVIE_SORT_OPTIONS } from '@values/constants';

interface Props {
  value: string;
  onChange: (value: string) => void;
}
const DateSort: React.FC<Props> = ({
  value: sortBy = MOVIE_SORT_OPTIONS[0].value,
  onChange,
}) => {
  const ref = useRef<BottomSheetModal>(null);

  const selected = useMemo(
    () => MOVIE_SORT_OPTIONS.find(option => option.value === sortBy),
    [sortBy],
  );

  const handlePresent = useCallback(() => {
    ref.current?.present();
  }, []);

  const onClose = useCallback(() => {
    ref.current?.dismiss();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.6}
      />
    ),
    [],
  );

  const handleOnPress = useCallback(
    (value: string) => {
      onChange(value);
      onClose();
    },
    [onChange, onClose],
  );

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={handlePresent}
        >
          <AppText style={styles.label}>{selected?.label}</AppText>
          <ChevronDown width={16} height={16} color={colors.primary_blue} />
        </TouchableOpacity>
      </View>
      <BottomSheetModal
        ref={ref}
        handleComponent={() => null}
        backgroundStyle={styles.modalBackground}
        onDismiss={onClose}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetScrollView
          contentContainerStyle={styles.content}
          stickyHeaderIndices={[0]}
        >
          <View style={styles.searchContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnClose}
              onPress={onClose}
            >
              <Cancel width={20} height={20} />
            </TouchableOpacity>
            <AppText style={styles.title}>Sort by</AppText>
          </View>
          <View style={styles.listContainer}>
            {MOVIE_SORT_OPTIONS.map((item, index) => {
              const isSelected = item.value === selected?.value;

              return (
                <TouchableOpacity
                  key={index}
                  style={styles.listItem}
                  onPress={() => handleOnPress(item.value)}
                >
                  <AppText style={styles.itemText}>{item.label}</AppText>
                  {isSelected && <Check color={colors.primary_blue} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
};

export default DateSort;

const styles = StyleSheet.create({
  container: {
    gap: 4,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    borderBottomColor: colors.primary_blue
  },
  btnClose: {
    zIndex: 1000,
    width: 27,
    height: 27,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingBottom: DeviceInfo.getBottomSpace(),
  },
  searchContainer: {
    flex: 1,
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomColor: colors.gray[200],
  },
  modalBackground: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    color: colors.primary_blue,
    fontFamily: DEFAULT_FONTS.SourceSans3SemiBold,
  },
  title: {
    fontSize: 16,
    color: colors.black,
    fontFamily: DEFAULT_FONTS.SourceSans3SemiBold,
    textAlign: 'center',
  },
  itemText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: DEFAULT_FONTS.SourceSans3Medium,
  },
  listContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
});
