export default OTPTextView;
declare class OTPTextView {
    constructor(props: any);
    state: {
        focusedInput: number;
        otpText: any;
    };
    inputs: any[];
    basicValidation: (text: any) => any;
    onTextChange: (text: any, i: any) => void;
    onInputFocus: (i: any) => void;
    onKeyPress: (e: any, i: any) => void;
    clear: () => void;
    setValue: (value: any) => void;
    render(): any;
}
declare namespace OTPTextView {
    namespace propTypes {
        const defaultValue: any;
        const inputCount: any;
        const containerStyle: any;
        const textInputStyle: any;
        const inputCellLength: any;
        const tintColor: any;
        const offTintColor: any;
        const handleTextChange: any;
        const inputType: any;
        const keyboardType: any;
    }
    namespace defaultProps {
        const defaultValue_1: string;
        export { defaultValue_1 as defaultValue };
        const inputCount_1: number;
        export { inputCount_1 as inputCount };
        const tintColor_1: string;
        export { tintColor_1 as tintColor };
        const offTintColor_1: string;
        export { offTintColor_1 as offTintColor };
        const inputCellLength_1: number;
        export { inputCellLength_1 as inputCellLength };
        const containerStyle_1: {};
        export { containerStyle_1 as containerStyle };
        const textInputStyle_1: {};
        export { textInputStyle_1 as textInputStyle };
        export function handleTextChange_1(): void;
        export { handleTextChange_1 as handleTextChange };
        const keyboardType_1: string;
        export { keyboardType_1 as keyboardType };
    }
}
