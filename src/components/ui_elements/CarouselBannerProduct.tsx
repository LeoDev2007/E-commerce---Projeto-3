import type { IconButtonProps } from "@chakra-ui/react";
import {
  AspectRatio,
  Box,
  Carousel,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import bannerAsus from "../../assets/Banner promocional Asus Zenbook Pro.png";
import camisa from "../../assets/Camisa xadrez azul e preta.png";
import vestido from "../../assets/Vestido elegante para eventos formais.png";

const CarouselProduct = () => {
  return (
    <Carousel.Root
      slideCount={items.length}
      loop
      autoplay={{ delay: 3000 }}
      maxW="2xl"
      mx="auto"
      gap="4"
      position="relative"
      colorPalette="white"
      rounded="2xl"
      overflow="hidden"
      boxShadow="0 15px 40px rgba(0, 0, 0, 0.35)"
    >
      <Carousel.Control gap="4" width="full" position="relative">
        <Carousel.PrevTrigger asChild>
          <ActionButton insetStart="4">
            <LuArrowLeft />
          </ActionButton>
        </Carousel.PrevTrigger>

        <Carousel.ItemGroup width="full">
          {items.map((src, index) => (
            <Carousel.Item key={index} index={index}>
              <AspectRatio ratio={16 / 9} maxH="72vh" w="full">
                <Image
                  src={src}
                  alt={`Product ${index + 1}`}
                  objectFit="cover"
                  rounded="2xl"
                />
              </AspectRatio>
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>

        <Carousel.NextTrigger asChild>
          <ActionButton insetEnd="4">
            <LuArrowRight />
          </ActionButton>
        </Carousel.NextTrigger>

        <Box position="absolute" bottom="6" width="full">
          <Carousel.Indicators
            transition="width 0.2s ease-in-out"
            transformOrigin="center"
            opacity="0.5"
            boxSize="2"
            _current={{ width: "10", bg: "colorPalette.subtle", opacity: 1 }}
          />
        </Box>
      </Carousel.Control>

      <Carousel.AutoplayTrigger display="none" />
    </Carousel.Root>
  );
};

const ActionButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function ActionButton(props, ref) {
    return (
      <IconButton
        {...props}
        ref={ref}
        size="xs"
        variant="outline"
        rounded="full"
        position="absolute"
        zIndex="1"
        bg="bg"
      />
    );
  },
);

const items = [bannerAsus, vestido, camisa];

export default CarouselProduct;
