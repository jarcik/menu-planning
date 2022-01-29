import './App.css';
import React, { Component } from 'react';
import MealsDrop from './MealsDrop';
import { LUNCH, DESSERTTYPE, DINNER, SOUP, SALAD, SIDEDISH, DESSERT } from './constants';

const urlAddress = "http://127.0.0.1:8080/edsa-menu-planning/";
//const urlAddress = "";

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

  componentDidMount() {   
      //load list of meals
      this.loadMealsFromFile();
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

  //load list of meals from flie
  loadMealsFromFile() {
    //load meals
    fetch("meals.json")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          meals: result.meals
        });          
        //load saved state
        this.loadSavedFromServer();
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          error
        });
      }
    )
  }

  //load saved state from server
  loadSavedFromServer() {    
    //load saved
    fetch(urlAddress+"get-meal.php")
    .then(response => {
      return response.text()
    })
    .then((result) => {
      let data = result ? JSON.parse(result) : {};
      this.setState({selectedMenu: data.meals});      
      //set selected
      this.setSelected(data.meals);
    },
    (error) => {
      console.log(error);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  //get meals from data object
  getMeals(type, dayTime, day) {
    let selected = this.getDateTimeMeal(dayTime, this.state.selectedMenu[day]);
    let selectedValue = null;
    //update value
    switch(type) {
      case SOUP:
        selectedValue = selected.soup;
        break;
      case SIDEDISH:
        selectedValue = selected.sidedish;
        break;
      case SALAD:
        selectedValue = selected.salad;
        break;
      case DESSERT:
        selectedValue = selected.dessert;
        break;
      default:
        break;
    }

    //filter by category and not selected state
    let meals = this.state.meals.filter((q) => q.category === type && (!q.selected ||  q.id === selectedValue));
    return meals;
  }

  //goes throught every object of selected menu and mark meals selected
  setSelected(selectedMenu) {
    let typesArray = [SALAD, SIDEDISH, SOUP, DESSERT];
    let dayTimeArray = [LUNCH, DINNER, DESSERTTYPE];
    for(let i = 0; i < 7; i++) {
      dayTimeArray.forEach(dTA => {
        typesArray.forEach(tA => {          
          let selected = this.getDateTimeMeal(dTA, selectedMenu[i]);
          let selectedValue = null;
          //update value
          switch(tA) {
            case SOUP:
              selectedValue = selected.soup;
              break;
            case SIDEDISH:
              selectedValue = selected.sidedish;
              break;
            case SALAD:
              selectedValue = selected.salad;
              break;
            case DESSERT:
              selectedValue = selected.dessert;
              break;
            default:
              break;
          }
          if(selectedValue !== undefined && selectedValue !== "" && selectedValue !== null) {
            let meal = this.state.meals.find((q) => q.id === selectedValue);
            if(meal) {
              meal.selected = true;
            }
          }
        });
      });
    }
    this.setState({isLoaded:true});
  }

  //handle change on the meals dropdown component and update the state
  dropChange = param => {
    let selectedMenu = this.state.selectedMenu;
    let { dayTime, day, type, value } = param;
    
    //pick menu for particular day from the array
    let menuForDay = this.state.selectedMenu[day];
    //update object of menu for the day
    this.updateSelectedMenu(dayTime, type, value, menuForDay);

    //update state with new object of selected menun
    this.setState({selectedMenu: selectedMenu});
    this.saveToServer(selectedMenu);
  }

  saveToServer(selectedMenu) {
    //save change
    fetch(urlAddress+"post-meal.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({meals: selectedMenu}),
      meals: JSON.stringify({meals: selectedMenu}),
      data: JSON.stringify({meals: selectedMenu})
    })
    .then(response => {
      return response.text()
    })
    .then((result) => {
    },
    (error) => {
      console.log(error);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  //update selected meal object with selected value
  updateSelectedMenu(dayTime, type, value, menuForDay) {
    //based on type of the dish select the object for updating the value
    let meal = this.getDateTimeMeal(dayTime, menuForDay);

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
        meal.dessert = value;
        break;
      default:
        break;
    }
    return menuForDay;
  }

  //get object of daytime
  getDateTimeMeal(dayTime, menuForDay) {
    switch(dayTime) {
      case LUNCH:
        return menuForDay.lunch;
      case DESSERTTYPE:
        return menuForDay;
      case DINNER:
        return menuForDay.dinner;
      default:
        return null;
    }

  }

  //check and print
  print = (clear=false) => {
    //check before printing
    if(this.check()) {
      //everything alright, lets prnt
      window.print();
    } else {
      alert("Nejsou vyplněna všechna pole. Prosím, doplňte.");
    }
    //clear the data from table if needed
    if(clear) {
      this.clear();
    }
  }

  //clean the selected data from table
  clear() {
    let newMenu = this.createNewSelectedMenu();
    this.setState({selectedMenu: newMenu});
    this.saveToServer(newMenu);

    let newMealsList = this.state.meals.slice();
    newMealsList.forEach(q => {
      q.selected = false;
    });
    
  }

  //check if every object in menu is selected
  check() {
    for(let i = 0; i < 7; i++) {
      let meal = this.state.selectedMenu[i];
      if(!meal 
          || !meal.lunch || !meal.lunch.soup || !meal.lunch.salad || !meal.lunch.sidedish
          || !meal.dinner || !meal.dinner.soup || !meal.dinner.salad || !meal.dinner.sidedish
          || !meal.dessert)
        return false;
    }
    return true;
  }

  //get date for the next weekday
  getDate(day) {
    let d = new Date();
    d.setDate(d.getDate() + ((7 - d.getDay()) % 7 + 1) % 7 + day);
    return d.toLocaleDateString("cs-CZ");
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
              <th>Pondělí<br/>{this.getDate(0)}</th>
              <th>Úterý<br/>{this.getDate(1)}</th>
              <th>Středa<br/>{this.getDate(2)}</th>
              <th>Čtvrtek<br/>{this.getDate(3)}</th>
              <th>Pátek<br/>{this.getDate(4)}</th>
              <th>Sobota<br/>{this.getDate(5)}</th>
              <th>Neděle<br/>{this.getDate(6)}</th>
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
                      <MealsDrop key={"lunch"+SOUP+index} selectedMenu={this.state.selectedMenu} dayTime={LUNCH} meals={this.getMeals(SOUP, LUNCH, index)} type={SOUP} day={index} handleMealsDropChange={this.dropChange} />
                      <MealsDrop key={"lunch"+SIDEDISH+index} selectedMenu={this.state.selectedMenu} dayTime={LUNCH} meals={this.getMeals(SIDEDISH, LUNCH, index)} type={SIDEDISH} day={index} handleMealsDropChange={this.dropChange} />
                      <MealsDrop key={"lunch"+SALAD+index} selectedMenu={this.state.selectedMenu} dayTime={LUNCH} meals={this.getMeals(SALAD, LUNCH, index)} type={SALAD} day={index} handleMealsDropChange={this.dropChange} />
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
                      <MealsDrop key={"dessert"+index} selectedMenu={this.state.selectedMenu}  dayTime={DESSERTTYPE} meals={this.getMeals(DESSERT, DESSERTTYPE, index)} type={DESSERT} day={index} handleMealsDropChange={this.dropChange} />
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
                      <MealsDrop key={"dinner"+SOUP+index} selectedMenu={this.state.selectedMenu}  dayTime={DINNER} meals={this.getMeals(SOUP, DINNER, index)} type={SOUP} day={index} handleMealsDropChange={this.dropChange} />
                      <MealsDrop key={"dinner"+SIDEDISH+index} selectedMenu={this.state.selectedMenu}  dayTime={DINNER} meals={this.getMeals(SIDEDISH, DINNER, index)} type={SIDEDISH} day={index} handleMealsDropChange={this.dropChange} />
                      <MealsDrop key={"dinner"+SALAD+index} selectedMenu={this.state.selectedMenu}  dayTime={DINNER} meals={this.getMeals(SALAD, DINNER, index)} type={SALAD} day={index} handleMealsDropChange={this.dropChange} />
                    </td>
                ))
              }
            </tr>
          </tbody>
          </table>
          <button disabled={this.check() ? "" : "disabled"} onClick={() => this.print(false)}>Vytisknout</button>
          <button disabled={this.check() ? "" : "disabled"} onClick={() => this.print(true)}>Vytisknout a vyčistit</button>
          <button onClick={() => this.clear()}>Vyčistit</button>
        </div>
      );
    }
  }
}

export default App;
