import React from "react";
import { AppRegistry, View, StatusBar, ScrollView } from "react-native";
import { NavigationActions } from "react-navigation";
import {
  Button,
  Text,
  Container,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Input,
  Item,
  Label,
  Picker,
  Form
} from "native-base";

export default class FootPrintScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPersons: undefined
    };
  }
  onPersonsChange(value) {
    this.setState({
      selectedPersons: value
    });
  }
  render() {
    const { navigation } = this.props;
    const Ingredients = navigation.getParam('Ingredients', 'NO-ID');
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Footprint</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ flex: 1 }}>
          {Ingredients.map(([value1, value2, value3]) => {
              return (<View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Text >{value1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text >{value2}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text >{value3}</Text>
                </View>
              </View>)
            })}
        </View>
      </Container>
    );
  }
}
