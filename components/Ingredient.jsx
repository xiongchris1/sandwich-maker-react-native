import { Suspense } from "react";
import { INGREDIENTS, useSandwich, addedToCart } from "../hooks/useSandwich";
import { Gltf, Text3D, Float, OrbitControls } from "@react-three/drei/native";
import fontPath from "../assets/fonts/Poppins Light Regular.json";
import { animated, useSpring } from "@react-spring/three";

const INGREDIENT_SCALE = 5;
const INGREDIENT_SCALE_Y = 8;

export const Ingredient = ({ ingredient, showPrice, ...props }) => {
  const { positionY } = useSpring({ positionY: props["position-y"] });
  const { scale } = useSpring({
    from: {
      scale: 0.5,
    },
    to: {
      scale: 1,
    },
  });
  const addedToCart = useSandwich((state) => state.addedToCart);
  const removeIngredient = useSandwich((state) => state.removeIngredient);
  return (
    <animated.group {...props} scale={scale} position-y={positionY}>
      {showPrice && (
        <Suspense>
          <group
            onClick={(e) => {
              e.stopPropagation();
              removeIngredient(ingredient);
            }}
            visible={!addedToCart}
          >
            <mesh position-x={1.13} position-y={0.042}>
              <planeGeometry args={[0.75, 0.17]} />
              <meshStandardMaterial color="white" opacity={0.26} transparent />
            </mesh>
            <Text3D
              font={fontPath}
              scale={0.12}
              bevelSegments={3}
              bevelThickness={0.001}
              position-x={0.84}
            >
              ${INGREDIENTS[ingredient.name].price.toFixed(2)}
            </Text3D>
            <Text3D
              font={fontPath}
              scale={0.1}
              bevelSegments={3}
              bevelEnabled
              bevelThickness={0.001}
              position-x={1.3}
            >
              X
              <meshBasicMaterial color="red" />
            </Text3D>
          </group>
        </Suspense>
      )}
      <Float
        floatingRange={addedToCart ? [0, 0] : [-0.01, 0.01]}
        speed={addedToCart ? 0 : 4}
        rotationIntensity={0.5}
      >
        <Gltf
          src={INGREDIENTS[ingredient.name].src}
          scale={INGREDIENT_SCALE}
          scale-y={INGREDIENT_SCALE_Y + (ingredient.name === "bread" ? 5 : 0)}
        />
      </Float>
    </animated.group>
  );
};
