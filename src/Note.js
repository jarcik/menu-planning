import React, { Component } from 'react';
import './MealsDrop.css';
import { LUNCH, DESSERTTYPE, DINNER, SOUP, SALAD, SIDEDISH, DESSERT } from './constants';

class Note extends Component {

  constructor(props) {
      super(props);
      this.state = {value: ""};

      this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    //this.setSelectedState();
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.selectedMenu !== this.props.selectedMenu) {
    //   this.setSelectedState();
    // }
  }

  setSelectedState() {
    let selected = this.getMeals(this.props.type, this.props.dayTime, this.props.day) ?? "";
    this.setState({value:selected});
  }

  //get meals from data object
  getMeals(type, dayTime, day) {
    let selected = this.getDateTimeMeal(dayTime, this.props.selectedMenu[day]);
    let selectedValue = selected[type];    
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
    let newValue = parseInt(event.target.value);
    if(this.state.value == event.target.value || this.state.value == newValue) return;

    //update selected state
    if(this.state.value) {
      let old = this.props.meals.find((q) => q.id === this.state.value);
      old.selected = false;
    }
    this.props.meals.find((q) => q.id === newValue).selected = true;

    this.setState({value: newValue});
    this.props.handleMealsDropChange({
        day: this.props.day,
        value: newValue,
        type: this.props.type,
        dayTime: this.props.dayTime
    });
  }

  render() {
      return(
        <div>
          
        </div>
      );
  }
}

export default Note;
