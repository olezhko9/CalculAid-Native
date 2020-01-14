import React from "react";
import { View, StyleSheet, TouchableHighlight, Animated } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class AddButton extends React.Component {
  render() {
    return (
      <View style={{ position: "absolute", alignItems: "center" }}>
        <Animated.View style={[styles.button]}>
          <TouchableHighlight onPress={this.handlePress} underlayColor="#7F58FF">
            <Icon name="calculator" size={24} color="#FFF" />
          </TouchableHighlight>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#7F58FF",
    position: "absolute",
    marginTop: -60,
    shadowColor: "#7F58FF",
    shadowRadius: 5,
    shadowOffset: { height: 10 },
    shadowOpacity: 0.3,
    borderWidth: 3,
    borderColor: "#FFFFFF"
  },
  secondaryButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#7F58FF"
  }
});
