import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";
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
const DEFAULT_TINT_COLOR = "#3CB371";
const DEFAULT_OFF_TINT_COLOR = "#DCDCDC";
const getOTPTextChucks = (inputCount, inputCellLength, text) => {
    let otpText = (text === null || text === void 0 ? void 0 : text.match(new RegExp(".{1," + inputCellLength + "}", "g"))) || [];
    otpText = otpText.slice(0, inputCount);
    return otpText;
};
class OTPTextView extends Component {
    constructor(props) {
        super(props);
        this.checkTintColorCount = () => {
            const { tintColor, offTintColor, inputCount } = this.props;
            if (typeof tintColor !== "string" && tintColor.length !== inputCount) {
                throw new Error("If tint color is an array it's length should be equal to input count");
            }
            if (typeof offTintColor !== "string" &&
                offTintColor.length !== inputCount) {
                throw new Error("If off tint color is an array it's length should be equal to input count");
            }
        };
        this.basicValidation = (text) => {
            const validText = /^[0-9a-zA-Z]+$/;
            return text.match(validText);
        };
        this.onTextChange = (text, i) => {
            const { inputCellLength, inputCount, handleTextChange } = this.props;
            if (text && !this.basicValidation(text)) {
                return;
            }
            this.setState((prevState) => {
                const { otpText } = prevState;
                otpText[i] = text;
                return {
                    otpText,
                };
            }, () => {
                handleTextChange(this.state.otpText.join(""));
                if (text.length === inputCellLength && i !== inputCount - 1) {
                    this.inputs[i + 1].focus();
                }
            });
        };
        this.onInputFocus = (i) => {
            const { otpText } = this.state;
            const prevIndex = i - 1;
            if (prevIndex > -1 && !otpText[prevIndex] && !otpText.join("")) {
                this.inputs[prevIndex].focus();
                return;
            }
            this.setState({ focusedInput: i });
        };
        this.onKeyPress = (e, i) => {
            const val = this.state.otpText[i] || "";
            const { handleTextChange, inputCellLength, inputCount } = this.props;
            const { otpText } = this.state;
            if (e.nativeEvent.key !== "Backspace" && val && i !== inputCount - 1) {
                this.inputs[i + 1].focus();
                return;
            }
            if (e.nativeEvent.key === "Backspace" && i !== 0) {
                if (!val.length && otpText[i - 1].length === inputCellLength) {
                    this.setState((prevState) => {
                        const { otpText } = prevState;
                        otpText[i - 1] = otpText[i - 1]
                            .split("")
                            .splice(0, otpText[i - 1].length - 1)
                            .join("");
                        return {
                            otpText,
                        };
                    }, () => {
                        handleTextChange(this.state.otpText.join(""));
                        this.inputs[i - 1].focus();
                    });
                }
            }
        };
        this.clear = () => {
            this.setState({
                otpText: [],
            }, () => {
                this.inputs[0].focus();
                this.props.handleTextChange("");
            });
        };
        this.setValue = (value) => {
            const { inputCount, inputCellLength } = this.props;
            const updatedFocusInput = value.length - 1;
            this.setState({
                otpText: getOTPTextChucks(inputCount, inputCellLength, value),
            }, () => {
                if (this.inputs[updatedFocusInput]) {
                    this.inputs[updatedFocusInput].focus();
                }
                this.props.handleTextChange(value);
            });
        };
        this.state = {
            focusedInput: 0,
            otpText: getOTPTextChucks(props.inputCount, props.inputCellLength, props === null || props === void 0 ? void 0 : props.defaultValue),
        };
        this.inputs = [];
        this.checkTintColorCount();
    }
    render() {
        const { inputCount, offTintColor, tintColor, defaultValue, inputCellLength, containerStyle, textInputStyle, keyboardType, testIDPrefix, ...textInputProps } = this.props;
        const { focusedInput, otpText } = this.state;
        const TextInputs = [];
        for (let i = 0; i < inputCount; i += 1) {
            const _tintColor = typeof tintColor === "string" ? tintColor : tintColor[i];
            const _offTintColor = typeof offTintColor === "string" ? offTintColor : offTintColor[i];
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
            TextInputs.push(<TextInput ref={(e) => {
                    this.inputs[i] = e;
                }} key={i} autoCorrect={false} keyboardType={keyboardType} autoFocus={i === 0} value={otpText[i] || ""} style={inputStyle} maxLength={this.props.inputCellLength} onFocus={() => this.onInputFocus(i)} onChangeText={(text) => this.onTextChange(text, i)} multiline={false} onKeyPress={(e) => this.onKeyPress(e, i)} selectionColor={_tintColor} {...textInputProps} testID={`${testIDPrefix}${i}`}/>);
        }
        return <View style={[styles.container, containerStyle]}>{TextInputs}</View>;
    }
}
OTPTextView.defaultProps = {
    inputCount: 4,
    inputCellLength: 1,
    tintColor: DEFAULT_TINT_COLOR,
    offTintColor: DEFAULT_OFF_TINT_COLOR,
    handleTextChange: () => () => console.log("OTPTextView: handleTextChange"),
};
OTPTextView.defaultProps = {
    defaultValue: "",
    inputCount: 4,
    tintColor: DEFAULT_TINT_COLOR,
    offTintColor: DEFAULT_OFF_TINT_COLOR,
    inputCellLength: 1,
    containerStyle: {},
    textInputStyle: {},
    handleTextChange: () => () => console.log("Please attach a method to handle text change"),
    keyboardType: "numeric",
    testIDPrefix: "otp_input_",
};
export default OTPTextView;
//# sourceMappingURL=index.js.map