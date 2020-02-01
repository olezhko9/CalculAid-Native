import * as React from 'react';
import {connect} from 'react-redux';
import {speechProductsFetched} from '../store/actions';
import axios from 'axios';

import {StyleSheet, FlatList, View, SafeAreaView} from 'react-native';
import {
  withTheme,
  ActivityIndicator,
  Divider,
  List,
  Text,
  Chip,
  IconButton,
  FAB,
} from 'react-native-paper';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const SpeechProductListItem = ({item, index, navigation}) => {
  const {navigate} = navigation;
  return (
    <List.Item
      title={
        item.product.name.charAt(0).toUpperCase() + item.product.name.slice(1)
      }
      titleNumberOfLines={2}
      titleStyle={{fontWeight: 'bold', fontSize: 18}}
      description={() => (
        <View>
          <View style={[styles.row, {paddingTop: 8}]}>
            <Text>{`Количество: ${item.amount} ${
              item.product.measure.name
            }`}</Text>
          </View>
          <View style={[styles.row, {paddingTop: 8}]}>
            <Chip style={[styles.chip]}>{`Б: ${item.product.pfc.p}`}</Chip>
            <Chip style={[styles.chip]}>{`Ж: ${item.product.pfc.f}`}</Chip>
            <Chip style={[styles.chip]}>{`У: ${item.product.pfc.c}`}</Chip>
          </View>
        </View>
      )}
      right={() => (
        <View style={[styles.column, {justifyContent: 'center'}]}>
          <IconButton icon={'chevron-right'} />
        </View>
      )}
      onPress={() =>
        navigate('DetailedSpeechProduct', {
          changeProductIndex: index,
        })
      }
      onLongPress={() => {}}
    />
  );
};

class Calculator extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    loading: false,
    speech:
      'Я съел 3 куска ржаного хлеба еще я съел десять чайных ложек варенного риса а еще выпил двести миллилитров апельсинного сока и еще выпил стакан козьего молока а еще я съел одно яблоко',
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
    return bu / 10;
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

  renderForegroundHeader = (headerHeight, colors) => {
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
            {(this.breadUnits() * 1.5).toFixed(2)} ед.
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
          💉 {(this.breadUnits() * 1.5).toFixed(2)} ед.
        </Text>
      </View>
    );
  };

  renderHeaderFAB = colors => {
    return (
      <View style={{height: 30}}>
        <View style={{height: 30, backgroundColor: colors.primary}} />
        <View style={{backgroundColor: colors.background}}>
          {/* listen button */}
          <FAB icon="microphone" style={styles.headerFAB} onPress={() => {}} />
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
        renderContentBackground={() => this.renderHeaderFAB(colors)}>
        <SafeAreaView style={{flex: 1, paddingTop: 15}}>
          {this.state.loading && (
            <ActivityIndicator
              animating={this.state.loading}
              color={colors.primary}
            />
          )}
          {!!this.props.selectedProducts.length && (
            <FlatList
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
            />
          )}
        </SafeAreaView>
      </ParallaxScrollView>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  chip: {
    marginRight: 16,
  },
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
    top: -35,
    right: 35,
    margin: 8,
  },
});

const mapStateToProps = state => {
  return {
    productsInSpeech: state.speechProducts,
    selectedProducts: state.selectedProducts,
  };
};

export default withTheme(
  connect(
    mapStateToProps,
    {
      speechProductsFetched,
    },
  )(Calculator),
);
