import React from "react";
import { Carousel } from 'react-bootstrap';

interface Props {
    sliders?: string[];
}

const DEFAULT_SLIDERS = ["/slider1.png", "/slider2.png"];

const CarouselComponent: React.FC<Props> = ({ sliders = DEFAULT_SLIDERS }: Props) => {
    return (
        <Carousel>
            {sliders.map((image: string) =>
                <Carousel.Item key={image}>
                    <img
                        className="d-block w-100"
                        src={image}
                        alt={image}
                    />
                </Carousel.Item>
            )}
        </Carousel>
    );
};

export default CarouselComponent;
