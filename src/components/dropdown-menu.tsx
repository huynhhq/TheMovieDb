import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Animated,
  View,
  Platform,
  UIManager,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';

// theme
import { colors } from '@theme/colors';

// components
import { AppText } from './uikit';
import { ChevronRight } from '@assets/icons';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Constants
const LIST_GAP = 8;
const HEADER_HEIGHT = 50;
const HORIZONTAL_PADDING = 17;
const ITEM_PADDING_VERTICAL = 8;
const LIST_PADDING_VERTICAL = 20;
const ITEM_PADDING_HORIZONTAL = 14;
const DEFAULT_TEST_ID = 'dropdown';

interface Props {
  title: string;
  testID?: string;
  disabled?: boolean;
  options: MenuItem[];
  selectedValue?: string;
  onChange?: (value: string) => void;
}

export type MenuItem = {
  name: string;
  value: string;
};

const DropdownMenu: React.FC<Props> = ({
  title,
  testID,
  options = [],
  selectedValue,
  disabled = false,
  onChange,
}) => {
  const baseTestId = testID ?? DEFAULT_TEST_ID;

  const [visible, setVisible] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const handleOpen = useCallback(() => {
    if (disabled) return;

    const willBeVisible = !visible;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setVisible(willBeVisible);

    Animated.timing(rotateAnim, {
      toValue: willBeVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [disabled, visible, rotateAnim]);

  const handleSelect = useCallback(
    (value: string) => {
      if (value !== selectedValue) onChange?.(value);

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setVisible(false);

      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    },
    [rotateAnim, selectedValue, onChange],
  );

  const chevronRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const chevronStyle = useMemo(
    () => ({
      transform: [{ rotate: chevronRotation }],
    }),
    [chevronRotation],
  );

  return (
    <View
      testID={baseTestId}
      style={[styles.container, disabled && styles.disabledContainer]}
    >
      <TouchableOpacity
        style={styles.header}
        onPress={handleOpen}
        disabled={disabled}
        accessibilityRole="button"
        testID={`${baseTestId}-header`}
        accessibilityLabel={`${title} dropdown menu`}
        accessibilityState={{ expanded: visible, disabled }}
        accessibilityHint={visible ? 'Tap to close menu' : 'Tap to open menu'}
      >
        <AppText fontSize={16} fontWeight="semibold">
          {title}
        </AppText>
        <Animated.View style={chevronStyle}>
          <ChevronRight />
        </Animated.View>
      </TouchableOpacity>
      {visible && (
        <View style={styles.list} accessibilityRole="menu">
          {options.map(option => {
            const isSelected = option.value === selectedValue;
            return (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.itemContainer,
                  isSelected && styles.activeItemContainer,
                ]}
                onPress={() => handleSelect(option.value)}
                accessibilityRole="menuitem"
                accessibilityState={{ selected: isSelected }}
                testID={`${baseTestId}-option-${option.value}`}
              >
                <AppText color={isSelected ? colors.white : colors.black}>
                  {option.name}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default DropdownMenu;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border_e3,
    backgroundColor: colors.white,
    // shadow
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  disabledContainer: {
    opacity: 0.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: HEADER_HEIGHT,
    justifyContent: 'space-between',
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  list: {
    gap: LIST_GAP,
    borderTopWidth: 1,
    borderTopColor: colors.border_e3,
    paddingVertical: LIST_PADDING_VERTICAL,
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  itemContainer: {
    borderRadius: 3,
    backgroundColor: colors.gray[200],
    paddingVertical: ITEM_PADDING_VERTICAL,
    paddingHorizontal: ITEM_PADDING_HORIZONTAL,
  },
  activeItemContainer: {
    backgroundColor: colors.primary_blue,
  },
});
