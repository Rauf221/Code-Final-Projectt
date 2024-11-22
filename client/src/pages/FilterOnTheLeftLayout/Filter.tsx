"use client";

import React from 'react';

import Header from '@/components/Header/HeaderTop/header';
import NavBar from '@/components/Header/headerSticky';
import Footer from '@/components/Footer/Footer';
import FilterationPage from '@/components/FilterOnTheLeft_Components/FilterationPage/FilterationPage';
import ProductList from '@/components/FilterOnTheLeft_Components/ProductList/List';

export default function FiltrationPage() {
  return (
    <>
    <Header/>
    <NavBar/>
    <div className='h-[6000px] bg-[#F6F7F9]'>
    <FilterationPage>
      <div className='h-[6000px] '>
        <h2 className="text-xl font-bold mb-4">Filtered Products</h2>
        <ProductList filters={{ /* provide the necessary filters here */ }} />
        <p>This is the content for the filtration page.</p>
      </div>
    </FilterationPage>
    </div>
    <Footer/>   
    </>
  );
}