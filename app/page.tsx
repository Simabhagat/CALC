"use client";

import { CardComponent } from "@/components/card";
import MainNavbar from "@/components/mainNavbar";
import { SearchInput } from "@/components/search";


import { App } from "./type";

const Home = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 ">
      <MainNavbar />
      <div
        className="relative w-full h-[550px] bg-cover bg-center bg-slate-300"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/28035054/pexels-photo-28035054/free-photo-of-a-view-of-tall-buildings-from-the-ground.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        }}
      >
        <div className="absolute inset-0 bg-slate-300 bg-opacity-50 flex items-center justify-center flex-col">
          <div className="text-center my-5 w-6/12">
            <SearchInput />
          </div>
        </div>
      </div>
      <div>
        <h1>games:</h1>
        <Games/>
      </div>
    </section>
  );
};

export default Home;

const Games = () => {
  
  return (
    <div className="relative overflow-x-auto flex flex-nowrap p-4">
      <CardComponent category="game"/>
    </div>
  );
};

