'use client';

import SellingCategory from "@/components/sellingCategory/SellingCategory";
import HeaderBanner from "../components/headerBanner/page";
import ServiceMoto from "../components/serviceMoto/page";
import Subscription from "../components/subscription/page";
import NewArrival from "@/components/newArrival/NewArrival";
import FeatureProduct from "@/components/FeatureProducts/FeatureProduct";
import VideoGallery from "@/components/VideoGallery/page";
import ProductShowcase from "@/components/ProductShowcase/page";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "@/components/services/baseUrl";
import ExtraSection1 from "@/components/extraSection1/ExtraSection1";
import ExtraSection2 from "@/components/extraSection2/ExtraSection2";
import ExtraSection3 from "@/components/extraSection3/ExtraSection3";
import BestSell from "@/components/bestSell/BestSell";

export default function Home() {
  const dispatch = useDispatch();
  const [extraSection, setExtraSection] = useState(null)
  const [isMobile, setIsMobile] = useState(false);
  const [toggles, setToggles] = useState({
    webFeature: false,
    webArrival: false,
    webSellingCategory: false,
    webVideo: false,
    webProductShowCase: false,
    webNewsLetter: false,
    webBestDeal: false,
    mobileFeature: false,
    mobileArrival: false,
    mobileSellingCategory: false,
    mobileVideo: false,
    mobileProductShowCase: false,
    mobileNewsLetter: false,
    mobileBestDeal: false,
  });


  // Fetch toggle states from the backend
  useEffect(() => {
    const fetchToggleStates = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/toggle/toggleStates`);
        const data = response.data;
        if (data && typeof data === 'object') {
          setToggles(data);
        } else {
          console.error('Unexpected response data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching toggle states:', error);
      }
    };

    fetchToggleStates();
  }, []);

  // fetch ExtraSection Data
  useEffect(()=>{
    axios.get(`${baseUrl}/api/extra-section`)
    .then(res=>{
      setExtraSection(res.data)      
    })
  },[])

  // Detect if the user is on mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="overflow-x-hidden min-h-screen">
      <HeaderBanner />
      <div className="hidden md:grid">
        <ServiceMoto />
      </div>

      {!isMobile ? (
        <>
          {toggles.webSellingCategory && <SellingCategory />}    
          {toggles.webArrival && <NewArrival />}                 
          {extraSection?.sectionWeb1 && <ExtraSection1/>}           
          {extraSection?.sectionWeb2 && <ExtraSection2/>}           
          {extraSection?.sectionWeb3 && <ExtraSection3/>}           
          {toggles.webVideo && <VideoGallery />}                
          {toggles.webProductShowCase && <ProductShowcase />}    
          {toggles.webFeature && <FeatureProduct />} 
          {toggles.webBestDeal && <BestSell />}  
          {toggles.webNewsLetter && <Subscription />}  
        </>
      ) : (
        <>
          {toggles.mobileSellingCategory && <SellingCategory />}
          {toggles.mobileArrival && <NewArrival />}
          {extraSection?.sectionMobile1 && <ExtraSection1/>}           
          {extraSection?.sectionMobile2 && <ExtraSection2/>}           
          {extraSection?.sectionMobile3 && <ExtraSection3/>}  
          {toggles.mobileVideo && <VideoGallery />}
          {toggles.mobileProductShowCase && <ProductShowcase />}
          {toggles.mobileFeature && <FeatureProduct />}
          {toggles.mobileBestDeal && <BestSell />}
          {toggles.mobileNewsLetter && <Subscription />}
        </>
      )}
    </main>
  );
}
