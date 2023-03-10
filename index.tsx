import React, { Component } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Platform,
} from 'react-native'
import { InputProps, OTPInputViewState } from 'react-native-otp-ultimate'
import * as Clipboard from 'expo-clipboard'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    height: 50,
    width: 50,
    borderBottomWidth: 4,
    margin: 5,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '500',
    color: '#000000',
  },
})

const DEFAULT_TINT_COLOR = '#3CB371'
const DEFAULT_OFF_TINT_COLOR = '#DCDCDC'

const getOTPTextChucks = (
  inputCount: number,
  inputCellLength: number,
  text?: string,
) => {
  let otpText: RegExpMatchArray | [] | string[] =
    text?.match(new RegExp('.{1,' + inputCellLength + '}', 'g')) || []

  otpText = otpText.slice(0, inputCount)

  return otpText
}

class OTPTextView extends Component<InputProps, OTPInputViewState> {
  static defaultProps: InputProps = {
    inputCount: 4,
    inputCellLength: 1,
    tintColor: DEFAULT_TINT_COLOR,
    offTintColor: DEFAULT_OFF_TINT_COLOR,
    handleTextChange: (text: string) => {},
  }
  inputs: TextInput[]
  private hasCheckedClipBoard?: boolean
  private clipBoardCode?: string
  private timer?: NodeJS.Timeout

  constructor(props: InputProps) {
    super(props)
    this.state = {
      focusedInput: 0,
      otpText: getOTPTextChucks(
        props.inputCount,
        props.inputCellLength,
        props?.defaultValue,
      ),
      editable: true,
      fromAutoFill: false,
    }

    this.inputs = []

    this.checkTintColorCount()
  }

  componentDidMount() {
    this.copyCodeFromClipBoardOnAndroid()
    // this.bringUpKeyBoardIfNeeded()
    // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide)
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  checkTintColorCount = () => {
    const { tintColor, offTintColor, inputCount } = this.props

    if (typeof tintColor !== 'string' && tintColor?.length !== inputCount) {
      throw new Error(
        "If tint color is an array it's length should be equal to input count",
      )
    }

    if (
      typeof offTintColor !== 'string' &&
      offTintColor?.length !== inputCount
    ) {
      throw new Error(
        "If off tint color is an array it's length should be equal to input count",
      )
    }
  }

  basicValidation = (text: string) => {
    const validText = /^[0-9a-zA-Z]+$/
    return text.match(validText)
  }

  onTextChange = (text: string, i: number) => {
    const { inputCellLength, inputCount, handleTextChange, onCodeFilled } =
      this.props

    if (text && !this.basicValidation(text)) {
      return
    }

    this.setState(
      prevState => {
        const { otpText } = prevState
        if (text.length === inputCount * inputCellLength) {
          text.split('').map((item, index) => {
            otpText[index] = item
          })
          return {
            otpText,
            fromAutoFill: true,
          }
        }
        otpText[i] = text

        return {
          otpText,
          fromAutoFill: false,
        }
      },
      () => {
        handleTextChange && handleTextChange(this.state.otpText.join(''))
        if (
          text.length === inputCount * inputCellLength &&
          this.state.fromAutoFill
        ) {
          this.inputs[this.inputs.length - 1].focus()
        }
        if (
          text.length === inputCellLength &&
          i !== inputCount - 1 &&
          !this.state.fromAutoFill
        ) {
          this.inputs[i + 1].focus()
        }
        if (this.state.otpText.length === inputCount) {
          this.blurAllFields()
          onCodeFilled && onCodeFilled(this.state.otpText.join(''))
        }
      },
    )
  }

  onInputFocus = (i: number) => {
    const { otpText } = this.state

    const prevIndex = i - 1

    if (prevIndex > -1 && !otpText[prevIndex] && !otpText.join('')) {
      this.inputs[prevIndex].focus()
      return
    }

    this.setState({
      focusedInput: i,
    })
  }

  private copyCodeFromClipBoardOnAndroid = () => {
    if (Platform.OS === 'android') {
      this.checkPinCodeFromClipBoard()
      this.timer = setInterval(this.checkPinCodeFromClipBoard, 400)
    }
  }

  checkPinCodeFromClipBoard = () => {
    const { inputCount, onCodeFilled, inputCellLength } = this.props
    const regexp = new RegExp(`^\\d{${inputCount}}$`)
    Clipboard.getStringAsync()
      .then(code => {
        if (
          this.hasCheckedClipBoard &&
          regexp.test(code) &&
          this.clipBoardCode !== code
        ) {
          this.setState(
            {
              otpText: getOTPTextChucks(inputCount, inputCellLength, code),
            },
            () => {
              this.blurAllFields()
              onCodeFilled && onCodeFilled(code)
            },
          )
        }
        this.clipBoardCode = code
        this.hasCheckedClipBoard = true
      })
      .catch(() => {})
  }
  blurAllFields = () => {
    this.inputs.forEach((field: TextInput | null) =>
      (field as TextInput).blur(),
    )
    this.setState({
      editable: false,
    })
  }
  onKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    i: number,
  ) => {
    const val = this.state.otpText[i] || ''
    const { handleTextChange, inputCellLength, inputCount } = this.props
    const { otpText } = this.state

    if (e.nativeEvent.key !== 'Backspace' && val && i !== inputCount - 1) {
      this.inputs[i + 1].focus()
      return
    }

    if (e.nativeEvent.key === 'Backspace' && i !== 0) {
      if (!val.length && otpText[i - 1].length === inputCellLength) {
        this.setState(
          prevState => {
            const { otpText } = prevState

            otpText[i - 1] = otpText[i - 1]
              .split('')
              .splice(0, otpText[i - 1].length - 1)
              .join('')

            return {
              otpText,
            }
          },
          () => {
            handleTextChange && handleTextChange(this.state.otpText.join(''))
            this.inputs[i - 1].focus()
          },
        )
      }
    }
  }

