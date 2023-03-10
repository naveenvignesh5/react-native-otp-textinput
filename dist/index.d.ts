import { Component } from 'react';
import { TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { InputProps, OTPInputViewState } from 'react-native-otp-ultimate';
declare class OTPTextView extends Component<InputProps, OTPInputViewState> {
    static defaultProps: InputProps;
    inputs: TextInput[];
    private hasCheckedClipBoard?;
    private clipBoardCode?;
    private timer?;
    constructor(props: InputProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    checkTintColorCount: () => void;
    basicValidation: (text: string) => RegExpMatchArray | null;
    onTextChange: (text: string, i: number) => void;
    onInputFocus: (i: number) => void;
    private copyCodeFromClipBoardOnAndroid;
    checkPinCodeFromClipBoard: () => void;
    blurAllFields: () => void;
    onKeyPress: (e: NativeSyntheticEvent<TextInputKeyPressEventData>, i: number) => void;
    clear: () => void;
    setValue: (value: string) => void;
    render(): JSX.Element;
}
export default OTPTextView;
