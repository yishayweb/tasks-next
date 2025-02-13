// import type React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Groceries } from "../chat/actions/joke";

// type RecipeProps = {
//   title: string;
//   ingredients: Groceries;
//   instructions: string[];
// };

// const Recipe: React.FC<RecipeProps> = ({
//   title,
//   ingredients,
//   instructions,
// }) => {
//   return (
//     <Card className="w-full max-w-2xl mx-auto">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-center">
//           {title}
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
//           <ul className="list-disc list-inside">
//             {ingredients.foodData?.map((ingredient, index) => (
//               <li key={index} className="mb-1">
//                 <span className="font-medium">{ingredient?.name}</span>:{" "}
//                 {ingredient?.quantity}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-xl font-semibold mb-2">Instructions:</h3>
//           <ul className="list-decimal list-inside list-none">
//             {instructions.map((step, index) => (
//               <li key={index} className="mb-2">
//                 {step}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default Recipe;

import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UtensilsCrossed } from "lucide-react";
import { Groceries } from "../chat/actions/joke";

type RecipeProps = {
  title: string;
  ingredients: Groceries;
  instructions: string[];
};

const IngredientList: React.FC<{ ingredients: Groceries }> = ({
  ingredients,
}) => (
  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
    {ingredients.foodData?.map((ingredient, index) => (
      <li
        key={index}
        className="flex justify-between items-center p-2 rounded-lg transition-colors duration-200 hover:bg-white/50"
      >
        <span className="text-gray-800 font-medium">{ingredient?.name}</span>
        <span className="text-gray-600 bg-white/70 px-2 py-1 rounded-full text-sm">
          {ingredient?.quantity}
        </span>
      </li>
    ))}
  </ul>
);

const Instructions: React.FC<{ instructions: string[] }> = ({
  instructions,
}) => (
  <ul className="space-y-4 list-decimal list-inside list-none">
    {instructions.map((step, index) => (
      <li key={index} className="text-gray-700 leading-relaxed">
        <span className="font-medium">{step.trim()}.</span>
      </li>
    ))}
  </ul>
);

const Recipe: React.FC<RecipeProps> = ({
  title,
  ingredients,
  instructions,
}) => {
  return (
    <Card className="max-w-3xl mx-auto bg-gradient-to-br from-amber-50 to-teal-50 shadow-xl overflow-hidden">
      <div className="bg-amber-100 p-4 flex justify-center items-center">
        <UtensilsCrossed className="text-amber-600 w-8 h-8" />
      </div>
      <CardHeader className="text-center pb-0">
        <CardTitle className="text-3xl font-serif text-gray-800 font-bold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 p-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-amber-700 flex items-center">
            <span className="mr-2">Ingredients</span>
            <Separator className="flex-grow bg-amber-200" />
          </h2>
          <IngredientList ingredients={ingredients} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-teal-700 flex items-center">
            <span className="mr-2">Instructions</span>
            <Separator className="flex-grow bg-teal-200" />
          </h2>
          <Instructions instructions={instructions} />
        </div>
      </CardContent>
    </Card>
  );
};

export default Recipe;
