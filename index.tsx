import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  KeyboardType,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';

interface IState {
  focusedInput: number;
  otpText: string[];
}

interface IProps {
  defaultValue: string;
  inputCount: number;
  containerStyle: ViewStyle;
  textInputStyle: ViewStyle;
  inputCellLength: number;
  tintColor: string | string[];
  offTintColor: string | string[];
  handleTextChange(text: string): void;
  handleCellTextChange?(text: string, cellIndex: number): void;
  keyboardType: KeyboardType;
  testIDPrefix: string;
  autoFocus: boolean;
}

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
});

const DEFAULT_TINT_COLOR: string = '#3CB371';
const DEFAULT_OFF_TINT_COLOR: string = '#DCDCDC';
const DEFAULT_TEST_ID_PREFIX: string = 'otp_input_';
const DEFAULT_KEYBOARD_TYPE: KeyboardType = 'numeric';

class OTPTextView extends Component<IProps, IState> {
  static defaultProps: Partial<IProps> = {
    defaultValue: '',
    inputCount: 4,
    tintColor: DEFAULT_TINT_COLOR,
    offTintColor: DEFAULT_OFF_TINT_COLOR,
    inputCellLength: 1,
    containerStyle: {},
    textInputStyle: {},
    handleTextChange: () => { },
    keyboardType: DEFAULT_KEYBOARD_TYPE,
    testIDPrefix: DEFAULT_TEST_ID_PREFIX,
    autoFocus: false,
  };

  inputs: TextInput[];

  constructor(props: IProps) {
    super(props);

    this.state = {
      focusedInput: 0,
      otpText: this.getOTPTextChucks(
        props.inputCount || 4,
        props.inputCellLength,
        props.defaultValue,
      ),
    };

    this.inputs = [];

    this.checkTintColorCount();
  }

  getOTPTextChucks = (
    inputCount: number,
    inputCellLength: number,
    text: string,
  ): string[] => {
    let matches =
      text.match(new RegExp('.{1,' + inputCellLength + '}', 'g')) || [];

    return matches.slice(0, inputCount);
  };

  checkTintColorCount = () => {
    const { tintColor, offTintColor, inputCount } = this.props;

    if (typeof tintColor !== 'string' && tintColor.length !== inputCount) {
      throw new Error(
        "If tint color is an array it's length should be equal to input count",
      );
    }

    if (
      typeof offTintColor !== 'string' &&
      offTintColor.length !== inputCount
    ) {
      throw new Error(
        "If off tint color is an array it's length should be equal to input count",
      );
    }
  };

  basicValidation = (text: string) => {
    const validText = /^[0-9a-zA-Z]+$/;
    return text.match(validText);
  };

  onTextChange = (text: string, i: number) => {
    const {
      inputCellLength,
      inputCount,
      handleTextChange,
      handleCellTextChange,
    } = this.props;

    if (text && !this.basicValidation(text)) {
      return;
    }

    this.setState(
      (prevState: IState) => {
        let { otpText } = prevState;

        otpText[i] = text;

        return {
          otpText,
        };
      },
      () => {
        handleTextChange(this.state.otpText.join(''));
        handleCellTextChange && handleCellTextChange(text, i);
        if (text.length === inputCellLength && i !== inputCount - 1) {
          this.inputs[i + 1].focus();
        }
      },
    );
  };

  onInputFocus = (i: number) => {
    const { otpText } = this.state;

    const prevIndex = i - 1;

    if (prevIndex > -1 && !otpText[prevIndex] && !otpText.join('')) {
      this.inputs[prevIndex].focus();
      return;
    }

    this.setState({ focusedInput: i });
  };

  onKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    i: number,
  ) => {
    const val = this.state.otpText[i] || '';
    const { handleTextChange, inputCellLength, inputCount } = this.props;
    const { otpText } = this.state;

    if (e.nativeEvent.key !== 'Backspace' && val && i !== inputCount - 1) {
      this.inputs[i + 1].focus();
      return;
    }

    if (e.nativeEvent.key === 'Backspace' && i !== 0) {
      if (!val.length && otpText[i - 1].length === inputCellLength) {
        this.setState(
          prevState => {
            let { otpText: prevStateOtpText } = prevState;

            prevStateOtpText[i - 1] = prevStateOtpText[i - 1]
              .split('')
              .splice(0, prevStateOtpText[i - 1].length - 1)
              .join('');

            return {
              otpText: prevStateOtpText,
            };
          },
          () => {
            handleTextChange(this.state.otpText.join(''));
            this.inputs[i - 1].focus();
          },
        );
      }
    }
  };

  clear = () => {
    this.setState(
      {
        otpText: [],
      },
      () => {
        this.inputs[0].focus();
        this.props.handleTextChange('');
      },
    );
  };

  setValue = (value: string, isPaste: boolean = false) => {
    const { inputCount, inputCellLength } = this.props;

    const updatedFocusInput = isPaste ? inputCount - 1 : value.length - 1;

    this.setState(
      {
        otpText: this.getOTPTextChucks(inputCount, inputCellLength, value),
      },
      () => {
        if (this.inputs[updatedFocusInput]) {
          this.inputs[updatedFocusInput].focus();
        }

        this.props.handleTextChange(value);
      },
    );
  };

  render() {
    const {
      inputCount,
      offTintColor,
      tintColor,
      defaultValue, // eslint-disable-line @typescript-eslint/no-unused-vars
      inputCellLength, // eslint-disable-line @typescript-eslint/no-unused-vars
      containerStyle,
      textInputStyle,
      keyboardType,
      testIDPrefix,
      autoFocus,
      ...textInputProps
    } = this.props;

    const { focusedInput, otpText } = this.state;

    const TextInputs = [];

    for (let i = 0; i < inputCount; i += 1) {
      const _tintColor =
        typeof tintColor === 'string' ? tintColor : tintColor[i];
      const _offTintColor =
        typeof offTintColor === 'string' ? offTintColor : offTintColor[i];

      const inputStyle = [
        styles.textInput,
        textInputStyle,
        {
          borderColor: _offTintColor,
        },
      ];

      if (focusedInput === i) {
        inputStyle.push({
          borderColor: _tintColor,
        });
      }

      TextInputs.push(
        <TextInput
          ref={e => {
            if (e) {
              this.inputs[i] = e;
            }
          }}
          key={i}
          autoCorrect={false}
          keyboardType={keyboardType}
          autoFocus={autoFocus && i === 0}
          value={otpText[i] || ''}
          style={inputStyle}
          maxLength={this.props.inputCellLength}
          onFocus={() => this.onInputFocus(i)}
          onChangeText={text => this.onTextChange(text, i)}
          multiline={false}
          onKeyPress={e => this.onKeyPress(e, i)}
          selectionColor={_tintColor}
          cursorColor={_tintColor}
          {...textInputProps}
          testID={`${testIDPrefix}${i}`}
        />,
      );
    }

    return <View style={[styles.container, containerStyle]}>{TextInputs}</View>;
  }
}

export default OTPTextView;
