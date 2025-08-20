import React from 'react';
import {Control} from 'react-hook-form';
import {ScrollView, StatusBar, StyleSheet, View, ViewStyle} from 'react-native';
import {COLORS} from '../../utils/theme';
import AddSuggestions from '../AddSuggestion';
import AppHeader from '../AppHeader';
import {TextBigger, TextSmall} from '../CustomText';
import Fields from '../Fields';
import PrimaryWrapper from './PrimaryWrapper';
import WhiteCurveWrapper from './WhiteCurveWrapper';

interface StepFormWrapper {
  isHeader?: boolean;
  scrollEnabled?: boolean;
  showAddSuggestions?: boolean;
  hideScrollView?: boolean;
  showSteps?: boolean;
  children?: React.ReactNode;
  control: Control<any, any>;
  formFields: any[];
  formContainerStyle?: ViewStyle;
  pagStyle?: ViewStyle;
  currentPage?: number;
  pages?: number;
  title: string;
  description: string;
  onPressBack?: () => void;
  openAddSuggestionSheet?: () => void;
}

const StepFormWrapper: React.FC<StepFormWrapper> = props => {
  const {
    isHeader,
    control,
    formFields = [],
    hideScrollView,
    pagStyle,
    showAddSuggestions,
    currentPage,
    pages,
    openAddSuggestionSheet,
    title,
    children,
    description,
    showSteps,
    scrollEnabled,
    onPressBack,
  } = props;

  const Wrapper = hideScrollView ? View : ScrollView;

  return (
    <PrimaryWrapper>
      <StatusBar backgroundColor={COLORS.primary} barStyle={'dark-content'} />
      <AppHeader
        containerStyle={styles.logoContainer}
        isHeader={isHeader}
        currentPage={currentPage}
        pages={pages}
        pagStyle={pagStyle}
        showSteps={showSteps}
        onPressBack={onPressBack}
      />
      <WhiteCurveWrapper>
        <TextBigger goku bold>
          {title}
        </TextBigger>
        <TextSmall textStyle={{marginVertical: 5}} color={COLORS.grey}>
          {description}
        </TextSmall>
        {showAddSuggestions && (
          <AddSuggestions openAddSuggestionSheet={openAddSuggestionSheet} />
        )}
        {/* <View style={[styles.formContainer, formContainerStyle]}> */}
        <Wrapper
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flex: 1}}
          style={hideScrollView ? {flex: 1} : {}}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="never"
          scrollEnabled={scrollEnabled}>
          <Fields control={control} fields={formFields} />
          {children}
        </Wrapper>
        {/* </View> */}
      </WhiteCurveWrapper>
    </PrimaryWrapper>
  );
};

export default StepFormWrapper;

const styles = StyleSheet.create({
  logoContainer: {marginVertical: 10},
});
