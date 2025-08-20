import React from 'react';
import {StyleSheet, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';
import {PaginationProps} from '../interface';

const Pagination: React.FC<PaginationProps> = props => {
  const {containerStyle, pages = 0, currentPage = 0, pagStyle} = props;

  return (
    <View style={[styles.container, containerStyle]}>
      {Array.from(Array(pages)).map((_i, index) => (
        <View
          key={index.toString()}
          style={[
            styles.pagBar,
            index <= currentPage && {backgroundColor: COLORS.secondary},
            pagStyle,
          ]}
        />
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'flex-end',
  },
  pagBar: {
    minWidth: 50,
    padding: 2,
    borderRadius: 5,
    backgroundColor: COLORS.primaryLight,
    marginHorizontal: scale(3),
  },
});
