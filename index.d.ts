declare module 'react-native-otp-textinput' {
  import * as React from 'react'
  import { TextStyle, ViewStyle } from 'react-native';

  /**
   * Define types of keyboard
   * There are 4 main types:
   * default, email-address, number-pad and phone-pad
   */
  type KeyboardType =  'numeric'

  export interface InputProps {
    inputCount: number;
    inputCellLength: number;
    defaultValue?: string;
    keyboardType?: KeyboardType;
    tintColor: string | [];
    offTintColor: string | [];
    handleTextChange: (text: string) => () => void;
    containerStyle?: ViewStyle;
    textInputStyle?: TextStyle;
    testIDPrefix?: string;
  }

  export interface OTPInputViewState {
      focusedInput: number;
      otpText: string[];
  }

  export default class OTPInputView extends React.Component<InputProps, OTPInputViewState> {
  }
}