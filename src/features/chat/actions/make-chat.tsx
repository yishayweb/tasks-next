"use server";

import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { ReactNode } from "react";
import { z } from "zod";
import { nanoid } from "nanoid";
import { JokeComponent } from "./joke-component";
import { generateObject } from "ai";
import { groceriesSchema, jokeSchema } from "./joke";
// import { GroceriesList } from "./groceries-list";
import Recipe from "@/features/Recipe";

export interface ServerMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ClientMessage {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
}

export async function continueConversation(
  input: string
): Promise<ClientMessage> {
  "use server";

  const history = getMutableAIState();

  const result = await streamUI({
    model: openai("gpt-4o-mini"),
    messages: [...history.get(), { role: "user", content: input }],
    text: ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: "assistant", content },
        ]);
      }

      return <div>{content}</div>;
    },
    tools: {
      tellAJoke: {
        description: "Tell a joke",
        parameters: z.object({
          location: z.string().describe("the users location"),
        }),
        generate: async function* ({ location }) {
          yield <div>loading...</div>;
          const joke = await generateObject({
            model: openai("gpt-4-turbo"),
            schema: jokeSchema,
            prompt:
              "Generate a joke that incorporates the following location:" +
              location,
          });
          return <JokeComponent joke={joke.object} />;
        },
      },
      // createGroceriesList: {
      //   description: "Create a groceries list of a specific product type",
      //   parameters: z.object({
      //     productType: z
      //       .string()
      //       .describe("the type of groceries to include in the list"),
      //   }),
      //   generate: async function* ({ productType }) {
      //     yield <div>loading...</div>;
      //     const groceriesItems = await generateObject({
      //       model: openai("gpt-4o-mini"),
      //       schema: groceriesSchema,
      //       prompt:
      //         "Generate a groceries list that are all from type:" +
      //         productType +
      //         ". The groceries list should include at least 5 items separated by comma.",
      //     });
      //     return <GroceriesList groceries={groceriesItems.object} />;
      //   },
      // },
      foodRecipe: {
        description: "Create a groceries list of a requested recipe to cook",
        parameters: z.object({
          foodType: z.string().describe("the type of food to cook"),
        }),
        generate: async function* ({ foodType }) {
          yield <div>loading...</div>;
          const groceriesItems = await generateObject({
            model: openai("gpt-4-turbo"),
            schema: groceriesSchema,
            prompt:
              "Generate a groceries list that are needed for cooking:" +
              foodType +
              ". The groceries should come as an array of objects where each object describe an ingredient " +
              "and includes the name of the ingredient, the quantity in grams " +
              "There should also be another field of instructions that includes the steps to cook the food.",
          });
          return (
            <Recipe
              title={foodType}
              ingredients={groceriesItems.object}
              instructions={groceriesItems.object.instructions.split("\n")}
            />
          );
        },
      },
    },
  });

  return {
    id: nanoid(),
    role: "assistant",
    display: result.value,
  };
}

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    continueConversation,
  },
  initialAIState: [],
  initialUIState: [
    {
      id: "xbncbxncbxnbcnx",
      display: "Hello! How can I assist you with your tasks today?",
      role: "assistant",
    },
  ],
});
