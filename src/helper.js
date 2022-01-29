import { LUNCH, DESSERTTYPE, DINNER, SOUP, SALAD, SIDEDISH, DESSERT } from './constants';

static class Helper {

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
    
    //check and print
    print(check) {
        //check before printing
        if(check) {
            //everything alright, lets prnt
            window.print();
        } else {
            alert("Nejsou vyplněna všechna pole. Prosím, doplňte.");
        }
    }

    
    //check if every object in menu is selected
    check(selectedMenu) {
        for(let i = 0; i < 7; i++) {
            let meal = selectedMenu[i];
            if(!meal 
                || !meal.lunch || !meal.lunch.soup || !meal.lunch.salad || !meal.lunch.sidedish
                || !meal.dinner || !meal.dinner.soup || !meal.dinner.salad || !meal.dinner.sidedish
                || !meal.dessert)
            return false;
        }
        return true;
    }

}
