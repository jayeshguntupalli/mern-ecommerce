import Slider from 'react-slick';
import { Box } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const ProductBanner = ({ images }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false
    };

    return (
        <Slider {...settings}>
            {images.map((image, index) => (
                <div key={index} style={{ width: "100%", height: '100%' }}>
                    <Box component="img" sx={{ width: '100%', objectFit: "contain" }} src={image} alt={'Banner Image'} />
                </div>
            ))}
        </Slider>
    );
};
