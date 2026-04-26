import type { IconButtonProps } from "@chakra-ui/react";
import {
  Box,
  Carousel,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProducts";

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

const CarouselImageProduct = () => {
  const { id } = useParams();
  const { data, isLoading } = useProduct(Number(id));

  if (isLoading) return <p>Carregando...</p>;
  if (!data) return null;

  const hasMultipleImages = data.images.length > 1;

  if (!hasMultipleImages) {
    return (
      <Image
        src={data.thumbnail}
        alt={data.title}
        maxH="400px"
        maxW="100%"
        w="auto"
        mx="auto"
        display="block"
      />
    );
  }

  return (
    <Carousel.Root
      slideCount={data.images.length}
      w="full"
      gap="4"
      position="relative"
      colorPalette="white"
    >
      <Carousel.Control gap="4" width="full" position="relative">
        <Carousel.PrevTrigger asChild>
          <ActionButton insetStart="4">
            <LuArrowLeft />
          </ActionButton>
        </Carousel.PrevTrigger>

        <Carousel.ItemGroup width="full">
          {data.images.map((img, index) => (
            <Carousel.Item key={index} index={index} height="60vh">
              <Image
                src={img}
                alt={`${data.title} - ${index + 1}`}
                objectFit="contain"
                height="60vh"
                w="full"
                mx="auto"
              />
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
            bg="#4813AA"
            _current={{ width: "10", bg: "#000", opacity: 1 }}
          />
        </Box>
      </Carousel.Control>
    </Carousel.Root>
  );
};

export default CarouselImageProduct;
