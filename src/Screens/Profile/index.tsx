import {NavigationProp, RouteProp} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import AccountList from '../../components/AccountList';
import GreyHeadTop from '../../components/GreyHeadTop';
import {TabStackParamList} from '../../navigation/interface';

import AllergiSVG from '../../assets/images/allergi.svg';
import DietSVG from '../../assets/images/diet.svg';
import DislikeSVG from '../../assets/images/dislike.svg';
import EditSVG from '../../assets/images/edit.svg';
import IntoleranceSVG from '../../assets/images/intolerance.svg';
import LogoutSVG from '../../assets/images/log-out.svg';
import {useUpdateAccount} from '../Account/useUpdateAccount';
import {useQuestions} from '../Questionaire/useQuestions';

interface ProfileScreenProps {
  navigation: NavigationProp<any>;
  route: RouteProp<TabStackParamList>;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  useQuestions();

  const {handleLogoutUser} = useUpdateAccount();

  const ACCOUNTLIST = [
    {
      id: '1',
      label: 'Account',
      icon: EditSVG,
      onPress: () => navigation.navigate('Account'),
    },
    {
      id: '2',
      label: 'Update Password',
      icon: EditSVG,
      onPress: () => navigation.navigate('UpdatePassword'),
    },
    {
      id: '3',
      label: 'Dietery Preferences',
      icon: DietSVG,
      onPress: () => navigation.navigate('Questions', {type: 0}),
    },
    {
      id: '4',
      label: 'My Allergens',
      icon: AllergiSVG,
      onPress: () => navigation.navigate('Questions', {type: 1}),
    },
    {
      id: '5',
      label: 'My Intolerances',
      icon: IntoleranceSVG,
      onPress: () => navigation.navigate('Questions', {type: 2}),
    },
    {
      id: '6',
      label: 'Dislikes',
      icon: DislikeSVG,
      onPress: () => navigation.navigate('Questions', {type: 3}),
    },
    {
      id: '7',
      label: 'Log Out',
      icon: LogoutSVG,
      onPress: () => handleLogoutUser(),
    },
  ];
  return (
    <View style={styles.container}>
      <GreyHeadTop />
      <View style={styles.subContainer}>
        <AccountList list={ACCOUNTLIST} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFB',
  },
  subContainer: {
    paddingHorizontal: scale(20),
    paddingTop: 5,
    flex: 1,
  },
});
