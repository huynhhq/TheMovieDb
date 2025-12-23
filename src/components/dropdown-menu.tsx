import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// theme
import { colors } from '@theme/colors';

// components
import { AppText } from './uikit';
import { ChevronRight } from '@assets/icons';

// Constants
const LIST_GAP = 8;
const HEADER_HEIGHT = 50;
const MAX_LIST_HEIGHT = 250;
const HORIZONTAL_PADDING = 17;
const ANIMATION_DURATION = 300;
const ITEM_PADDING_VERTICAL = 8;
const LIST_PADDING_VERTICAL = 20;
const ITEM_PADDING_HORIZONTAL = 14;
const DEFAULT_TEST_ID = 'dropdown';

interface Props {
  title: string;
  testID?: string;
  disabled?: boolean;
  options: MenuItem[];
  maxHeight?: number;
  selectedValue?: string;
  onChange?: (value: string) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

export type MenuItem = {
  name: string;
  value: string;
};

interface MenuItemProps {
  item: MenuItem;
  testID: string;
  isSelected: boolean;
  onPress: (value: string) => void;
}

const DropdownMenuItem: React.FC<MenuItemProps> = React.memo(
  ({ item, testID, isSelected, onPress }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.itemContainer, isSelected && styles.activeItemContainer]}
      accessibilityRole="menuitem"
      accessibilityState={{ selected: isSelected }}
      testID={testID}
      onPress={() => onPress(item.value)}
    >
      <AppText color={isSelected ? colors.white : colors.black}>
        {item.name}
      </AppText>
    </TouchableOpacity>
  ),
);

DropdownMenuItem.displayName = 'DropdownMenuItem';

const DropdownMenu: React.FC<Props> = React.memo(
  ({
    title,
    testID,
    options = [],
    selectedValue,
    disabled = false,
    maxHeight = MAX_LIST_HEIGHT,
    onOpen,
    onClose,
    onChange,
  }) => {
    const baseTestId = testID ?? DEFAULT_TEST_ID;

    const [visible, setVisible] = useState(false);
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const heightAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    const listHeight = useMemo(() => {
      const itemHeight = ITEM_PADDING_VERTICAL * 2 + 20;
      const totalItemsHeight =
        (itemHeight + LIST_GAP) * options.length - LIST_GAP;
      const fullHeight = totalItemsHeight + LIST_PADDING_VERTICAL * 2 + 1;
      return Math.min(fullHeight, maxHeight);
    }, [options.length, maxHeight]);

    useEffect(() => {
      if (visible) {
        onOpen?.();
      } else {
        onClose?.();
      }
    }, [visible, onOpen, onClose]);

    const handleOpen = useCallback(() => {
      if (disabled) return;

      const willBeVisible = !visible;
      setVisible(willBeVisible);

      Animated.parallel([
        Animated.timing(rotateAnim, {
          toValue: willBeVisible ? 1 : 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(heightAnim, {
          toValue: willBeVisible ? listHeight : 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnim, {
          toValue: willBeVisible ? 1 : 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
      ]).start();
    }, [disabled, visible, rotateAnim, heightAnim, opacityAnim, listHeight]);

    const handleSelect = useCallback(
      (value: string) => {
        if (value !== selectedValue) onChange?.(value);

        setVisible(false);

        Animated.parallel([
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
          }),
          Animated.timing(heightAnim, {
            toValue: 0,
            duration: ANIMATION_DURATION,
            useNativeDriver: false,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
          }),
        ]).start();
      },
      [rotateAnim, heightAnim, opacityAnim, selectedValue, onChange],
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
          activeOpacity={0.7}
          disabled={disabled}
          style={styles.header}
          accessibilityRole="button"
          testID={`${baseTestId}-header`}
          accessibilityLabel={`${title} dropdown menu`}
          accessibilityState={{ expanded: visible, disabled }}
          accessibilityHint={visible ? 'Tap to close menu' : 'Tap to open menu'}
          onPress={handleOpen}
        >
          <AppText fontSize={16} fontWeight="semibold">
            {title}
          </AppText>
          <Animated.View style={chevronStyle}>
            <ChevronRight />
          </Animated.View>
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.listWrapper,
            visible && styles.listBorder,
            {
              height: heightAnim,
            },
          ]}
        >
          <Animated.View style={[styles.list, { opacity: opacityAnim }]}>
            <ScrollView
              style={styles.list}
              nestedScrollEnabled
              accessibilityRole="menu"
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.listContent}
            >
              {options.map(option => (
                <DropdownMenuItem
                  key={option.value}
                  item={option}
                  isSelected={option.value === selectedValue}
                  testID={`${baseTestId}-option-${option.value}`}
                  onPress={handleSelect}
                />
              ))}
            </ScrollView>
          </Animated.View>
        </Animated.View>
      </View>
    );
  },
);

DropdownMenu.displayName = 'DropdownMenu';

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
  listWrapper: {
    overflow: 'hidden',
  },
  listBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.border_e3,
  },
  list: {
    flex: 1,
  },
  listContent: {
    gap: LIST_GAP,
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
