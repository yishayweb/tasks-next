import { DeepPartial } from "ai";
import { z } from "zod";

export const jokeSchema = z.object({
  setup: z.string().describe("the setup of the joke"),
  punchline: z.string().describe("the punchline of the joke"),
});

export type Joke = DeepPartial<typeof jokeSchema>;

export const ingredientSchema = z.object({
  name: z.string().describe("the name of the ingredient"),
  quantity: z.string().describe("the quantity of the ingredient"),
  // imageUrl: z.string().describe("the image url of the ingredient"),
});

// export const groceriesSchema = z.object({
//   items: z.string().describe("the list of groceries"),
// });

export const ingredientsArraySchema = z.array(ingredientSchema);

export const groceriesSchema = z.object({
  foodData: ingredientsArraySchema,
  instructions: z.string().describe("the instructions of the recipe"),
});

export type Groceries = DeepPartial<typeof groceriesSchema>;
