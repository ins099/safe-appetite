import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {debounce, mergeDataWithoutDuplicates} from '../../../utils/helpers';
import {useGetMyAllergicQuestionsQuery} from '../../../redux/apis/questionaires';
import {API_URL, QUESTION_TYPES} from '../../../utils/constants';
import {useAppSelector} from '../../../redux/store';

export const useAllergicQuestions = (limit: number) => {
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [allergicQuestions, setAllergicQuestions] = useState<any[]>([]);
  const [lastItem, setLastItem] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = useAppSelector(store => store.userSlice.accessToken);

  const {data: myAllgeriesData = {data: {categories: []}}} =
    useGetMyAllergicQuestionsQuery({});
  const myAllergies = myAllgeriesData?.data?.categories;

  // Fetch allergic questions with search
  const fetchAllergicQuestions = async (
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
          type: QUESTION_TYPES.allergics,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const categories = response.data?.data?.categories || [];
      if (categories.length > 0) {
        setAllergicQuestions(prev =>
          isSearching
            ? categories
            : mergeDataWithoutDuplicates(prev, categories),
        );
      }
      setIsSearching(false);
    } catch (error) {
      console.error('Error fetching allergic questions:', error);
    } finally {
      setIsFetching(false);
      setIsLoading(false);
    }
  };

  // Handle search text with debounce
  const debouncedAllergicSearchText = useCallback(
    debounce((search: string) => {
      setSearchText(search);
      setIsSearching(true);
      setAllergicQuestions([]); // Reset questions on search
      setLastItem(''); // Reset cursor on search
      fetchAllergicQuestions(search, limit, ''); // Fetch new data
    }, 400),
    [],
  );

  useEffect(() => {
    if (!isSearching && searchText === '') {
      fetchAllergicQuestions(searchText, limit, lastItem);
    }
  }, [lastItem, searchText]);

  const loadMoreAllergicQuestions = () => {
    if (!isFetching) {
      const lastId = allergicQuestions[allergicQuestions.length - 1]?._id;
      setLastItem(lastId);
    }
  };

  return {
    myAllergies,
    allergicQuestions,
    debouncedAllergicSearchText,
    loadMoreAllergicQuestions,
    allergicFetching: isFetching || isLoading,
    refetchAllergicQuestions: () =>
      fetchAllergicQuestions(searchText, limit, lastItem),
  };
};
