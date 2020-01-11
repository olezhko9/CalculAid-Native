import React, { Component } from "react";
import { Container, Header, Content, List, ListItem, Text, Tabs, Tab } from "native-base";
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "key1",
      products: [],
      speech: "Я съел 2 куска ржаного хлеба еще я съел десять чайных ложек варенного риса а еще выпил двести миллилитров апельсинного сока и еще выпил стакан козьего молока а еще я съел одно яблоко"
    };
  }

  componentDidMount(): void {
    this.getData()
  }

  async getData() {
    try {
      const response = (await axios.post('http://194.87.101.20:3000/api/products', {
        speech: this.state.speech
      })).data
      this.setState({
        products: response.data
      })
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <List>
            {
              this.state.products.map((product, index) =>
                <ListItem key={index}>
                  <Text>{ product.products[0].name }</Text>
                </ListItem>
              )
            }
          </List>
        </Content>
        <Tabs tabBarPosition={'bottom'}>
          <Tab heading="Tab1">
          </Tab>
          <Tab heading="Tab2">
          </Tab>
          <Tab heading="Tab3">
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.dark,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });
