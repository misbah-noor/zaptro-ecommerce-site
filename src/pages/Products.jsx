import React, { useEffect, useState } from 'react'
import { getData } from '../context/DataContext'
import FilterSection from '../components/FilterSection'
import Loading from "../assets/src_assets_Loading4.webm"
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'


const Products = () => {
  const { data, fetchAllProducts } = getData();
  const { addToCart } = useCart();

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  const [priceRange, setPriceRange] = useState([0, 5000])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchAllProducts()
    window.scrollTo(0,0)
  }, [])

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
    setPage(1)
    setOpenFilter(false)
  }

  const pageHandler = (selectedPage) => {
    setPage(selectedPage)
    window.scrollTo(0, 0)
  }

  const filteredData = data?.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || item.category === category) &&
    item.price >= priceRange[0] && item.price <= priceRange[1]

  )

  const dynamicPage = Math.ceil(filteredData?.length / 8)

  return (
    <div>
      <div className='max-w-6xl mx-auto px-4 mb-10'>
        {
          data?.length > 0 ? (
            <>
              <div className='flex flex-col md:flex-row gap-8'>
                <FilterSection search={search} setSearch={setSearch} priceRange={priceRange} setPriceRange={setPriceRange} category={category} setCategory={setCategory} handleCategoryChange={handleCategoryChange} />
                {
                  filteredData?.length > 0 ? (
                    <div className='flex flex-col justify-center items-center'>
                      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-7 mt-10'>
                        {
                          filteredData?.slice(page * 8 - 8, page * 8).map((product, index) => {
                            return <ProductCard key={index} product={product} 
                            addToCart={addToCart}/>
                          })
                        }
                      </div>
                      {/* <Pagination pageHandler={pageHandler} page={page} dynamicPage={dynamicPage} /> */}
                    </div>
                  ) : (
                    <div className='flex justify-center items-center md:h-[600px] md:w-[900px] mt-10'>
                          
                    </div>
                  )
                }

              </div>


            </>
          ) : (
            <div className='flex items-center justify-center h-[400px]'>
              <video muted autoPlay loop>
                <source src={Loading} type='video/webm' />
              </video>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Products