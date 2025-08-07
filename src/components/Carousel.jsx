import React, { useEffect } from 'react'
import { getData } from '../context/DataContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { BiLeftArrowAlt } from "react-icons/bi";
import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from 'react-router-dom';

function Carousel() {
    //destructor function
    const {data, fetchAllProducts} = getData();
    console.log(data);
    
    useEffect(()=>{
        console.log("Carousel mounted");
        fetchAllProducts()
    }, [])

    // carousel buttons

    const SamplePrevArrow = (props) =>{
        const {className, style, onClick} = props;
        return( 
        <div onClick={onClick} className={`arrow ${className}`} style={{zIndex:3}}>
        <BiLeftArrowAlt className='arrows' style={{...style, display: 'block', borderRadius: '50px', background: "#f53347", color: "white", position: "absolute", padding: "2px", left: "50px"}}
        onMouseOver='this.style.backgroundColor=#555'/>
        </div>
        )
    }

    const SampleNextArrow = (props)=>{
        const {className, style, onClick} = props;
        return (<div onClick={onClick} className={`arrow ${className}`} style={{zIndex:3}}>
       <BiRightArrowAlt
       className='arrows' style={{...style, display:'block', borderRadius:'50px', position: 'absolute', padding: '2px', right:'50px', background: '#f53347', color:'white'}} />
        </div>
        )
    }

    var settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow to='next'/>,
    prevArrow: <SamplePrevArrow to='prev'/>
  };

  return (
    <div>
      <Slider {...settings}>
        {data?.slice(0,7)?.map((item, index)=>{
            return <div key={index} className='bg-gradient-to-r from-gray-800 via-purple-900 to-gray-800 -z-10 py-25 md:py-8 px-5'>
            <div className='flex flex-col md:flex-row  justify-center items-center h-[520px] gap-10 my-10 md:my-0 px-4'>
            <div className='md:space-y-6 space-y-3'>
             <h3 className='font-semibold text-md font-serif text-red-500'>Powering Your World with the Best in Electronics</h3>
             <h1 className='md:text-4xl text-xl font-bold uppercase line-clamp-2 md:line-clamp-3 md:w-[500px] text-white'>{item.title}</h1>
             <p className='md:w-[500px] line-clamp-3 text-gray-400 pr-7'>{item.description}</p>
                <Link to='/products'>
                <button className='bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer mt-2'>Shop Now</button>
                </Link>
            </div>
            <div>
                <img src={item.image} alt={item.title} className='rounded-full w-[430px] h-[430px] hover:scale-105 transition-all shadow-2xl shadow-red-400'/>
            </div>

            </div>
            </div>
        })}
    </Slider>
    </div>
  )
}

export default Carousel;
