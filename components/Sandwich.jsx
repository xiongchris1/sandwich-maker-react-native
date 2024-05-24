import { useFrame } from "@react-three/fiber";
import { useSandwich } from "../hooks/useSandwich";
import { Ingredient } from "./Ingredient";
import { ContactShadows } from "@react-three/drei";
import { useRef, useEffect } from "react";

const INGREDIENT_SPACING = 0.3;
const INGREDIENT_SPACING_FINAL = 0.06;

export const Sandwich = () => {
  const sandwich = useRef();
  const ingredients = useSandwich((state) => state.ingredients);
  const addedToCart = useSandwich((state) => state.addedToCart);
  const ingredientSpacing = addedToCart
    ? INGREDIENT_SPACING_FINAL
    : INGREDIENT_SPACING;

  // Rotation of sandwich
  useFrame(() => {
    if (addedToCart) {
      sandwich.current.rotation.y += 0.01;
    }
  });

  // Reset rotation when canceling order
  useEffect(() => {
    if (!addedToCart && sandwich.current) {
      sandwich.current.rotation.y = 0;
    }
  }, [addedToCart]);

  return (
    <group position-y={(-ingredients.length * ingredientSpacing) / 2}>
      <group ref={sandwich}>
        {ingredients.map((ingredient, index) => (
          <Ingredient
            key={ingredient.id + ingredient.name}
            showPrice={index > 0 && index < ingredients.length - 1}
            ingredient={ingredient}
            position-y={index * ingredientSpacing}
          />
        ))}
      </group>
      <ContactShadows position-y={-0.5} opacity={0.5} />
    </group>
  );
};
