### REACT NATIVE OTP TEXT INPUT

React Native Component that can used for OTPs and Pins as secure pin input.

[![npm version](https://badge.fury.io/js/react-native-otp-textinput.svg)](https://badge.fury.io/js/react-native-otp-textinput)
![npm downloads](https://img.shields.io/npm/dw/react-native-otp-textinput.svg)


#### Installation 

```
npm i -S react-native-otp-textinput
```

#### Demo

<img src="ScreenShots/demo.gif" width="220px"><br>

#### How to Use

Please refer this [repo](https://github.com/naveenvignesh5/react-native-otp-textinput-example) on how to use the module in various scenarios.

#### Platform Support
Supports both Android and iOS.

#### Props

The following props are applicable for the component along with **props supported by react native `TextInput` component**

Prop              | Type     | Optional | Default     | Description
----------------- | -------- | -------- | ----------- | -----------
defaultValue         | string     | Yes       | ''       | Default Value that can be set based on OTP / Pin received from parent container.
handleTextChange         | func     | No       |  n/a      | callback with concated string of all cells as argument.
inputCount          | number      | Yes      | 4        | Number of Text Input Cells to be present.
tintColor          | string     | Yes      | #3CB371        | Color for Cell Border on being focused.
offTintColor       | string     | Yes      | #DCDCDC | Color for Cell Border Border not focused.
inputCellLength       | number     | Yes      | 1 | Number of character that can be entered inside a single cell.
containerStyle       | object     | Yes      | {} | style for overall container.
textInputStyle       | object     | Yes      | {} | style for text input.

#### Helper Functions

Clearing and Setting values to component

```javascript
// using traditional ref
clearText = () => {
    this.otpInput.clear();
}

setText = () => {
    this.otpInput.setValue("1234");
}

render() {
    return (
        <View>
            <OTPTextInput ref={e => (this.otpInput = e)} >
            <Button title="clear" onClick={this.clearText}>
        </View>
    );
}
```

```javascript
// hooks
import React, { useRef } from 'react';

const ParentComponent = () => {
    const otpInput = useRef(null);

    const clearText = () => {
        otpInput.current.clear();
    }

    const setText = () => {
        otpInput.current.setValue("1234");
    }

    return (
        <View>
            <OTPTextInput ref={e => (otpInput = e)} >
            <Button title="clear" onClick={clearText}>
        </View>
    );
}
```
