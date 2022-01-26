import React, { Component } from 'react';
import './MealsDrop.css';

class MealsDrop extends Component {

  constructor(props) {
      super(props);
      this.state = {value: ""};

      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let newValue = parseInt(event.target.value);
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
        <select value={this.state.value} onChange={this.handleChange}>
            <option value=""></option>
            {this.props.meals && 
                this.props.meals.map((meal) => 
                    <option 
                        key={meal.id} 
                        value={meal.id} 
                        selected={meal.selected}>
                        {meal.name}
                    </option>
            )}
        </select>
      );
  }
}

export default MealsDrop;
