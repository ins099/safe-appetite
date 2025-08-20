import React, {useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale, vs} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';
import CustomIcon from '../CustomIcon';
import Input from '../CustomInput';
import {TextNormal, TextSmall} from '../CustomText';
import {OptionListProps, OptionProps} from '../interface';
import ListEmptyComponent from '../ListEmpty';

const Option: React.FC<OptionProps> = props => {
  const {title, description, isChecked, onPress} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.option, isChecked && {backgroundColor: COLORS.primary}]}
      onPress={onPress}>
      <View style={styles.optionInnerCol}>
        <TextNormal bold color={isChecked && COLORS.white}>
          {title}
        </TextNormal>
        {description && description !== '-' && (
          <TextSmall
            textStyle={{marginTop: 3}}
            color={isChecked ? COLORS.white : COLORS.grey}>
            {description}
          </TextSmall>
        )}
      </View>
      {isChecked && (
        <CustomIcon
          type="material-community"
          name="checkbox-marked"
          color={COLORS.white}
          disabled
          size={scale(20)}
        />
      )}
    </TouchableOpacity>
  );
};

const OptionList: React.FC<OptionListProps> = props => {
  const {
    containerStyles,
    isSearch,
    isEdit,
    value = [],
    onChange,
    isMultiple = true,
    limit,
    options = [],
  } = props;

  const [search, setSearch] = useState('');

  const onSearch = (txt: string) => {
    console.log('INSIDER---', txt);
    setSearch(txt);
    props?.onSearch && props?.onSearch(txt);
  };

  const onReachEnd = () => {
    props?.onReachEnd && props?.onReachEnd();
  };

  const onPressOption = (option: OptionProps) => {
    const {_id} = option;
    const isExist = value.find(v => v._id === _id);
    const copOptions = {...option, isLinked: !isExist?.isLinked};

    // If the limit is reached and option doesn't exist, exit early
    if (isMultiple && limit && value.length === limit && !isExist) {
      return;
    }

    // Toggle the option selection
    if (isExist) {
      const filter = value.filter(i => i._id !== _id);
      if (!isEdit) {
        onChange(filter); // Remove if it exists
      } else {
        onChange([...filter, copOptions]);
      }
    } else {
      onChange(isMultiple ? [...value, copOptions] : [copOptions]); // Add based on isMultiple
    }
  };

  return (
    <View style={[styles.container, containerStyles]}>
      {isSearch && (
        <Input
          containerStyle={{backgroundColor: COLORS.lightgrey}}
          value={search}
          placeholder="Search"
          onChange={onSearch}
          icon={{name: 'search', type: 'feather', size: scale(20)}}
        />
      )}
      <FlatList
        data={options}
        keyExtractor={opt => opt._id}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={ListEmptyComponent}
        // inverted
        style={{height: vs(360)}}
        refreshing={props?.refreshing}
        refreshControl={
          <RefreshControl
            refreshing={!!props?.refreshing}
            onRefresh={props?.onRefresh}
          />
        }
        onEndReached={onReachEnd}
        renderItem={({item}) => {
          const isLinked = value.find(opt => opt._id === item._id)?.isLinked;

          return (
            <Option
              {...item}
              isChecked={isLinked}
              onPress={() => onPressOption(item)}
            />
          );
        }}
      />
    </View>
  );
};

export default OptionList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  optionContainer: {},
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale(18),
    borderRadius: 12,
    backgroundColor: COLORS.secondary,
    marginVertical: 4,
  },
  optionInnerCol: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
});
