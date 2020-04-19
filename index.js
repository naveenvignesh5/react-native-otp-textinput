import React, { PureComponent } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    height: 50,
    width: 50,
    borderBottomWidth: 4,
    margin: 5,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "500",
    color: "#000000",
  },
});

const getOTPTextChucks = (inputCount, inputCellLength, text) => {
  let otpText =
    text.match(new RegExp(".{1," + inputCellLength + "}", "g")) || [];

  otpText = otpText.slice(0, inputCount - 1);

  return otpText;
};

class OTPTextView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: 0,
      otpText: [],
    };

    this.defaultChars = getOTPTextChucks(
      props.inputCount,
      props.inputCellLength,
      props.defaultValue
    );

    this.inputs = [];
  }

  onTextChange = (text, i) => {
    const { inputCellLength, inputCount, handleTextChange } = this.props;
    this.setState(
      (prevState) => {
        let { otpText } = prevState;
        otpText[i] = text;
        return {
          otpText,
        };
      },
      () => {
        handleTextChange(this.state.otpText.join(""));
        if (text.length === inputCellLength && i !== inputCount - 1) {
          this.inputs[i + 1].focus();
        }
      }
    );
  };

  onInputFocus = (i) => {
    let prevIndex = i - 1;

    if (prevIndex > -1 && !this.state.otpText[prevIndex]) {
      this.inputs[prevIndex].focus();
      return;
    }

    this.setState({ focusedInput: i });
  };

  onKeyPress = (e, i) => {
    if (
      e.nativeEvent.key === "Backspace" &&
      i !== 0 &&
      !((this.state.otpText[i] || "").length - 1)
    ) {
      this.inputs[i - 1].focus();
    }
  };

  clear = () => {
    this.setState(
      {
        otpText: [],
      },
      () => {
        this.inputs[0].focus();
      }
    );
  };

  render() {
    const {
      inputCount,
      offTintColor,
      tintColor,
      defaultValue,
      inputCellLength,
      containerStyle,
      textInputStyle,
      ...textInputProps
    } = this.props;

    const TextInputs = [];

    for (let i = 0; i < inputCount; i += 1) {
      const inputStyle = [
        styles.textInput,
        textInputStyle,
        { borderColor: offTintColor },
      ];

      if (this.state.focusedInput === i) {
        inputStyle.push({ borderColor: tintColor });
      }

      TextInputs.push(
        <TextInput
          ref={(e) => {
            this.inputs[i] = e;
          }}
          key={i}
          defaultValue={defaultValue ? this.defaultChars[i] : ""}
          value={this.state.otpText[i] || ""}
          style={inputStyle}
          maxLength={this.props.inputCellLength}
          onFocus={() => this.onInputFocus(i)}
          onChangeText={(text) => this.onTextChange(text, i)}
          multiline={false}
          onKeyPress={(e) => this.onKeyPress(e, i)}
          {...textInputProps}
        />
      );
    }
    return <View style={[styles.container, containerStyle]}>{TextInputs}</View>;
  }
}

OTPTextView.propTypes = {
  defaultValue: PropTypes.string,
  inputCount: PropTypes.number,
  containerStyle: PropTypes.object,
  textInputStyle: PropTypes.object,
  inputCellLength: PropTypes.number,
  tintColor: PropTypes.string,
  offTintColor: PropTypes.string,
  handleTextChange: PropTypes.func,
  inputType: PropTypes.string,
};

OTPTextView.defaultProps = {
  defaultValue: "",
  inputCount: 4,
  tintColor: "#3CB371",
  offTintColor: "#DCDCDC",
  inputCellLength: 1,
  containerStyle: {},
  textInputStyle: {},
  handleTextChange: () => {},
};

export default OTPTextView;
