import { Component } from "react";
import { TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from "react-native";
import { InputProps, OTPInputViewState } from "react-native-otp-textinput";
declare class OTPTextView extends Component<InputProps, OTPInputViewState> {
    static defaultProps: InputProps;
    inputs: TextInput[];
    constructor(props: InputProps);
    checkTintColorCount: () => void;
    basicValidation: (text: string) => RegExpMatchArray | null;
    onTextChange: (text: string, i: number) => void;
    onInputFocus: (i: number) => void;
    onKeyPress: (e: NativeSyntheticEvent<TextInputKeyPressEventData>, i: number) => void;
    clear: () => void;
    setValue: (value: string) => void;
    render(): JSX.Element;
}
export default OTPTextView;
