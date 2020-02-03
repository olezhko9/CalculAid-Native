import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

export default class MarkedSlider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.min,
      width: 0,
    };
  }

  renderMarks() {
    const {marks} = this.props;
    if (!marks || !marks.length) {
      return null;
    }
    const {width} = this.state;
    let markWidth = width / marks.length;
    return (
      <View style={styles.marks}>
        {marks.map(mark => this.renderMark(mark, markWidth))}
      </View>
    );
  }

  renderMark = (mark, markWidth) => {
    const {minimumTrackTintColor, maximumTrackTintColor} = this.props;
    const {value} = this.state;
    const markStyle = [
      styles.mark,
      {
        width: markWidth,
        transform: [{translateX: -markWidth / 2}],
        color:
          value === mark.value ? minimumTrackTintColor : maximumTrackTintColor,
      },
      this.getMarkPosition(mark.value),
    ];
    return (
      <Text style={markStyle} key={mark.value}>
        {mark.name}
      </Text>
    );
  };

  getMarkPosition = value => {
    const {min, max} = this.props;
    const {width} = this.state;
    return {
      left: (width * (value - min)) / (max - min),
    };
  };

  onLayout = ({nativeEvent: e}) => {
    this.setState({width: e.layout.width});
  };

  onChange = value => {
    const {onChange} = this.props;
    this.setState({
      value,
    });
    onChange && onChange(value);
  };

  render() {
    const {min, max, onAfterChange, marks, ...resetProps} = this.props;
    return (
      <View
        onLayout={this.onLayout}
        style={[
          styles.container,
          marks && marks.length ? styles.withMarks : null,
        ]}>
        <Slider
          minimumValue={min}
          maximumValue={max}
          onValueChange={this.onChange}
          {...resetProps}
        />
        {this.renderMarks()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  withMarks: {
    marginBottom: 50,
  },
  marks: {
    position: 'absolute',
    flexDirection: 'row',
    top: 30,
  },
  mark: {
    position: 'absolute',
    fontSize: 14,
    textAlign: 'center',
  },
});
