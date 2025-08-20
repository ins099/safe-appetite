/* eslint-disable react-hooks/exhaustive-deps */
import {useDietQuestions} from './hooks/useDietQuestions';
import {useIntolerantQuestions} from './hooks/useIntolerantQuestions';
import {useAllergicQuestions} from './hooks/useAllergicQuestions';
import {useDislikeQuestions} from './hooks/useDislikeQuestions';
import {
  useAddUserQuestionairesMutation,
  useSuggestionOptionsMutation,
} from '../../redux/apis/questionaires';
import {useCallback} from 'react';
import {utility} from '../../utils/utility';
import {setIsRegister} from '../../redux/reducers/userSlice';
import {useAppDispatch} from '../../redux/store';
import {
  useGetMyFavouriteProductsQuery,
  useGetMyProductsQuery,
} from '../../redux/apis/product';
import {useNavigation} from '@react-navigation/native';

const LIMIT = 20;

export const useQuestions = () => {
  const dispatch = useAppDispatch();
  const {refetch: refetchHistory} = useGetMyProductsQuery({});
  const {refetch: refetechFav} = useGetMyFavouriteProductsQuery({});

  const [suggestOption, {isLoading: suggestLoading}] =
    useSuggestionOptionsMutation();

  const navigation = useNavigation();

  const diet = useDietQuestions(LIMIT);
  const intolerant = useIntolerantQuestions(LIMIT);
  const allergic = useAllergicQuestions(LIMIT);
  const dislike = useDislikeQuestions(LIMIT);

  const [addUserQuestionAns, {isLoading: userAddLoading}] =
    useAddUserQuestionairesMutation();

  // Handle adding user question answers
  const handleAddQuestionsAns = useCallback(
    async (formData: any[], isEdit: boolean = false) => {
      try {
        let linkCategories: string[] = [];
        let unlinkCategories: string[] = [];

        Object.keys(formData).forEach((key: any) => {
          if (Array.isArray(formData[key])) {
            let values = formData[key]
              .filter(i => i.isLinked)
              .map((i: any) => i?._id);
            linkCategories = [...linkCategories, ...values];
            if (isEdit) {
              let unLinkVals = formData[key]
                .filter(i => !i.isLinked)
                .map((i: any) => i?._id);
              unlinkCategories = [...unlinkCategories, ...unLinkVals];
            }
          }
        });

        const body = {linkCategories, unlinkCategories};
        const response = await addUserQuestionAns(body);

        const error = (response.error as any) || null;
        if (error) {
          return utility.showToast?.show(
            error?.error || Array.isArray(error?.data?.message)
              ? error?.data?.error[0]
              : error?.data?.error || 'Something went wrong',
          );
        }
        if (isEdit) {
          // Get List on Update
          refetchHistory();
          refetechFav();
          navigation.goBack();
        }
        const data = response.data;
        // utility.showToast?.show(data.message, {type: 'success'});
        dispatch(setIsRegister(false));
      } catch (error) {
        console.log('Error handleAddQuestions', error);
      }
    },
    [addUserQuestionAns, dispatch],
  );

  const handleAddSuggestion = async (body: any) => {
    try {
      console.log('BODY', body);
      const response = await suggestOption(body);
      const error = (response.error as any) || null;
      console.log(JSON.stringify(response, null, 1));
      if (error) {
        return utility.showToast?.show(
          error?.error || Array.isArray(error?.data?.message)
            ? error?.data?.error[0]
            : error?.data?.error || 'Something went wrong',
        );
      }
      return 'success';
    } catch (error) {
      console.log('Error handleAddQuestions', error);
    }
  };

  return {
    ...diet,
    ...intolerant,
    ...allergic,
    ...dislike,
    handleAddQuestionsAns,
    userAddLoading,
    suggestLoading,
    handleAddSuggestion,
  };
};
