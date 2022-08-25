// import { render, screen, waitFor } from "@testing-library/react"
import App from "../App";
import renderWithRouter from "./helpers/renderWithRouter";
// import userEvent from "@testing-library/user-event";
// // import { getMealsOrDrinks } from "../service/serviceApi";
// import drinksCategories from "./helpers/drinksCategories";
// import drinks from "./helpers/drinksRecipesMock";
// import beef from "./helpers/beefCategoryMock";
// import recipes from './helpers/recipesMock';
// import categories from './helpers/categoriesMock'
// import { act } from 'react-dom/test-utils';

import { render } from "@testing-library/react"


// describe('Testes do MainRecipes', () => {
//   it('Verifica se é renderizado as receitas', async () => {
//     jest.spyOn(global, 'fetch').mockImplementation((url) => {
//       if (url.includes('https://www.themealdb.com/api/json/v1/1/search.php?s=')) {
//         return ({
//           json: async () => recipes,
//         });
//       } else if (url.includes('https://www.themealdb.com/api/json/v1/1/list.php?c=list')) {
//         return ({
//           json: async () => categories,
//         });
//       } else if (url.includes('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef')) {
//         return ({
//           json: async () => beef,
//         });
//       }
//     })

//     const { history } =  renderWithRouter(<App />)
//     history.push('/foods')
//     const { pathname } = history.location;
    
//     expect(pathname).toBe('/foods')

//     const categoryBeef = await screen.findByTestId('Beef-category-filter')
//     userEvent.click(categoryBeef);
//     const teste = await screen.findByTestId('Beef-category-filter')
//     userEvent.click(teste);
//   })

//   it('Verifica se você é redirecionado ao clicar em um card de receita', async () => {
//     const obj = {
//       "meals": [
//         {
//           "idMeal": "52977",
//           "strMeal": "Corba",
//           "strDrinkAlternate": null,
//           "strCategory": "Side",
//           "strArea": "Turkish",
//           "strInstructions": "Pick through your lentils for any foreign debris, rinse them 2 or 3 times, drain, and set aside.  Fair warning, this will probably turn your lentils into a solid block that you’ll have to break up later\r\nIn a large pot over medium-high heat, sauté the olive oil and the onion with a pinch of salt for about 3 minutes, then add the carrots and cook for another 3 minutes.\r\nAdd the tomato paste and stir it around for around 1 minute. Now add the cumin, paprika, mint, thyme, black pepper, and red pepper as quickly as you can and stir for 10 seconds to bloom the spices. Congratulate yourself on how amazing your house now smells.\r\nImmediately add the lentils, water, broth, and salt. Bring the soup to a (gentle) boil.\r\nAfter it has come to a boil, reduce heat to medium-low, cover the pot halfway, and cook for 15-20 minutes or until the lentils have fallen apart and the carrots are completely cooked.\r\nAfter the soup has cooked and the lentils are tender, blend the soup either in a blender or simply use a hand blender to reach the consistency you desire. Taste for seasoning and add more salt if necessary.\r\nServe with crushed-up crackers, torn up bread, or something else to add some extra thickness.  You could also use a traditional thickener (like cornstarch or flour), but I prefer to add crackers for some texture and saltiness.  Makes great leftovers, stays good in the fridge for about a week.",
//           "strMealThumb": "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
//           "strTags": "Soup",
//           "strYoutube": "https://www.youtube.com/watch?v=VVnZd8A84z4",
//           "strIngredient1": "Lentils",
//           "strIngredient2": "Onion",
//           "strIngredient3": "Carrots",
//           "strIngredient4": "Tomato Puree",
//           "strIngredient5": "Cumin",
//           "strIngredient6": "Paprika",
//           "strIngredient7": "Mint",
//           "strIngredient8": "Thyme",
//           "strIngredient9": "Black Pepper",
//           "strIngredient10": "Red Pepper Flakes",
//           "strIngredient11": "Vegetable Stock",
//           "strIngredient12": "Water",
//           "strIngredient13": "Sea Salt",
//           "strIngredient14": "",
//           "strIngredient15": "",
//           "strIngredient16": "",
//           "strIngredient17": "",
//           "strIngredient18": "",
//           "strIngredient19": "",
//           "strIngredient20": "",
//           "strMeasure1": "1 cup ",
//           "strMeasure2": "1 large",
//           "strMeasure3": "1 large",
//           "strMeasure4": "1 tbs",
//           "strMeasure5": "2 tsp",
//           "strMeasure6": "1 tsp ",
//           "strMeasure7": "1/2 tsp",
//           "strMeasure8": "1/2 tsp",
//           "strMeasure9": "1/4 tsp",
//           "strMeasure10": "1/4 tsp",
//           "strMeasure11": "4 cups ",
//           "strMeasure12": "1 cup ",
//           "strMeasure13": "Pinch",
//           "strMeasure14": " ",
//           "strMeasure15": " ",
//           "strMeasure16": " ",
//           "strMeasure17": " ",
//           "strMeasure18": " ",
//           "strMeasure19": " ",
//           "strMeasure20": " ",
//           "strSource": "https://findingtimeforcooking.com/main-dishes/red-lentil-soup-corba/",
//           "strImageSource": null,
//           "strCreativeCommonsConfirmed": null,
//           "dateModified": null
//         }
//       ]
//     }
//     jest.spyOn(global, 'fetch').mockImplementation((url) => {
//       if (url.includes('https://www.themealdb.com/api/json/v1/1/search.php?s=')) {
//         return ({
//           json: async () => recipes,
//         });
//       } else if (url.includes('https://www.themealdb.com/api/json/v1/1/list.php?c=list')) {
//         return ({
//           json: async () => categories,
//         });
//       } else if (url.includes('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef')) {
//         return ({
//           json: async () => beef,
//         });
//       } else if (url.includes('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977')) {
//         return ({
//           json: async () => obj,
//         });
//       }
//     })

