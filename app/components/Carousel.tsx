
// Import Swiper React components
//import { Swiper, SwiperSlide } from 'swiper/react';
//import { Pagination, Navigation, Scrollbar, A11y } from "swiper";
//import Carousel from "react-multi-carousel";
//import "react-multi-carousel/lib/styles.css";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
//import "~/styles/slider.css";
import arrow_next from "~/assets/slider_arrow_next.png";
import arrow_prev from "~/assets/slider_arrow_prev.png";
//import slide_dot_odd_off from "~/assets/slider_dot_odd_off.png";
//import slide_dot_even_off from "~/assets/slider_dot_even_off.png";

import { Slide, SlideProps } from "./interfaces/SlideProps";
import { useState, useRef, useEffect } from "react";
//import carousel_css from "Caroyusel.css"
export default function PromptCarousel({slides}: SlideProps) {
    let autoScroll = false;
    let transitionSpeed = 700;
    let speed = 3000;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleSlide, setVisibleSlide] = useState(2)
	const [hasTransitionClass, setHasTransitionClass] = useState(true)
    const [stateSlides, setStateSlides] = useState(slides)
    const [leftAndRightDisabled, setLeftAndRightDisabled] = useState(false)
    const intervalId = useRef<number | null>(null)


    useEffect(() => {
        const slidesWithClones = [...slides]
        slidesWithClones.unshift(slidesWithClones[slidesWithClones.length - 1])
        slidesWithClones.unshift(slidesWithClones[slidesWithClones.length - 2])
        slidesWithClones.push(slidesWithClones[1])
        slidesWithClones.push(slidesWithClones[2])
        setStateSlides(slidesWithClones)
        if (!!autoScroll) {
            start()
        }

    }, [])


    useEffect(() => {
        if (visibleSlide == stateSlides.length - 2) {
            setLeftAndRightDisabled(true)
            setTimeout(() => {
                setHasTransitionClass(false)
                setVisibleSlide(2)
            }, transitionSpeed)
        }
        
        if (visibleSlide === 2) {
            setTimeout(() => {
            setHasTransitionClass(true)
        }, transitionSpeed)
        }
        
        if (visibleSlide === 1) {
            setLeftAndRightDisabled(true)
            setTimeout(() => {
                setHasTransitionClass(false)
                setVisibleSlide(stateSlides.length - 3)
            }, transitionSpeed)
        }
        
        if (visibleSlide == stateSlides.length - 3) {
            setTimeout(() => {
            setHasTransitionClass(true)
        }, transitionSpeed)
        }
    }, [visibleSlide])

  	useEffect(() => {
        if (leftAndRightDisabled) {
        setTimeout(() => {
            setLeftAndRightDisabled(false)
        }, transitionSpeed*2)
        }
    }, [leftAndRightDisabled])
    

    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            backgroundImage: `url(${slides[currentIndex].src.nyan_cat})`,
            backgroundColor: slides[currentIndex].bg_color
        },
        slide_container: {
            transform: `translateX(-${visibleSlide * 120/2}%)`
        },
        button_next: {
            backgroundImage: `url(${arrow_next})`,
            textIndent: "-9999px"
        },
        button_prev: {
            backgroundImage: `url(${arrow_prev})`,
            textIndent: "-9999px"
        },
        slick_dots: {
            display: "block"
        }
    };

    const start = () => {
        if (intervalId.current != null) {
            return
        }
        intervalId.current = setInterval(() => {
        setVisibleSlide(prevVisibleSlide => {
            if (prevVisibleSlide + 1 === stateSlides.length) {
                return 0
            }
            return prevVisibleSlide + 1
            })
        }, speed)
    }
    
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    
    const prevSlide = () => {
        //const isFirstSlide = currentIndex === 0;
        //const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        //setCurrentIndex(newIndex);
        setVisibleSlide(visibleSlide - 1)
        setLeftAndRightDisabled(true);
    }

    const nextSlide = () => {
        //const isLastSlide = currentIndex === slides.length - 1;
        //const newIndex = isLastSlide ? 0 : currentIndex + 1;
        //setCurrentIndex(newIndex);
        setVisibleSlide(visibleSlide + 1)
        setLeftAndRightDisabled(true);
    }

    const gotoSlide = (slideIndex: any) => {
        //setCurrentIndex(slideIndex)
        setVisibleSlide(slideIndex)
        setLeftAndRightDisabled(true);
    }

    return (
    <>
    <div className="max-w-full max-h-[780px] w-full m-auto py-16 px-4 relative overflow-hidden">
        {/* <div style={styles.container} className="w-full h-full bg-center bg-cover duration-500">
        </div> */}
        <div style={styles.slide_container} className={`px-[20%] pb-1 transition-transform flex ease-in-out duration-700 ${!hasTransitionClass? "!transition-none" : ""}`}>
            {stateSlides.map((slide, index) => {
                return <div key={index} className={`min-w-full w-full h-full bg-center bg-cover inline-block text-center shadow-md`}>
                    <img src={slide.src.nyan_cat} alt={slide.alt} className={`bg-[${slide.bg_color}]`}/>
                    <h3 className="py-10">\GBL/MEOW MEOW MEOW Tra lai Te Liet toi day</h3>
                </div>
            })}
        </div>
        <button type="button" style={styles.button_prev} onClick={!leftAndRightDisabled? prevSlide : undefined} className="brightness-100 hover:brightness-110 absolute bg-center bg-cover bottom-[25px] w-[50px] h-[50px] -translate-x-0 -translate-y-[-50%] left-[20%] text-2xl p-2 cursor-pointer z-[1]">
        Previous
        </button>
        <button type="button" style={styles.button_next} onClick={!leftAndRightDisabled? nextSlide : undefined} className="brightness-100 hover:brightness-110 absolute bg-center bg-cover bottom-[25px] w-[50px] h-[50px] -translate-x-0 -translate-y-[-50%] right-[20%] text-2xl p-2 cursor-pointer z-[1]">
        Next
        </button>
        <ul className="absolute bottom-[15px] block w-[100%] text-center">
            {
                stateSlides.map((slide, slideIndex) => {
                    if (slideIndex === 0 || slideIndex === 1 || slideIndex === stateSlides.length - 1 || slideIndex === stateSlides.length - 2) {
            	        return null
                    }
                    return (
                    <li key={slideIndex} onClick={() => gotoSlide(slideIndex)} className={`leading-none inline-block w-[15px] h-[16px] mr-[23px] bg-cover cursor-pointer ${slideIndex === visibleSlide || slideIndex === 2 && visibleSlide === stateSlides.length - 2 || slideIndex === stateSlides.length - 2 && visibleSlide === 1 ? "odd:bg-[url('../assets/slider_dot_odd_on.png')] even:bg-[url('../assets/slider_dot_even_on.png')]" : "odd:bg-[url('../assets/slider_dot_odd_off.png')] even:bg-[url('../assets/slider_dot_even_off.png')]"}`}><button type="button" className="invisible"></button></li>
                )})
            }
        </ul>
    </div>
    
    {/* <div style={styles0}><img src={slide.src.nyan_cat} alt={slide.alt} style={image}></img></div> */}
    </>
    );
}
