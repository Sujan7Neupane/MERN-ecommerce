import React from "react";
import {
  LandingHero,
  TopSellers,
  Policy,
  RecentCollection,
  NewsLetter,
} from "../components";

const Homepage = () => {
  return (
    <div>
      <LandingHero />
      <RecentCollection />
      <TopSellers />
      <Policy />
      <NewsLetter />
    </div>
  );
};

export default Homepage;
