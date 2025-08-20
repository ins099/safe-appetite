import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ms, scale, vs} from 'react-native-size-matters';
import SuggestionSVG from '../../assets/images/suggestion.svg';
import {COLORS} from '../../utils/theme';
import {TextBig, TextNormal, TextSmall} from '../CustomText';

interface AddSuggestionsProps {
  openAddSuggestionSheet?: () => void;
}

const AddSuggestions: React.FC<AddSuggestionsProps> = props => {
  const {openAddSuggestionSheet} = props;

  return (
    <View style={styles.container}>
      <SuggestionSVG />
      <View style={styles.textContainer}>
        <TextBig bold>Can't find? Tell us</TextBig>
        <TextSmall color={COLORS.grey}>Our team will add it to list</TextSmall>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={openAddSuggestionSheet}>
          <TextNormal color={'white'} bold>
            Add
          </TextNormal>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddSuggestions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    padding: 15,
    paddingHorizontal: 25,
    height: vs(80),
    borderRadius: 10,
    marginVertical: 10,
    width: Dimensions.get('window').width + 10,
    left: -scale(25),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 2.5,
    paddingHorizontal: ms(15),
    gap: 10,
  },
  btnContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: 10,
  },
  sheetContainer: {
    position: 'absolute',
    zIndex: 1000,
    bottom: 0,
  },
});
