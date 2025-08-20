import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ms, scale, vs} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';
import CustomIcon from '../CustomIcon';
import {TextNormal} from '../CustomText';

interface AccountListProps {
  list: AccountProps[];
}

interface AccountProps {
  icon: any;
  id: string;
  label: string;
  onPress: () => void;
}

const Account: React.FC<AccountProps> = props => {
  const {icon, id, label, onPress} = props;
  return (
    <TouchableOpacity key={id} style={styles.listContainer} onPress={onPress}>
      <View style={styles.listLeftContainer}>
        <View style={styles.iconContainer}>{icon()}</View>
        <TextNormal>{label}</TextNormal>
      </View>
      <CustomIcon name="chevron-right" type="material-community" disabled />
    </TouchableOpacity>
  );
};

const AccountList: React.FC<AccountListProps> = props => {
  const {list} = props;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={styles.container}>
      {list.map(item => (
        <Account key={item.id} {...item} />
      ))}
    </ScrollView>
  );
};

export default AccountList;

const styles = StyleSheet.create({
  container: {
    // rowGap: scale(8),
  },
  listContainer: {
    borderWidth: 1.3,
    borderColor: COLORS.secondary,
    borderRadius: 12,
    paddingHorizontal: ms(12),
    paddingVertical: vs(13),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginBottom: scale(8),
  },
  listLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconContainer: {
    padding: 8,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
  },
});
