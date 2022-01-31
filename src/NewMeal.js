import React, { Component } from 'react';
import { SOUP, SALAD, SIDEDISH, DESSERT } from './constants';
import './NewMeal.css';

//form for the new meal
class NewMeal extends Component {
    constructor(props) {
      super(props);
      this.state = {
          name: "",
          category: SOUP
        };
  
      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleChangeType = this.handleChangeType.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    //handle changes on input for name of the meal
    handleChangeName(event) {
      this.setState({name: event.target.value});
    }
  
    //handle changes on dropdown for type of the meal
    handleChangeType(event) {
        this.setState({category: event.target.value});
      }
    
    //handle submit of the form for the new meal
    handleSubmit(event) {
      event.preventDefault();
      //bubble the event to the parent component
      this.props.submitNewMeal({
          name: this.state.name,
          category: this.state.category
      });
      this.setState({
        name: ""
      });
      event.preventDefault();
      return false;
    }

    //get czech name of type of the meal
    getMealType(mealType) {
        switch(mealType) {
            case SOUP:
                return "Polévka";
            case SIDEDISH:
                return "Příloha";
            case DESSERT:
                return "Dezert";
            case SALAD:
                return "Hlavní jídlo";
            default:
                return "";
        }
    }
  
    render() {    
    //array for looping throught the types of the meal    
    const mealType = [SOUP, SALAD, SIDEDISH, DESSERT];
      return (
        <form onSubmit={this.handleSubmit}>
        <h2>Přidání nového jídla</h2>
          <label>
            Název:
            <input type="text" value={this.state.name} onChange={this.handleChangeName} />
          </label>
          <label>
              Typ:
              <select className="newMealSelect" value={this.state.category} onChange={this.handleChangeType}>
                    {
                        mealType &&
                        mealType.map((mealType) =>
                            <option
                                key={mealType+"new"}
                                value={mealType}>
                                {this.getMealType(mealType)}
                            </option>
                    )}
                </select>
          </label>
          <input disabled={!this.state.name} type="submit" value="Uložit" />
        </form>
      );
    }
  }

  export default NewMeal;