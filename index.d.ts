declare module 'react-native-otp-ultimate' {
  import * as React from 'react'
  import {
    NativeSyntheticEvent,
    TextInputKeyPressEventData,
    TextStyle,
    ViewStyle,
  } from 'react-native'

  /**
   * Define types of keyboard
   * There are 4 main types:
   * default, email-address, number-pad and phone-pad
   */
  type KeyboardType = 'numeric'

  export interface InputProps {
    inputCount: number
    inputCellLength: number
    defaultValue?: string
    keyboardType?: KeyboardType
    tintColor?: string | []
    offTintColor?: string | []
    handleTextChange?: (text: string) => void
    containerStyle?: ViewStyle
    textInputStyle?: TextStyle
    testIDPrefix?: string
    onCodeFilled?: (code: string) => void
  }

  export interface OTPInputViewState {
    focusedInput: number
    otpText: string[]
    editable: boolean
    fromAutoFill: boolean
  }

  export default class OTPInputView extends React.Component<
    InputProps,
    OTPInputViewState
  > {
    static defaultProps: InputProps
    inputs: TextInput[]
    private hasCheckedClipBoard?
    private clipBoardCode?
    private timer?
    constructor(props: InputProps)
    componentDidMount(): void
    componentWillUnmount(): void
    checkTintColorCount: () => void
    basicValidation: (text: string) => RegExpMatchArray | null
    onTextChange: (text: string, i: number) => void
    onInputFocus: (i: number) => void
    private copyCodeFromClipBoardOnAndroid
    checkPinCodeFromClipBoard: () => void
    blurAllFields: () => void
    onKeyPress: (
      e: NativeSyntheticEvent<TextInputKeyPressEventData>,
      i: number,
    ) => void
    clear: () => void
    setValue: (value: string) => void
    render(): JSX.Element
  }
}
