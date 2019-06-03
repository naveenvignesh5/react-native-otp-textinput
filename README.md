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

```javascript
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

import OTPTextView from './OTPTextView';

export default class App extends Component {
  state = {
    text1: '',
    text2: '',
    text3: '',
    text4: '',
  }

  alertText = () => {
    const { text1 = '', text2 = '', text3 = '', text4 = '' } = this.state;
    Alert.alert(`${text1}, ${text2}, ${text3}, ${text4}`);
  } 

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>OTP TextView</Text>
        <OTPTextView
          containerStyle={styles.textInputContainer}
          handleTextChange={text => this.setState({ text1: text })}
          inputCount={4}
          keyboardType="numeric"
        />
        <Text style={styles.instructions}>Custom OTP TextView 1</Text>
        <OTPTextView
          containerStyle={styles.textInputContainer}
          handleTextChange={text => this.setState({ text2: text })}
          textInputStyle={styles.roundedTextInput}
          inputCount={4}
        />
        <Text style={styles.instructions}>Custom OTP TextView 2</Text>
        <OTPTextView
          containerStyle={styles.textInputContainer}
          handleTextChange={text => this.setState({ text3: text })}
          textInputStyle={styles.roundedTextInput}
          inputType="text"
          cellTextLength={2}
          inputCount={4}
        />
        <Text style={styles.instructions}>Custom OTP TextView 3</Text>
        <OTPTextView
          containerStyle={styles.textInputContainer}
          handleTextChange={text => this.setState({ text4: text })}
          textInputStyle={[styles.roundedTextInput, {borderRadius: 100} ]}
          tintColor="#000"
          inputCount={4}
        />
        <Button title="Log Text" onPress={this.alertText} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 5,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 20,
  },
  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
});
```

#### Platform Support
Supports both Android and iOS.

#### Props

The following props are applicable for the component along with **props supported by react native text input component**

Prop              | Type     | Optional | Default     | Description
----------------- | -------- | -------- | ----------- | -----------
defaultValue         | string     | Yes       | ''       | Default Value that can be set based on OTP / Pin received from parent container.
handleTextChange         | func     | No       |  n/a      | callback with concated string of all cells as argument.
inputCount          | number      | Yes      | 4        | Number of Text Input Cells to be present.
tintColor          | string     | Yes      | #3CB371        | Color for Cell Border on being focused.
offTintColor       | string     | Yes      | #DCDCDC | Color for Cell Border Border not focused.
cellTextLength       | number     | Yes      | 1 | Number of character that can be entered inside a single cell.
containerStyle       | object     | Yes      | {} | style for overall container.
textInputStyle       | object     | Yes      | {} | style for text input.
