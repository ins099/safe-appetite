import {NavigationProp, RouteProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Button,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale, vs} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import CustomIcon from '../../components/CustomIcon';
import {TextBig, TextSmall} from '../../components/CustomText';
import {RatingTypes} from '../../components/interface';
import Sheet from '../../components/Sheet';
import StepFormWrapper from '../../components/wrapper/StepFormWrapper';
import {AuthStackParamList} from '../../navigation/interface';
import {COLORS} from '../../utils/theme';
import {useQuestions} from './useQuestions';
import {
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

interface QuestionScreenProps {
  navigation: NavigationProp<AuthStackParamList>;
  route: RouteProp<AuthStackParamList>;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = props => {
  const {navigation, route} = props;
  const type = route.params?.type;
  const isEdit = type !== null && type !== undefined;
  const {control, handleSubmit} = useForm();
  const [activeStep, setActiveStep] = useState<number>(type ? type : 0);
  const [showSheet, setShowSheet] = useState(false);
  const [suggest, setSuggest] = useState<string>('');
  const [suggestions, setSuggestions] = useState<
    {
      title: string;
      type: RatingTypes;
    }[]
  >([]);

  const {
    myDiets,
    dietQuestions,
    loadMoreDietQuestions,
    debouncedDietSearchText,
    dietFetching,
    refetchDietQuestions,

    myIntolerants,
    intolerantQuestions,
    loadMoreIntolerantQuestions,
    debouncedIntolerantSearchText,
    refetchIntolerantQuestions,
    intolerantFetching,

    myDislikes,
    dislikeQuestions,
    loadMoreDislikeQuestions,
    debouncedDislikeSearchText,
    refetchDislikeQuestions,
    dislikeFetching,

    myAllergies,
    allergicQuestions,
    loadMoreAllergicQuestions,
    debouncedAllergicSearchText,
    refetchAllergicQuestions,
    allergicFetching,

    userAddLoading,
    handleAddQuestionsAns,

    handleAddSuggestion,
    suggestLoading,
  } = useQuestions();

  const STEPS = [
    {
      id: '1',
      title: 'Dietary Preferences',
      type: 'DIETERY_PREFERENCES',
      description: 'Choose as many options as you want',
      fields: [
        {
          defaultValue: myDiets,
          id: '1',
          type: 'options',
          name: 'deitPreferences',
          options: dietQuestions,
          isSearch: true,
          refreshing: dietFetching,
          onRefetch: refetchDietQuestions,
          isEdit: isEdit,
          onReachEnd: () => loadMoreDietQuestions(),
          onSearch: (txt: string) => debouncedDietSearchText(txt),
        },
      ],
    },
    {
      id: '2',
      title: "I'm Allergic to..",
      description: 'Choose as many options as you want',
      type: 'MY_ALLERGENS',
      fields: [
        {
          defaultValue: myAllergies,
          id: '1',
          type: 'options',
          name: 'allergics',
          options: allergicQuestions,
          isSearch: true,
          isEdit: isEdit,
          refreshing: allergicFetching,
          onRefetch: refetchAllergicQuestions,
          onReachEnd: () => loadMoreAllergicQuestions(),
          onSearch: (txt: string) => debouncedAllergicSearchText(txt),
        },
      ],
    },
    {
      id: '3',
      title: "I'm intollerant to..",
      description: 'Choose as many options as you want',
      type: "'MY_INTOLERENCES'",
      fields: [
        {
          id: '1',
          defaultValue: myIntolerants,
          type: 'options',
          name: 'intollerants',
          options: intolerantQuestions,
          isSearch: true,
          isEdit: isEdit,
          refreshing: intolerantFetching,
          onRefetch: refetchIntolerantQuestions,
          onReachEnd: () => loadMoreIntolerantQuestions(),
          onSearch: (txt: string) => debouncedIntolerantSearchText(txt),
        },
      ],
    },
    {
      id: '4',
      title: 'Dislikes',
      type: 'DISLIKES',
      description: 'Is there any ingredient that you want to avoid?',
      fields: [
        {
          id: '1',
          type: 'options',
          name: 'dislikes',
          defaultValue: myDislikes,
          options: dislikeQuestions,
          isSearch: true,
          isEdit: isEdit,
          refreshing: dislikeFetching,
          onRefetch: refetchDislikeQuestions,
          onReachEnd: () => loadMoreDislikeQuestions(),
          onSearch: (txt: string) => debouncedDislikeSearchText(txt, 'dislike'),
        },
      ],
    },
  ];

  const onPressNext = async (data: any) => {
    if (isEdit) {
      return await handleAddQuestionsAns(data, true);
    }
    setActiveStep(p => {
      if (p >= 0 && p < STEPS.length - 1) return p + 1;
      return p;
    });
    if (activeStep === 3) {
      await handleAddQuestionsAns(data);
    }
  };

  const onPressPrev = () => {
    if (isEdit) {
      return navigation.goBack();
    }
    setActiveStep(p => {
      if (p >= 1) {
        return p - 1;
      }
      return p;
    });
  };

  const openAddSuggestionSheet = () => {
    setShowSheet(p => !p);
  };

  const handleRemoveTag = arg => {
    setSuggestions(p => p.filter(i => i.title !== arg.title));
  };

  const onAddTag = arg => {
    setSuggestions(p => [...p, arg]);
    setSuggest('');
  };

  const handleSubmitSuggestions = async () => {
    const res = await handleAddSuggestion({suggessions: suggestions});
    if (res == 'success') {
      setShowSheet(false);
      setSuggestions([]);
    }
  };

  return (
    <>
      <StepFormWrapper
        control={control}
        formFields={STEPS[activeStep].fields}
        // formFields={[]}
        // formContainerStyle={{paddingTop: scale(10)}}
        title={STEPS[activeStep].title}
        description={STEPS[activeStep].description}
        isHeader
        showAddSuggestions
        showSteps={!isEdit}
        pages={STEPS.length}
        currentPage={activeStep}
        hideScrollView
        onPressBack={onPressPrev}
        openAddSuggestionSheet={openAddSuggestionSheet}>
        <View style={{height: vs(60)}}>
          <View style={styles.buttonContainer}>
            {!isEdit && (
              <CustomButton
                title={'Skip'}
                tirtiary
                containerStyle={{marginVertical: scale(15)}}
                onPress={handleSubmit(onPressNext)}
                loading={userAddLoading}
              />
            )}
            <CustomButton
              title={'Continue'}
              width={isEdit ? '100%' : '70%'}
              containerStyle={{marginVertical: scale(15)}}
              onPress={handleSubmit(onPressNext)}
              loading={userAddLoading}
            />
          </View>
        </View>
      </StepFormWrapper>
      {showSheet && (
        <View style={styles.backdrop}>
          <Sheet>
            <View style={{alignItems: 'flex-end'}}>
              <CustomIcon
                name="cross"
                type="entypo"
                onPress={() => setShowSheet(false)}
              />
            </View>
            <View style={styles.textContainer}>
              <TextBig bold>Can't find? Tell us</TextBig>
              <TextSmall color={COLORS.grey}>
                Add as many options to the list and we’ll review within 24hrs
              </TextSmall>
            </View>
            <View style={styles.tagContainer}>
              {suggestions.map(sug => (
                <TouchableOpacity
                  style={styles.tag}
                  onPress={() => handleRemoveTag(sug)}>
                  <TextSmall color={COLORS.grey} bold>
                    {sug.title}
                  </TextSmall>
                  <CustomIcon
                    type="entypo"
                    name="cross"
                    size={16}
                    color={COLORS.grey}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Please suggest.."
                placeholderTextColor={COLORS.grey}
                value={suggest}
                onChangeText={text => setSuggest(text)}
              />
              <TouchableOpacity
                style={styles.btn}
                onPress={() =>
                  onAddTag({title: suggest, type: STEPS[activeStep].type})
                }>
                <CustomIcon type="entypo" name="plus" color="white" disabled />
              </TouchableOpacity>
            </View>
            <CustomButton
              title="Submit"
              containerStyle={{marginVertical: 13}}
              onPress={handleSubmitSuggestions}
              loading={suggestLoading}
            />
            {/* </>
            </TouchableWithoutFeedback> */}
          </Sheet>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    // flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  textContainer: {
    // flex: 2.5,
    // paddingHorizontal: ms(15),
    gap: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
  },
  tag: {
    padding: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.grey,
    flexDirection: 'row',
  },
  textInputContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: vs(50),
  },
  input: {
    color: 'black',
    // height: '100%',
    paddingHorizontal: 13,
    height: vs(50),
    flex: 1,
  },
  btn: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: 5,
    height: vs(30),
    aspectRatio: 1,
    marginRight: 10,
    zIndex: 1000,
  },
});
