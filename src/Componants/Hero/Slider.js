import React from 'react';
import Carousel from 'react-multi-carousel';

const Slider = () => {
    return (
        <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        // containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 1
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 1
          }
        }}
      
      >
        
        <div className="relative w-full">
          <img
            src="https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            alt='loading'
            className='w-[99.9%] h-[600px]'
            
             
          />
          <div className="absolute   flex items-center justify-center">
           <div>
            dsfdsf
           <p className="text-white text-2xl font-bold">Centered Text</p>
            <p className="text-white text-2xl font-bold">Centered Text</p>
           </div>
          </div>
        </div>    
      </Carousel>
    );
};

export default Slider;