"use client"
import API_URL from "@/config";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import data from "../Doctors/category.json"
import Image from "next/image";
import CategoryData from "./CategoryData";
import { useEffect } from "react";

const Category = () => {
  const [category,setCategory]  =  useState("");
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState([]);
  // const [location, setLocation] = useState("");
  
  const getDoctorNames = async () => {
    const response = await fetch(`${API_URL}/api/search/doctors`);
    const data = await response.json();
    console.log(data);
    data.sort((a, b) => a.name.localeCompare(b.name));
    setDoctors(data);  
  }

  useEffect(() => {
    getDoctorNames();
  }, []);

  const handleDoctorSearch = (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    e.preventDefault();

    const doctorId = e.target.value;
    router.push(`/doctors-profile/${doctorId}`);
  }

  const handleSearch = async (e) => {
    
    if (e.key !== 'Enter') {
      return;
    }
    e.preventDefault();
    console.log(search);
    return;

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(showLocations, error);
    // } else {
    //   toast.warn("Location is not supported by this browser.");
    //   return;
    // }

    async function showLocations(location) {
      await showLocation(location, search, navigate);
    }

    function error(e) {
      toast.warn("User denied the request for Location");
      return;
    }
  }

  return (
    <>
      <div className="min-h-[50vh] flex justify-center items-center flex-col pb-3">
        <div className="flex w-full justify-center mt-[35px] space-x-2 h-[150px] max-[430px]:flex-col max-[430px]:items-center max-[430px]:gap-3 max-[430px]:pb-4">
          <input
            type="text"
            placeholder="Find Your Doctor ..."
            className="max-[430px]:w-[80%] bg-white  h-[55px] w-[653px] rounded-3xl border-solid border-3 drop-shadow-2xl 
            border-2 shadow-xl border-zinc-500 outline-none pl-3"
          />
           <select
            className="inputCommonDoctorClass"
            id="serchNearDoctor"
            placeholder="Search for nearby doctor"
            onKeyDown={handleDoctorSearch}
          >
            <option value="">Select Doctor</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Location "
            className="h-[55px] min-w-[150px] bg-white rounded-3xl border-solid border-3 drop-shadow-2xl border-2 shadow-xl border-zinc-500 outline-none pl-3"
          />
        </div>
        <div className="flex flex-wrap w-[100%] justify-center items-center gap-x-12 gap-y-7 px-9">
          {data && data.category.map((item,key)=>{
             return  <div key={key}>
             <button className="flex min-w-[150px] bg-[#B2D9FF] rounded-3xl hover:bg-blue-500 hover:text-white" onClick={()=> setCategory(item.name)}>
               <div className="h-[60px] w-[60px] flex justify-center items-center bg-[#E5F2FF] rounded-full relative right-3">
                 <Image
                   src={item.image}
                   height={100}
                   width={100}
                   alt="img"
                   className="h-[30px] w-[30px] "
                 />
               </div>
               <span className="pt-[10px] text-[22px] font-medium px-[30px]">
                 {item.name}
               </span>
             </button>
           </div>
          })}
        </div>
      </div>
     {category!==''? <CategoryData category={category} />:''}
    </>
  );
};

export default Category;
