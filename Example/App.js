import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Alert, TextInput} from 'react-native';

import OTPTextView from 'react-native-otp-textinput';

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
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '60%',
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    letterSpacing: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonStyle: {
    marginHorizontal: 20,
  },
});

export default class App extends Component {
  state = {
    otpInput: '',
    inputText: '',
  };

  alertText = () => {
    const {otpInput = ''} = this.state;
    if (otpInput) {
      Alert.alert(otpInput);
    }
  };

  clear = () => {
    this.input1.clear();
  };

  updateOtpText = () => {
    // will automatically trigger handleOnTextChange callback passed
    this.input1.setValue(this.state.inputText);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>react-native-otp-textinput</Text>
        <OTPTextView
          ref={e => (this.input1 = e)}
          containerStyle={styles.textInputContainer}
          handleTextChange={text => this.setState({otpInput: text})}
          inputCount={4}
          keyboardType="numeric"
        />
        <TextInput
          maxLength={4}
          onChangeText={e => this.setState({inputText: e})}
          style={styles.textInput}
        />
        <View style={styles.buttonWrapper}>
          <Button title="Clear" onPress={this.clear} />
          <Button
            style={styles.buttonStyle}
            title="Update"
            onPress={this.updateOtpText}
          />
          <Button
            style={styles.buttonStyle}
            title="Submit"
            onPress={this.alertText}
          />
        </View>
        <Text style={styles.instructions}>Customizations</Text>
        <OTPTextView
          handleTextChange={e => {}}
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          inputCount={5}
          inputCellLength={2}
        />
        <OTPTextView
          handleTextChange={e => {}}
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          defaultValue="1234"
        />
        <OTPTextView
          handleTextChange={e => {}}
          containerStyle={styles.textInputContainer}
          textInputStyle={[styles.roundedTextInput, {borderRadius: 100}]}
          tintColor="#000"
        />
        <OTPTextView
          handleTextChange={e => {}}
          containerStyle={styles.textInputContainer}
          tintColor={['#FF0000', '#FFFF00', '#00FF00', '#0000FF']}
        />
        <OTPTextView
          handleTextChange={e => {}}
          containerStyle={styles.textInputContainer}
          tintColor="#000"
          offTintColor={['#FF0000', '#FFFF00', '#00FF00', '#0000FF']}
        />
      </View>
    );
  }
}
