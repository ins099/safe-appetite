import React from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import Logo from '../../assets/images/Logo.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomIcon from '../CustomIcon';
import {COLORS} from '../../utils/theme';
import {scale} from 'react-native-size-matters';
import Pagination from '../Pagination';
import {PaginationProps} from '../interface';
import {useNavigation} from '@react-navigation/native';

interface AppHeaderProps extends PaginationProps {
  containerStyle?: ViewStyle;
  isHeader?: boolean;
  showSteps?: boolean;
  onPressBack?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = props => {
  const {containerStyle, isHeader, showSteps, onPressBack, ...paginationProps} =
    props;
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  if (isHeader) {
    return (
      <View style={[styles.headerContainer, {marginTop: top}]}>
        <TouchableOpacity
          style={styles.backContainer}
          onPress={typeof onPressBack !== 'function' ? goBack : onPressBack}>
          <CustomIcon
            name="chevron-left"
            type="material-icons"
            disabled
            color={COLORS.white}
          />
        </TouchableOpacity>
        {showSteps && <Pagination {...paginationProps} />}
      </View>
    );
  }
  return (
    <View style={[styles.container, {marginTop: top || 5}, containerStyle]}>
      <Logo />
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: scale(60),
    paddingHorizontal: scale(20),
  },
  backContainer: {
    padding: scale(5),
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 100,
  },
});
