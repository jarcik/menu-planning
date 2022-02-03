import React, { Component } from 'react';
import { SOUP, RICE, LONGCOOK,
  PROTEIN, SALAD, VEGE, SEAWEED, 
  CATEGORIESWTHOUTNOTE, DESSERT } from './constants';
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

    //get name of type of the meal
    getMealType(mealType) {
        switch(mealType) {
            case SOUP:
                return "Soup";
            case RICE:
                return "Rice";
            case LONGCOOK:
                return "Long Cook";
            case PROTEIN:
                return "Protein";
            case SALAD:
                return "Salad";
            case VEGE:
                return "Vegetables";
            case SEAWEED:
                return "Seaweed";
            case DESSERT:
                return "Dessert";
            default:
                return "";
        }
    }
  
    render() {    
      return (
        <form onSubmit={this.handleSubmit}>
        <h2>Přidání nového jídla</h2>
          <label className="newMeal">
            Název:
            <input className="newMeal" type="text" value={this.state.name} onChange={this.handleChangeName} />
          </label>
          <label>
              Kategorie:
              <select className="newMeal" value={this.state.category} onChange={this.handleChangeType}>
                    {
                      CATEGORIESWTHOUTNOTE &&
                      CATEGORIESWTHOUTNOTE.map((mealType) =>
                            <option
                                key={mealType+"new"}
                                value={mealType}>
                                {this.getMealType(mealType)}
                            </option>
                    )}
                </select>
          </label>
          <input className="newMeal" disabled={!this.state.name} type="submit" value="Uložit" />
        </form>
      );
    }
  }

  export default NewMeal;