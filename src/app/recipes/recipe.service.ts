import { Injectable } from "@angular/core";

import { Recipe } from "./recipes.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";


@Injectable()
export class RecipeService {

    private recipes: Recipe[] = [
        new Recipe('Test', 'this is a test', 'https://assets.bonappetit.com/photos/64349ba03fd52da4745a35f4/1:1/w_1920,c_limit/04102023-ratatouille-lede.jpg', [new Ingredient('Meat', 1)]),
        new Recipe('Test 2', 'this is a test', 'https://assets.bonappetit.com/photos/64349ba03fd52da4745a35f4/1:1/w_1920,c_limit/04102023-ratatouille-lede.jpg', [new Ingredient('French fries', 10)])
    ];

    constructor(private slService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice()
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngretiens(ingredients);
    }

}