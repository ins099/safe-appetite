
import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {debounce, mergeDataWithoutDuplicates} from '../../../utils/helpers';
import {useGetMyDietQuestionsQuery} from '../../../redux/apis/questionaires';
import {API_URL, QUESTION_TYPES} from '../../../utils/constants';
import {useAppSelector} from '../../../redux/store';

export const useDietQuestions = (limit: number) => {
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [dietQuestions, setDietQuestions] = useState<any[]>([]);
  const [lastItem, setLastItem] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = useAppSelector(store => store.userSlice.accessToken);

  // Fetch user's diet questions
  const {data: myDietsData} = useGetMyDietQuestionsQuery({});
  let myDiets = myDietsData?.data?.categories || [];

  // Fetch dietary questions with search
  const fetchDietQuestions = async (
    search: string,
    limit: number,
    cursor: string,
  ) => {
    setIsFetching(true);
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}category`, {
        params: {
          searchText: search,
          limit,
          cursor,
          type: QUESTION_TYPES.dietPreference,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const categories = response.data?.data?.categories || [];
      if (categories.length > 0) {
        setDietQuestions(prev =>
          isSearching
            ? categories
            : mergeDataWithoutDuplicates(prev, categories),
        );
      }
      setIsSearching(false);
    } catch (error) {
      console.error('Error fetching diet questions:', error);
    } finally {
      setIsFetching(false);
      setIsLoading(false);
    }
  };

  // Handle search text with debounce
  const debouncedDietSearchText = useCallback(
    debounce((search: string) => {
      setSearchText(search);
      setIsSearching(true);
      setDietQuestions([]); // Reset questions on search
      setLastItem(''); // Reset cursor on search
      fetchDietQuestions(search, limit, ''); // Fetch new data
    }, 400),
    [],
  );

  useEffect(() => {
    if (!isSearching && searchText === '') {
      fetchDietQuestions(searchText, limit, lastItem);
    }
  }, [lastItem, searchText]);

  const loadMoreDietQuestions = () => {
    if (!isFetching) {
      const lastId = dietQuestions[dietQuestions.length - 1]?._id;
      setLastItem(lastId);
    }
  };

  return {
    myDiets,
    dietQuestions,
    debouncedDietSearchText,
    loadMoreDietQuestions,
    dietFetching: isFetching || isLoading,
    refetchDietQuestions: () => fetchDietQuestions(searchText, limit, lastItem),
  };
};
