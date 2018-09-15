import React from "react";
import { AppRegistry, View, StatusBar, ScrollView } from "react-native";
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
  Picker,
} from "native-base";

export default class NewMealScreen extends React.Component {
  state = {
    selectedPersons: undefined,
    selectedIngredient: undefined,
    selectedWeight: undefined,
    selectedWeightType: "Kg",
    textInput: []
  };
  lists = {
    Ingredients: ["almond milk", "almonds", "beef", "cheese slices", "cheese spread", "chicken", "chocolate", "chocolate milk", "corn", "dried beef", "dry pasta", "pasta", "gruyere", "ham", "lentils", "low fat organic milk", "non-free range eggs", "pancetta", "pork", "pork sausages", "quorn", "red kidney beans", "rice milk", "risotto rice", "rice", "sliced beef", "sliced chicken", "smoked cheese", "tofu", "uht milk", "vegetarian salami", "wholegrain dry pasta", "lamb", "butter", "turkey", "rabbit", "cod", "eggs", "insect", "whole milk", "wheat", "peas", "barley", "chickpeas", "onion", "celery", "potatoes", "carrots", "squash", "cucumber", "gherkins", "beetroot", "pumpkins", "rockmelon", "cantelope", "plake", "limes", "mushrooms", "guavas", "apples", "swedes", "rutabage", "pears", "quinces", "green", "watermelons", "dates", "orange", "fruit", "broccoli", "grapes", "oats", "rye", "cherries", "gigante", "milk", "nectarines", "figs", "apricot", "chestnuts", "beans", "mandarin", "tomatoes", "maize", "fennel", "artichokes", "cowpeas", "soybean", "pineapples", "melons", "pomelo", "tangerines", "mandarins", "greenhouse", "spinach", "garlic", "strawberries", "olives", "capsicums", "peppers", "soy-milk", "runner", "asparagus", "peanuts", "raspberries", "gooseberries", "seed", "ginger", "cranberries", "blueberries", "hazelnuts", "nuts", "pilchard", "quinoa", "herring", "vegetables", "fruit)", "cereals", "pulses", "vegetable", "combined", "average", "cream", "prawns", "shrimp", "cheese", "avocados", "yoghurt", "(aubergines)", "nut", "walnuts", "pistachios", "pollock", "carp", "mackerel", "tuna", "whiting", "duck", "bass", "haddock", "salmon", "species", "eel", "kangaroo", "trout", "common", "pomfret", "\ufb01sh", "octopus", "squid", "cuttle\ufb01sh", "rhombus", "mussels", "hake", "porbeagle", "mako", "angler\ufb01sh", "sword\ufb01sh", "megrim", "turbot", "sole", "lobster", "buffalo"]
  }
  onPersonsChange(value) {
    this.setState({
      selectedPersons: value
    });
  }
  onIngredientChange(value) {
    this.setState({
      selectedIngredient: value
    });
  }
  onWeightChange(value) {
    this.setState({
      selectedWeight: value
    });
  }
  onWeightTypeChange(value) {
    this.setState({
      selectedWeightType: value
    });
  }
  placeIngredient = (key) => {
    if (this.state.selectedIngredient == undefined || this.state.selectedWeight == undefined)
      return;
    let textInput = this.state.textInput;
    textInput.push([this.state.selectedIngredient, this.state.selectedWeight, this.state.selectedWeightType]);
    this.setState({ textInput })
  }
  render() {
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
            <Title>New Meal</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <Content padder>
              <Picker note mode="dropdown"
                selectedValue={this.state.selectedPersons}
                onValueChange={this.onPersonsChange.bind(this)}>
                <Picker.Item label="Amount of persons" value={null} />
                <Picker.Item label="1 person" value="1" />
                <Picker.Item label="2 persons" value="2" />
                <Picker.Item label="3 persons" value="3" />
                <Picker.Item label="4 persons" value="4" />
                <Picker.Item label="5 persons" value="5" />
                <Picker.Item label="6 persons" value="6" />   
              </Picker>
              { this.state.textInput.map(([value1,value2,value3]) => {
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
              <Item style={{ flexDirection: "row" }}>
                <Picker note mode="dropdown" style={{ flexGrow: 2 }}
                  selectedValue={this.state.selectedIngredient}
                  onValueChange={this.onIngredientChange.bind(this)}>
                  <Picker.Item label="New Ingredient" value={null} />
                  {this.lists.Ingredients.map((value, index) => {
                    return <Picker.Item label={value} value={value} />
                  })}
                </Picker>
                <Input placeholder='Amount'
                  style={{ flex: 1 }}
                  selectedValue={this.state.selectedWeight}
                  onChangeText={this.onWeightChange.bind(this)} />
                <Picker note mode="dropdown"
                  style={{ flex: 1 }}
                  selectedValue={this.state.selectedWeightType}
                  onValueChange={this.onWeightTypeChange.bind(this)}>
                  <Picker.Item label="Kg" value="Kg" />
                  <Picker.Item label="L" value="L" />
                </Picker>
              </Item>
              <Button
                rounded
                style={{ marginTop: 20, alignSelf: "center" }}
                onPress={() => {
                  this.placeIngredient(this.state.textInput.length);
                }}>
                <Text>Add Ingredient</Text>

              </Button>
            </Content>
          </ScrollView>
          <Button block info
            onPress={() => this.props.navigation.navigate("FootPrint",{Ingredients:this.state.textInput})}
          >
            <Text>Calculate footprint</Text>
          </Button>
        </View>
      </Container>
    );
  }
}
