import React from "react";
import MovieSearch from "./MovieSearch";

const Home = () => {
  return (
    <main className="relative min-h-screen bg-[#030014]">
      <div className="pattern absolute z-0 h-screen w-full bg-cover bg-center bg-[url('/hero-bg.png')]" />
      <div className="wrapper relative z-10 mx-auto flex max-w-7xl flex-col px-5 py-12 xs:p-10">
        <header className="mt-5 sm:mt-10">
          <img src="/hero.png" alt="Hero Background" className="mx-auto drop-shadow-md w-full max-w-lg h-auto object-contain" />
          <h1 className="mx-auto max-w-4xl text-center text-5xl font-bold leading-tight tracking-[-1%] text-white sm:text-[64px] sm:leading-[76px] mt-8">
            Find <span className="bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] bg-clip-text text-transparent">Movies</span> You'll Enjoy Without the Hassle
          </h1>
        </header>
        <MovieSearch />
      </div>
    </main>
  );
};

export default Home;
