import './App.css';
import React, { Component } from 'react';
import MealsDrop from './MealsDrop';
import { LUNCH, DESSERTTYPE, DINNER, SOUP, SALAD, SIDEDISH, DESSERT } from './constants';

class App extends Component {

  constructor(props) {
      super(props);

      //initiate state
      this.state = {
        meals: null,
        error: null,
        isLoaded: false,
        selectedMenu: this.createNewSelectedMenu()
      };
    }
  
  //create initial object of selected meal plan
  createNewSelectedMenu() {    
    //array
    let selectedMenu = [
    ];

    //to 7 as days of the week
    for(let i = 0; i < 7; i++) {
      selectedMenu.push({
        lunch: {
          soup: "",
          sidedish: "",
          salad: ""
        },
        dessert: "",
        dinner:{
          soup: "",
          sidedish: "",
          salad: ""
        }
      });
    }

    //return newly created initial object
    return selectedMenu;
  }

  componentDidMount() {
    //load meals
    fetch("meals.json")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          meals: result.meals
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  //get meals from data object
  getMeals(type) {
    //filter by category and not selected state
    let meals = this.state.meals.filter((q) => q.category === type);;
    return meals;
  }

  //handle change on the meals dropdown component and update the state
  dropChange = param => {
    console.log('do something: ', param);

    let selectedMenu = this.state.selectedMenu;
    let { dayTime, day, type, value } = param;
    
    //pick menu for particular day from the array
    let menuForDay = this.state.selectedMenu[day];
    //update object of menu for the day
    this.updateSelectedMenu(dayTime, type, value, menuForDay);

    //update state with new object of selected menun
    this.setState({selectedMenu: selectedMenu});
  }

  //update selected meal object with selected value
  updateSelectedMenu(dayTime, type, value, menuForDay) {
    //based on type of the dish select the object for updating the value
    let meal = null;
    switch(dayTime) {
      case LUNCH:
        meal = menuForDay.lunch;
      break;
      case DESSERTTYPE:
        break;
      case DINNER:
        meal = menuForDay.dinner;
        break;
      default:
        break;
    }

    //update value
    switch(type) {
      case SOUP:
        meal.soup = value;
        break;
      case SIDEDISH:
        meal.sidedish = value;
        break;
      case SALAD:
        meal.salad = value;
        break;
      case DESSERT:
        menuForDay.dessert = value;
        break;
      default:
        break;
    }
    return menuForDay;
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      let days = [0, 1, 2, 3, 4, 5, 6];
      return(
        <div className="App">
          <table>
          <thead>
            <tr>
              {/* days of the week + date */}
              <th>Pondělí</th>
              <th>Úterý</th>
              <th>Středa</th>
              <th>Čtvrtek</th>
              <th>Pátek</th>
              <th>Sobota</th>
              <th>Neděle</th>
            </tr>
          </thead>
          <tbody>
            {/* notes */}
            <tr>{days.map((day, index) => (<td key={"note1"+index}>Pozn.</td>))}</tr>
            <tr>{days.map((day, index) => (<td key={"note2"+index}>Pozn.</td>))}</tr>

            {/* lunch */}
            <tr>
              {
                //for each day of the week print cell with drops
                days.map((day, index) => (
                    <td key={index}>
                      <MealsDrop key={"lunch"+SOUP+index} dayTime={LUNCH} meals={this.getMeals(SOUP)} type={SOUP} day={index} handleMealsDropChange={this.dropChange} />
                      <MealsDrop key={"lunch"+SIDEDISH+index} dayTime={LUNCH} meals={this.getMeals(SIDEDISH)} type={SIDEDISH} day={index} handleMealsDropChange={this.dropChange} />
                      <MealsDrop key={"lunch"+SALAD+index} dayTime={LUNCH} meals={this.getMeals(SALAD)} type={SALAD} day={index} handleMealsDropChange={this.dropChange} />
                    </td>
                ))
              }
            </tr>

            {/* desert */}
            <tr>
              {
                //for each day of the week print cell with drops
                days.map((day, index) => (
                    <td key={index}>
                      <MealsDrop key={"dessert"+index} dayTime={DESSERTTYPE} meals={this.getMeals(DESSERT)} type={DESSERT} day={index} handleMealsDropChange={this.dropChange} />
                    </td>
                ))
              }
            </tr>

            {/* dinner */}
            <tr>
              {
                //for each day of the week print cell with drops
                days.map((day, index) => (
                    <td key={index}>
                      <MealsDrop key={"dinner"+SOUP+index} dayTime={DINNER} meals={this.getMeals(SOUP)} type={SOUP} day={index} handleMealsDropChange={this.dropChange} />
                      <MealsDrop key={"dinner"+SIDEDISH+index} dayTime={DINNER} meals={this.getMeals(SIDEDISH)} type={SIDEDISH} day={index} handleMealsDropChange={this.dropChange} />
                      <MealsDrop key={"dinner"+SALAD+index} dayTime={DINNER} meals={this.getMeals(SALAD)} type={SALAD} day={index} handleMealsDropChange={this.dropChange} />
                    </td>
                ))
              }
            </tr>
          </tbody>
          </table>
        </div>
      );
    }
  }
}

export default App;
