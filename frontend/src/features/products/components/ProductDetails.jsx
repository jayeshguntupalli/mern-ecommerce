import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    clearSelectedProduct,
    fetchProductByIdAsync,
    resetProductFetchStatus,
    selectProductFetchStatus,
    selectSelectedProduct
} from '../ProductSlice';
import { Box, Checkbox, Rating, Stack, Typography, Button, Paper, useTheme } from '@mui/material';
import { addToCartAsync, resetCartItemAddStatus, selectCartItemAddStatus, selectCartItems } from '../../cart/CartSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { fetchReviewsByProductIdAsync, resetReviewFetchStatus, selectReviews } from '../../review/ReviewSlice';
import { Reviews } from '../../review/components/Reviews';
import { toast } from 'react-toastify';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const COLORS = ['#020202', '#F6F6F6', '#B82222', '#BEA9A9', '#E2BB8D'];

export const ProductDetails = () => {
    const { id } = useParams();
    const product = useSelector(selectSelectedProduct);
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const theme = useTheme();
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColorIndex, setSelectedColorIndex] = useState(-1);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductByIdAsync(id));
        }
    }, [id]);

    const handleAddToCart = () => {
        const item = { product: id, quantity };
        dispatch(addToCartAsync(item));
        setQuantity(1);
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        nextArrow: <KeyboardArrowRight />,
        prevArrow: <KeyboardArrowLeft />
    };

    return (
        <Stack spacing={2}>
            <Slider {...settings}>
                {product?.images.map((image, index) => (
                    <div key={index} style={{ width: "100%", height: '100%' }}>
                        <Box component="img" sx={{ width: '100%', objectFit: "contain", overflow: "hidden" }} src={image} alt={product?.title} />
                    </div>
                ))}
            </Slider>
            <Typography variant="h4" fontWeight="600">{product?.title}</Typography>
            <Rating value={product?.rating || 0} readOnly />
            <Typography variant="h5">${product?.price}</Typography>
            <Typography>{product?.description}</Typography>

            <Stack direction="row" spacing={1}>
                <Typography>Colors:</Typography>
                {COLORS.map((color, index) => (
                    <Box
                        key={index}
                        onClick={() => setSelectedColorIndex(index)}
                        sx={{
                            width: 30,
                            height: 30,
                            backgroundColor: color,
                            border: selectedColorIndex === index ? `2px solid ${theme.palette.primary.main}` : "1px solid gray",
                            cursor: "pointer"
                        }}
                    />
                ))}
            </Stack>

            <Stack direction="row" spacing={1}>
                <Typography>Size:</Typography>
                {SIZES.map((size) => (
                    <Button
                        key={size}
                        variant={selectedSize === size ? "contained" : "outlined"}
                        onClick={() => handleSizeSelect(size)}
                    >
                        {size}
                    </Button>
                ))}
            </Stack>

            <Stack direction="row" spacing={2}>
                <Button onClick={handleAddToCart} variant="contained">Add to Cart</Button>
                <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    checked={product?.isInWishlist}
                />
            </Stack>

            <Box>
                <LocalShippingOutlinedIcon />
                <Typography>Free Delivery</Typography>
            </Box>
            <Box>
                <CachedOutlinedIcon />
                <Typography>30 Days Return</Typography>
            </Box>

            <Reviews productId={id} />
        </Stack>
    );
};
