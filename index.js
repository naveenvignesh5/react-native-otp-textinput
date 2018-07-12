import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

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
    },
    text: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '500',
        color: '#000000'
    }
});

const window = Dimensions.get('window');

class OTPTextView extends Component {
    state = {
        focusedInput: 0,
    }

    componentWillMount() {
        const { defaultValue, cellTextLength } = this.props;
        if (defaultValue) {
            this.otpText = defaultValue.match(new RegExp('.{1,' + cellTextLength + '}', 'g'));
        }
    }

    otpText = [];

    onTextChange = (text, i) => {
        const { cellTextLength, inputCount, handleTextChange } = this.props;
        this.otpText[i] = text;
        handleTextChange(this.otpText.join(""));
        if (text && text.length === cellTextLength && i !== inputCount - 1) {
            this.refs[`${i + 1}`].focus();
        }
    }

    onInputFocus = (i) => {
        this.setState({ focusedInput: i });
    }

    render() {
        const {
            inputCount,
            offTintColor,
            tintColor,
            defaultValue,
            cellTextLength,
            containerStyle,
            textInputStyle,
            textStyle,
            ...textInputProps
        } = this.props;

        const TextInputs = [];

        for (let i = 0; i < inputCount; i += 1) {
            let defaultChars = [];
            if (defaultValue) {
                defaultChars = defaultValue.match(new RegExp('.{1,' + cellTextLength + '}', 'g'));
            }
            const inputStyle = [
                styles.textInput,
                styles.text,
                textInputStyle,
                textStyle,
                { borderColor: offTintColor }
            ];
            if (this.state.focusedInput === i) {
                inputStyle.push({ borderColor: tintColor });
            }

            TextInputs.push(
                <TextInput
                    ref={`${i}`}
                    key={i}
                    defaultValue={defaultValue ? defaultChars[i] : ''}
                    style={inputStyle}
                    maxLength={this.props.cellTextLength}
                    onFocus={() => this.onInputFocus(i)}
                    onChangeText={(text) => this.onTextChange(text, i)}
                    multiline={false}
                    {...textInputProps}
                />
            );
        }
        return (
            <View style={[styles.container, containerStyle]}>
                {TextInputs}
            </View>
        );
    }
}

OTPTextView.propTypes = {
    defaultValue: PropTypes.string,
    inputCount: PropTypes.number,
    containerStyle: PropTypes.object,
    textInputStyle: PropTypes.object,
    cellTextLength: PropTypes.number,
    tintColor: PropTypes.string,
    offTintColor: PropTypes.string,
    handleTextChange: PropTypes.func,
    inputType: PropTypes.string,
}

OTPTextView.defaultProps = {
    defaultValue: '',
    inputCount: 4,
    tintColor: '#3CB371',
    offTintColor: '#DCDCDC',
    cellTextLength: 1,
    containerStyle: {},
    textInputStyle: {},
    textStyle: {},
    handleTextChange: () => { },
}

export default OTPTextView;
