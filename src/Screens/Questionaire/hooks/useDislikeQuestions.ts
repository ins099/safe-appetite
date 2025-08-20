import axios from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {useGetMyDislikesQuestionsQuery} from '../../../redux/apis/questionaires';
import {useAppSelector} from '../../../redux/store';
import {API_URL, QUESTION_TYPES} from '../../../utils/constants';
import {debounce, mergeDataWithoutDuplicates} from '../../../utils/helpers';

export const useDislikeQuestions = (limit: number) => {
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [dislikeQuestions, setDislikeQuestions] = useState<any[]>([]);
  const [lastItem, setLastItem] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = useAppSelector(store => store.userSlice.accessToken);

  // Fetch user's dislike questions
  const {data: myDislikesData} = useGetMyDislikesQuestionsQuery({});
  let myDislikes = myDislikesData?.data?.categories || [];

  // Fetch dislike questions with search
  const fetchDislikeQuestions = async (
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
          type: QUESTION_TYPES.dislikes,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const categories = response.data?.data?.categories || [];
      if (categories.length > 0) {
        setDislikeQuestions(prev =>
          isSearching
            ? categories
            : mergeDataWithoutDuplicates(prev, categories),
        );
      }
      setIsSearching(false);
    } catch (error) {
      console.error('Error fetching dislike questions:', error);
    } finally {
      setIsFetching(false);
      setIsLoading(false);
    }
  };

  // Handle search text with debounce
  const debouncedDislikeSearchText = useCallback(
    debounce((search: string) => {
      setSearchText(search);
      setIsSearching(true);
      setDislikeQuestions([]); // Reset questions on search
      setLastItem(''); // Reset cursor on search
      fetchDislikeQuestions(search, limit, ''); // Fetch new data
    }, 400),
    [],
  );

  useEffect(() => {
    if (!isSearching && searchText === '') {
      fetchDislikeQuestions(searchText, limit, lastItem);
    }
  }, [lastItem, searchText]);

  const loadMoreDislikeQuestions = () => {
    if (!isFetching) {
      const lastId = dislikeQuestions[dislikeQuestions.length - 1]?._id;
      setLastItem(lastId);
    }
  };

  return {
    myDislikes,
    dislikeQuestions,
    debouncedDislikeSearchText,
    loadMoreDislikeQuestions,
    dislikeFetching: isFetching || isLoading,
    refetchDislikeQuestions: () =>
      fetchDislikeQuestions(searchText, limit, lastItem),
  };
};
