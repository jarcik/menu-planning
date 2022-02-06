import React, { Component } from 'react';
import './MealsDrop.css';
import { LUNCH, DESSERTTYPE, DINNER, NOTE, DESSERT } from './constants';

class MealsDrop extends Component {

  constructor(props) {
      super(props);
      this.state = {value: ""};

      this.handleChange = this.handleChange.bind(this);
      this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  componentDidMount() {
    this.setSelectedState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedMenu !== this.props.selectedMenu) {
      this.setSelectedState();
    }
  }

  setSelectedState() {
    let selected = this.getMeals(this.props.dayTime, this.props.day, this.props.category) ?? "";
    this.setState({value:selected});
  }

  //get meals from data object
  getMeals(dayTime, day, category) {
    let selected = this.getDateTimeMeal(dayTime, this.props.selectedMenu[day]);
    let selectedValue = selected[category];    
    return selectedValue;
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

  handleChange(event) {
    let newValue = "";
    if(event.target.value) {
      newValue = parseInt(event.target.value);
    } else {      
      newValue = event.target.value;
    }

    if(this.state.value == event.target.value || this.state.value == newValue) return;

    this.setState({value: newValue});
    this.props.handleMealsDropChange({
        day: this.props.day,
        value: newValue,
        dayTime: this.props.dayTime,
        category: this.props.category
    });
  }

  handleChangeInput(event) {
    let newValue = event.target.value;
    if(this.state.value == event.target.value || this.state.value == newValue) return;
    this.setState({value: newValue});
    this.props.handleMealsDropChange({
        day: this.props.day,
        value: newValue,
        dayTime: this.props.dayTime,
        category: this.props.category
    });
  }

  render() {
      return(
        <div>
          {
            this.props.category.includes("note") &&
            <input type="text" className={this.props.category === NOTE ? "noteInput" : "" } value={this.state.value} onChange={this.handleChangeInput} />            
          }          
          {
            this.props.category.includes("note") && this.state.value &&
            <span className="only-print note">pozn.: {this.state.value}</span>
          }
          {
            !this.props.category.includes("note") &&
            <div>
              <span className="hidden-print">{this.props.category}</span>
              <select value={this.state.value} onChange={this.handleChange}>
                <option value=""></option>
                {this.props.meals &&
                    this.props.meals.map((meal) =>
                        <option
                            key={meal.id}
                            value={meal.id}>
                            {meal.name}
                        </option>
                )}
              </select>
              <span className="only-print meal-print">{this.props.meals && this.props.meals.find((q) => q.id == this.state.value)?.name}</span>
            </div>
          }
        </div>
      );
  }
}

export default MealsDrop;
