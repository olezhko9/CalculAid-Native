import * as React from 'react';
import {connect} from 'react-redux';
import {speechProductsFetched, productRemoved} from '../../store/actions';
import axios from 'axios';

import {StyleSheet, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {
  withTheme,
  ActivityIndicator,
  Divider,
  Text,
  FAB,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {SwipeListView} from 'react-native-swipe-list-view';
import SpeechProductListItem from '../../components/Calculator/SpeechProductListItem';

class Calculator extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    loading: false,
    speech:
      'Я съел 3 куска ржаного хлеба еще я съел десять чайных ложек варенного риса а еще выпил двести миллилитров апельсинного сока и еще выпил стакан козьего молока а еще я съел одно яблоко',
    contentOffset: 0,
  };

  breadUnits = () => {
    const {selectedProducts} = this.props;
    let bu = 0;
    if (selectedProducts.length) {
      for (let i = 0; i < selectedProducts.length; i++) {
        if (selectedProducts[i].product.measure) {
          bu +=
            ((selectedProducts[i].amount *
              selectedProducts[i].product.measure.grams) /
              100) *
            selectedProducts[i].product.pfc.c;
        }
      }
    }
    return bu / this.props.settings.carbonPerBU;
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    this.setState({loading: true});
    try {
      const response = (await axios.post(
        'http://194.87.101.20:3000/api/products',
        {
          speech: this.state.speech,
        },
      )).data;
      this.props.speechProductsFetched(response.data);
    } catch (e) {
      console.log(e);
    }
    this.setState({loading: false});
  }

  deleteRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
    this.props.productRemoved(rowKey);
  };

  renderForegroundHeader = headerHeight => {
    return (
      <View style={{height: headerHeight, flexDirection: 'column'}}>
        <View
          style={{
            height: headerHeight,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.breadUnitsText}>
            {this.breadUnits().toFixed(2)} ХЕ
          </Text>
          <Text style={styles.insulinText}>
            {'Рекомендуемая доза инсулина: '}
            {(this.breadUnits() * this.props.settings.insulinPerBU).toFixed(2)} ед.
          </Text>
        </View>
      </View>
    );
  };

  renderStickyHeader = headerHeight => {
    return (
      <View
        style={{
          height: headerHeight,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <Text
          style={[styles.breadUnitsText, {fontSize: 20, fontWeight: 'normal'}]}>
          🍞 {this.breadUnits().toFixed(2)} ХЕ
        </Text>
        <Text style={[styles.insulinText, {fontSize: 20}]}>
          💉 {(this.breadUnits() * this.props.settings.insulinPerBU).toFixed(2)} ед.
        </Text>
      </View>
    );
  };

  renderHeaderFAB = colors => {
    return (
      <View style={{height: 35, flex: 1, flexDirection: 'column'}}>
        <View style={{height: 35, backgroundColor: colors.primary, top: -5}} />
        <View style={{height: 35}}>
          {/* listen button */}
          <FAB
            icon="microphone"
            visible={this.state.contentOffset < 100}
            style={[styles.headerFAB]}
            onPress={() => this.getData()}
          />
        </View>
      </View>
    );
  };

  render() {
    const foregroundHeaderHeight = 150,
      stickyHeaderHeight = 50;
    const {colors} = this.props.theme;
    return (
      <ParallaxScrollView
        backgroundColor={colors.primary}
        contentBackgroundColor={colors.background}
        parallaxHeaderHeight={foregroundHeaderHeight}
        stickyHeaderHeight={stickyHeaderHeight}
        renderForeground={() =>
          this.renderForegroundHeader(foregroundHeaderHeight, colors)
        }
        renderStickyHeader={() => this.renderStickyHeader(stickyHeaderHeight)}
        renderContentBackground={() => this.renderHeaderFAB(colors)}
        scrollEvent={event =>
          this.setState({contentOffset: event.nativeEvent.contentOffset.y})
        }>
        <SafeAreaView style={{flex: 1, paddingTop: 20, minHeight: 50}}>
          {this.state.loading && (
            <ActivityIndicator
              animating={this.state.loading}
              color={colors.primary}
            />
          )}
          {!!this.props.selectedProducts.length && (
            <SwipeListView
              style={{paddingTop: 10}}
              ItemSeparatorComponent={Divider}
              keyExtractor={item => item.product.id.toString()}
              data={this.props.selectedProducts}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => (
                <SpeechProductListItem
                  item={item}
                  index={index}
                  navigation={this.props.navigation}
                />
              )}
              renderHiddenItem={(data, rowMap) => (
                <View style={styles.rowBack}>
                  <TouchableOpacity
                    style={[
                      styles.backRightBtn,
                      {backgroundColor: colors.danger},
                    ]}
                    onPress={() => this.deleteRow(rowMap, data.index)}>
                    <Icon name={'trash'} color={'#fff'} size={20} />
                  </TouchableOpacity>
                </View>
              )}
              leftOpenValue={0}
              rightOpenValue={-75}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
            />
          )}
          <View style={{height: 50}} />
        </SafeAreaView>
      </ParallaxScrollView>
    );
  }
}

const styles = StyleSheet.create({
  breadUnitsText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  insulinText: {
    fontSize: 16,
    color: '#fff',
  },
  headerFAB: {
    position: 'absolute',
    top: -40,
    right: 35,
    margin: 8,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#ddd',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 75,
  },
});

const mapStateToProps = state => {
  return {
    productsInSpeech: state.speechProducts,
    selectedProducts: state.selectedProducts,
    settings: state.settings,
  };
};

export default withTheme(
  connect(
    mapStateToProps,
    {
      speechProductsFetched,
      productRemoved,
    },
  )(Calculator),
);
