import './App.css';
import React, { Component } from 'react';
import MealsDrop from './MealsDrop';
import { 
  LUNCH, DESSERTTYPE, DINNER, 
  CATEGORIES, TYPES, DESSERT, MEALOBJECT
} from './constants';
import NewMeal from './NewMeal';

const urlAddress = "http://127.0.0.1:8080/edsa-menu-planning/";
//const urlAddress = "";

class App extends Component {
  constructor(props) {
      super(props);
      //initiate state
      this.state = {
        meals: null,
        isLoaded: false,
        selectedMenu: this.createNewSelectedMenu()
      };
    }

  componentDidMount() {   
      //load list of meals
      this.loadMealsFromFile(true, true);
  }
  
  //create initial object of selected meal plan
  createNewSelectedMenu() {    
    //array
    let selectedMenu = [];
    //to 7 as days of the week
    for(let i = 0; i < 7; i++) {
      selectedMenu.push(MEALOBJECT);
    }
    //return newly created initial object
    return selectedMenu;
  }

  //load list of meals from flie
  loadMealsFromFile(loadFromServer = false, setState = true) {
    //load meals
    fetch("meals.json?" + (new Date()).getTime())
    .then(res => res.json())
    .then(
      (result) => {
        if(setState) {
          this.setState({
            meals: result.meals
          });       
        } else {
          return result.meals;
        }
        if(loadFromServer) {
          //load saved state
          this.loadSavedFromServer();
        }
      }
    )
  }

  //load saved state from server
  loadSavedFromServer() {    
    //load saved
    fetch(urlAddress+"get-meal.php")
    .then(response => {
      return response.text();
    })
    .then((result) => {
      let data = result ? JSON.parse(result) : {};
      this.setState({selectedMenu: data.meals});     
      this.setState({isLoaded:true});
    })
    .catch((error) => {
      console.log(error);
    })
  }

  //get meals from data object
  getMeals(type, dayTime, day) {
    return this.state.meals.filter((q) => q.category === type);
  }

  //handle change on the meals dropdown component and update the state
  dropChange = param => {
    let selectedMenu = this.state.selectedMenu;
    let { dayTime, day, category, value } = param;
    
    //pick menu for particular day from the array
    let menuForDay = this.state.selectedMenu[day];
    //update object of menu for the day
    this.updateSelectedMenu(dayTime, value, menuForDay, category);

    //update state with new object of selected menun
    this.setState({selectedMenu: selectedMenu});
    this.saveToServer(selectedMenu);
    return false;
  }

  //save selected menu to server
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
    }).then(response => {
      return response.text();
    })
    .catch((error) => {
      console.log(error);
    })
    return false;
  }

  //update selected meal object with selected value
  updateSelectedMenu(dayTime, value, menuForDay, category) {
    //based on type of the dish select the object for updating the value
    let meal = this.getDateTimeMeal(dayTime, menuForDay);
    meal[category] = value;
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
    //everything alright, lets prnt
    window.print();
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
  }

  //get date for the next weekday
  getDate(day) {
    let d = new Date();
    d.setDate(d.getDate() + ((7 - d.getDay()) % 7) % 7 + day + 1);
    return d.toLocaleDateString("cs-CZ");
  }

  //handle submitting of the new meal added to the list of the meals
  handleSubmitNewMeal(newMeal) {
    fetch("meals.json?" + (new Date()).getTime())
    .then(res => res.json())
    .then(
      (result) => {
        return result.meals;
     })
    .then(
      (result) => {
        newMeal.id = Math.max.apply(Math, result.map(function(o) { return o.id; })) + 1;
        result.push(newMeal);
        //save change
        fetch(urlAddress+"add-meal.php", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({meals: result}),
          meals: JSON.stringify({meals: result}),
          data: JSON.stringify({meals: result})
        });
        this.setState({meals: result});
      }
    );
    return false;
  }

  //get to render meals component
  getMealComponent(type, category, dayIndex, key) {
    switch(type) {
      case LUNCH:
      case DINNER:
        if(category === DESSERT) return;
        return <MealsDrop key={key} selectedMenu={this.state.selectedMenu} dayTime={type} meals={this.getMeals(category, type, dayIndex)} day={dayIndex} handleMealsDropChange={this.dropChange} category={category} />;
      case DESSERTTYPE:
        if(category === DESSERT) {
          return <MealsDrop key={key} selectedMenu={this.state.selectedMenu} dayTime={type} meals={this.getMeals(DESSERT, type, dayIndex)} day={dayIndex} handleMealsDropChange={this.dropChange} category={category} />;
        }
        break;        
      default:
        return "";
    }
  }

  render() {
    const { isLoaded } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      let days = [0, 1, 2, 3, 4, 5, 6];
      return(
        <div className="App">
          <table>
          <thead>
            <tr>
              {/* days of the week + date */}
              <th>Monday<br/>{this.getDate(0)}</th>
              <th>Tuesday<br/>{this.getDate(1)}</th>
              <th>Wednesday<br/>{this.getDate(2)}</th>
              <th>Thursday<br/>{this.getDate(3)}</th>
              <th>Friday<br/>{this.getDate(4)}</th>
              <th>Saturday<br/>{this.getDate(5)}</th>
              <th>Sunday<br/>{this.getDate(6)}</th>
            </tr>
          </thead>
          <tbody>
            {/* notes */}
            <tr className="noteRow">{days.map((day, index) => (<td key={"note1"+index}></td>))}</tr>
            <tr className="noteRow">{days.map((day, index) => (<td key={"note2"+index}></td>))}</tr>

            {/* lunch */}
            {
              TYPES.map((type, typeIndex) => (
                <tr className={type === DESSERTTYPE ? "dessertRow" : ""} key={"type"+typeIndex}>
                  {days.map((day, dayIndex) => (
                    <td key={"day"+typeIndex+""+dayIndex}>
                      {
                        CATEGORIES.map((category, categoryIndey) => (
                            this.getMealComponent(type, category, dayIndex, "category"+typeIndex+""+dayIndex+""+categoryIndey)
                        ))
                      }
                    </td>
                  ))}
                </tr>
              ))
            }
          </tbody>
          </table>

          {/* buttons */}
          <button onClick={() => this.print(false)}>Vytisknout</button>
          <button onClick={() => this.print(true)}>Vytisknout a vyčistit</button>
          <button onClick={() => this.clear()}>Vyčistit</button>

          {/* new meal add */}
          <div className="hidden-print">
              <NewMeal submitNewMeal={(param) => this.handleSubmitNewMeal(param)} />
          </div>
        </div>
      );
    }
  }
}

export default App;
