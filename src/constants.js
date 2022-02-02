export const LUNCH = 0;
export const DESSERTTYPE = 1;
export const DINNER = 2;

//types of the daytimemeals
export const TYPES = [LUNCH, DESSERTTYPE, DINNER];

export const SOUP = "soup";
export const SOUPNOTE = "soupnote";
export const RICE = "rice";
export const LONGCOOK = "longcook";
export const LONGCOOKNOTE = "lnote";
export const PROTEIN = "protein";
export const SALAD = "salad";
export const SALADNOTE = "saladnote";
export const VEGE = "vege";
export const VEGENOTE = "vnote";
export const SEAWEED = "seaweed";
export const NOTE = "note";
export const DESSERT = "dessert";

//list of categories of the meals
export const CATEGORIES = [
    SOUP, 
    SOUPNOTE, 
    RICE, 
    LONGCOOK, 
    LONGCOOKNOTE, 
    PROTEIN, 
    SALAD, 
    SALADNOTE, 
    VEGE, 
    VEGENOTE,
    SEAWEED,
    NOTE,
    DESSERT
];

//list of categories of the meals
export const CATEGORIESWTHOUTNOTE = [
    SOUP, 
    RICE, 
    LONGCOOK, 
    PROTEIN, 
    SALAD, 
    VEGE, 
    SEAWEED,
    DESSERT
];

export const MEALOBJECT = {
    lunch: {
      soup: "",
      soupnote: "",
      rice: "",
      longcook: "",
      lcnote: "",
      protein: "",
      pnote: "",
      salad: "",
      saladnote: "",
      vege: "",
      vnote: "",
      seaweed: "",
      note: ""
    },
    dessert: "",
    dinner:{
      soup: "",
      soupnote: "",
      rice: "",
      longcook: "",
      lcnote: "",
      protein: "",
      pnote: "",
      salad: "",
      saladnote: "",
      vege: "",
      vnote: "",
      seaweed: "",
      note: ""
    }
  };