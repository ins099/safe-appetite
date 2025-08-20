import React from 'react';
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import {scale} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';

interface ITextProps extends TextProps {
  underline?: boolean;
  bold?: boolean;
  color?: any;
  textStyle?: TextStyle;
  italic?: boolean;
  center?: boolean;
  left?: boolean;
  right?: boolean;
  goku?: boolean;
}

export const TextNormal: React.FC<ITextProps> = props => {
  const {
    children,
    color,
    underline,
    textStyle,
    italic,
    bold,
    center,
    right,
    left,
    goku,
  } = props;
  return (
    <Text
      style={[
        styles.text,
        styles.normal,
        color && {color},
        underline && styles.underline,
        textStyle && textStyle,
        italic && styles.italic,
        bold && styles.bold,
        center && styles.center,
        right && styles.right,
        left && styles.left,
        // goku && styles.goku,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export const TextSmall: React.FC<ITextProps> = props => {
  const {
    children,
    color,
    underline,
    textStyle,
    italic,
    bold,
    center,
    right,
    left,
    goku,
  } = props;
  return (
    <Text
      style={[
        styles.text,
        styles.small,
        color && {color},
        underline && styles.underline,
        textStyle && textStyle,
        italic && styles.italic,
        bold && styles.bold,
        center && styles.center,
        right && styles.right,
        left && styles.left,
        // goku && styles.goku,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export const TextSmaller: React.FC<ITextProps> = props => {
  const {
    children,
    color,
    underline,
    textStyle,
    italic,
    bold,
    center,
    right,
    left,
    goku,
  } = props;
  return (
    <Text
      style={[
        styles.text,
        styles.smaller,
        color && {color},
        underline && styles.underline,
        textStyle && textStyle,
        italic && styles.italic,
        bold && styles.bold,
        center && styles.center,
        right && styles.right,
        left && styles.left,
        // goku && styles.goku,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export const TextBig: React.FC<ITextProps> = props => {
  const {
    children,
    color,
    underline,
    textStyle,
    italic,
    bold,
    center,
    right,
    left,
    goku,
  } = props;
  return (
    <Text
      style={[
        styles.text,
        styles.big,
        color && {color},
        underline && styles.underline,
        textStyle && textStyle,
        italic && styles.italic,
        bold && styles.bold,
        center && styles.center,
        right && styles.right,
        left && styles.left,
        // goku && styles.goku,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export const TextBigger: React.FC<ITextProps> = props => {
  const {
    children,
    color,
    underline,
    textStyle,
    italic,
    bold,
    center,
    right,
    left,
    goku,
  } = props;
  return (
    <Text
      style={[
        styles.text,
        styles.bigger,
        color && {color},
        underline && styles.underline,
        textStyle && textStyle,
        italic && styles.italic,
        bold && styles.bold,
        center && styles.center,
        right && styles.right,
        left && styles.left,
        // goku && styles.goku,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  goku: {
    fontFamily: 'Goku Stencil',
    // letterSpacing: 1.5
  },
  text: {
    color: COLORS.black,
    fontFamily: 'Roboto-Regular',
    // fontWeight:'700'
  },
  smaller: {
    fontSize: scale(11),
  },
  small: {
    fontSize: scale(12),
  },
  normal: {
    fontSize: scale(15),
  },
  big: {
    fontSize: scale(16),
  },
  bigger: {
    fontSize: scale(24),
  },
  underline: {
    textDecorationLine: 'underline',
  },
  bold: {fontWeight: '500', fontFamily: 'Roboto-Bold'},
  italic: {fontFamily: 'Roboto-Italic'},
  center: {
    textAlign: 'center',
  },
  left: {
    textAlign: 'left',
  },
  right: {
    textAlign: 'right',
  },
});
