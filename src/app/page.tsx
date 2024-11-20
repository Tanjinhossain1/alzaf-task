import BannerCarousel from "@/components/Banner";
import Navbar from "@/components/Navbar/Navbar";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <Navbar />
      <br />
      <BannerCarousel />
    </Fragment>
  );
}
