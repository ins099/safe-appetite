import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {debounce, mergeDataWithoutDuplicates} from '../../../utils/helpers';
import {useGetMyIntolerantQuestionsQuery} from '../../../redux/apis/questionaires';
import {API_URL, QUESTION_TYPES} from '../../../utils/constants';
import {useAppSelector} from '../../../redux/store';

export const useIntolerantQuestions = (limit: number) => {
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [intolerantQuestions, setIntolerantQuestions] = useState<any[]>([]);
  const [lastItem, setLastItem] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = useAppSelector(store => store.userSlice.accessToken);

  // Fetch user's intolerant questions
  const {data: myIntolerantsData} = useGetMyIntolerantQuestionsQuery({});
  let myIntolerants = myIntolerantsData?.data?.categories || [];

  // Fetch intolerants questions with search
  const fetchIntolerantQuestions = async (
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
          type: QUESTION_TYPES.intolerants,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const categories = response.data?.data?.categories || [];
      if (categories.length > 0) {
        setIntolerantQuestions(prev =>
          isSearching
            ? categories
            : mergeDataWithoutDuplicates(prev, categories),
        );
      }
      setIsSearching(false);
    } catch (error) {
      console.error('Error fetching intolerant questions:', error);
    } finally {
      setIsFetching(false);
      setIsLoading(false);
    }
  };

  // Handle search text with debounce
  const debouncedIntolerantSearchText = useCallback(
    debounce((search: string) => {
      setSearchText(search);
      setIsSearching(true);
      setIntolerantQuestions([]); // Reset questions on search
      setLastItem(''); // Reset cursor on search
      fetchIntolerantQuestions(search, limit, ''); // Fetch new data
    }, 400),
    [],
  );

  useEffect(() => {
    if (!isSearching && searchText === '') {
      fetchIntolerantQuestions(searchText, limit, lastItem);
    }
  }, [lastItem, searchText]);

  const loadMoreIntolerantQuestions = () => {
    if (!isFetching) {
      const lastId = intolerantQuestions[intolerantQuestions.length - 1]?._id;
      setLastItem(lastId);
    }
  };

  return {
    myIntolerants,
    intolerantQuestions,
    debouncedIntolerantSearchText,
    loadMoreIntolerantQuestions,
    intolerantFetching: isFetching || isLoading,
    refetchIntolerantQuestions: () => fetchIntolerantQuestions(searchText, limit, lastItem),
  };
};