  clear = () => {
    this.setState(
      {
        otpText: [],
        editable: true,
      },
      () => {
        this.inputs[0].focus()
        this.props.handleTextChange && this.props.handleTextChange('')
      },
    )
  }

  setValue = (value: string) => {
    const { inputCount, inputCellLength } = this.props

    const updatedFocusInput = value.length - 1

    this.setState(
      {
        otpText: getOTPTextChucks(inputCount, inputCellLength, value),
      },
      () => {
        if (this.inputs[updatedFocusInput]) {
          this.inputs[updatedFocusInput].focus()
        }

        this.props.handleTextChange && this.props.handleTextChange(value)
      },
    )
  }

  render() {
    const {
      inputCount,
      offTintColor,
      tintColor,
      defaultValue,
      inputCellLength,
      containerStyle,
      textInputStyle,
      keyboardType,
      testIDPrefix,
      ...textInputProps
    } = this.props

    const { focusedInput, otpText } = this.state

    const TextInputs = []

    for (let i = 0; i < inputCount; i += 1) {
      const _tintColor =
        typeof tintColor === 'string'
          ? tintColor
          : Array.isArray(tintColor)
          ? tintColor[i]
          : tintColor
      const _offTintColor =
        typeof offTintColor === 'string'
          ? offTintColor
          : Array.isArray(offTintColor)
          ? offTintColor[i]
          : offTintColor

      const inputStyle = [
        styles.textInput,
        textInputStyle,
        {
          borderColor: _offTintColor,
        },
      ]

      if (focusedInput === i) {
        inputStyle.push({
          borderColor: _tintColor,
        })
      }

      TextInputs.push(
        <TextInput
          ref={e => {
            this.inputs[i] = e as TextInput
          }}
          key={i}
          autoCorrect={false}
          keyboardType={keyboardType}
          autoFocus={i === 0}
          value={otpText[i] || ''}
          editable={this.state.editable}
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          style={inputStyle}
          // maxLength={this.props.inputCellLength}
          onFocus={() => this.onInputFocus(i)}
          onChangeText={text => this.onTextChange(text, i)}
          multiline={false}
          onKeyPress={e => this.onKeyPress(e, i)}
          selectionColor={_tintColor}
          {...textInputProps}
          testID={`${testIDPrefix}${i}`}
        />,
      )
    }

    return <View style={[styles.container, containerStyle]}>{TextInputs}</View>
  }
}

OTPTextView.defaultProps = {
  defaultValue: '',
  inputCount: 4,
  tintColor: DEFAULT_TINT_COLOR,
  offTintColor: DEFAULT_OFF_TINT_COLOR,
  inputCellLength: 1,
  containerStyle: {},
  textInputStyle: {},
  handleTextChange: (text: string) => {},
  keyboardType: 'numeric',
  testIDPrefix: 'otp_input_',
}

export default OTPTextView
