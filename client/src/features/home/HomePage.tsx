import { Box, Typography } from "@material-ui/core";
import Slider from "react-slick";

export default function HomePage() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <>
            <Slider {...settings}>
                <div>
                    <img src="/images/hero1.jpg" alt="hero" style={{ display: 'block', width: '100%', maxHeight: 400 }} />
                </div>
                <div>
                    <img src="/images/hero2.jpg" alt="hero" style={{ display: 'block', width: '100%', maxHeight: 300 }} />
                </div>
                <div>
                    <img src="/images/hero3.jpg" alt="hero" style={{ display: 'block', width: '100%', maxHeight: 400 }} />
                </div>
            </Slider>
            <Box display='flex' justifyContent="center" sx={{ p: 4 }}>
                <Typography variant='h1'>
                    Welcome to the ReStore!
                </Typography>
            </Box>
        </>
    )
}