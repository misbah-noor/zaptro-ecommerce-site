import axios from 'axios';
import { createContext, useContext, useState } from 'react';

export const DataContext = createContext(null);

export const DataProvider = ({children}) => {
    const [data, setData] = useState()

    // fetching all products from api
    const fetchAllProducts = async()=>{
        try {
            const res = await axios.get('https://fakestoreapi.com/products?limit=20');
            // const productsData = res.data.products;
            setData(res.data);
            console.log(res.data);
        } catch (error) {
            console.log("Fetch error:", error);
            
        }
    }


     const getCategory = (data, property) =>{
     let newVal = data?.map((curElem)=>{
       return curElem[property]
     })
     newVal = ['ALL',...new Set(newVal)] 
     return newVal;
    }

    
    const categoryOnlyData = getCategory(data, 'category')
   

    return <DataContext.Provider value={{data, setData, fetchAllProducts, categoryOnlyData}}>
      {children}
    </DataContext.Provider>
}

export const getData = ()=> useContext(DataContext);