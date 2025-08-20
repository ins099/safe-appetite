import React from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale, vs} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';
import {TextBigger, TextSmall} from '../CustomText';
import {useGetUserQuery} from '../../redux/apis/auth';
import {GetUserResponse} from '../../redux/apis/interface';

interface GreyHeadProps {}

const GreyHeadTop: React.FC<GreyHeadProps> = () => {
  const {top} = useSafeAreaInsets();

  const {data, isLoading} = useGetUserQuery({});

  const user = data as GetUserResponse;

  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} barStyle={'dark-content'} />
      <View style={[styles.container, {paddingTop: top}]}>
        <View style={styles.subContainer}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <>
              <TextBigger goku bold color={COLORS.white}>
                {user?.data?.name}
              </TextBigger>
              <TextSmall color={COLORS.white}>{user?.data?.email}</TextSmall>
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default GreyHeadTop;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: scale(20),
    height: vs(130),
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
    justifyContent: 'center',
  },
  subContainer: {height: scale(43), justifyContent: 'space-between'},
});