//     await act( async () => renderWithRouter(<App />))
    
//     const { history } = renderWithRouter(<App />);

//     const inputEmail = screen.getByTestId('email-input');
//     const inputSenha = screen.getByTestId('password-input');
//     const btnLogin = screen.getByTestId('login-submit-btn');

//     userEvent.type(inputEmail, 'test@test.com');
//     userEvent.type(inputSenha, '1234567');
//     userEvent.click(btnLogin);

//     expect(history.location.pathname).toBe('/foods')

//     expect(screen.getByText(/loading/i)).toBeInTheDocument()

//     const cardPositionZero = await screen.findByTestId('0-card-img');
//     expect(cardPositionZero).toBeInTheDocument();

//     global.fetch = jest.fn(async () => ({
//       json: async () => obj
//     }));

//     userEvent.click(cardPositionZero);

    // const { history } =  renderWithRouter(<App />)
    // history.push('/foods')

    // const recipeCard = await screen.findByTestId('0-recipe-card')
    // userEvent.click(recipeCard);

    // const { pathname } = history.location;
    // expect(pathname).toBe('/foods/52977');
  // });

  // it('Verifica existe botão de categoria', async () => {
  //   jest.spyOn(global, 'fetch').mockImplementation((url) => {
  //     if (url.includes('https://www.themealdb.com/api/json/v1/1/search.php?s=')) {
  //       return ({
  //         json: async () => recipes,
  //       });
  //     } else if (url.includes('https://www.themealdb.com/api/json/v1/1/list.php?c=list')) {
  //       return ({
  //         json: async () => categories,
  //       });
  //     } else if (url.includes('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef')) {
  //       return ({
  //         json: async () => beef,
  //       });
  //     }
  //   })
  //   const { history } =  renderWithRouter(<App />)
  //   history.push('/foods')
  //   const { pathname } = history.location;
    
  //   expect(pathname).toBe('/foods')
  //   const recipeCard = await screen.findByTestId('0-recipe-card');
  //   userEvent.click(recipeCard);
  //   userEvent.click(recipeCard);
  // })

  // it('Verifica se as bebidas são renderizadas', async () => {
  //   jest.spyOn(global, 'fetch').mockImplementation((url) => {
  //     if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')) {
  //       return ({
  //         json: async () => drinks,
  //       });
  //     } else if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')) {
  //       return ({
  //         json: async () => drinksCategories,
  //       });
  //     }
  //   })

  //   const { history } =  renderWithRouter(<App />)
  //   history.push('/drinks')
  //   const { pathname } = history.location;
    
  //   expect(pathname).toBe('/drinks')

  //   const recipeCard = await screen.findByTestId('0-recipe-card')
  //   userEvent.click(recipeCard);
  // })
// })

describe('test', () => {
  it('', () => {
    renderWithRouter(<App />)
  })
})
