import About from "@/components/About";
import CategoryComponent from "@/components/CategoryComponent";
import TrialListing from "@/components/TrialListing";

import VerifiedListings from "@/components/VerifiedListing";
import VideoComponent from "@/components/VideoComponent";
import WavyBackground from "@/components/WavyBackground";



export default async function Home() {
  
  
  return (
    <div>
      {/* <VideoComponent/> */}
      <WavyBackground/>
      <CategoryComponent/>
     
      <TrialListing/>
      <VerifiedListings/>
      <About/>

    </div>
  );
}
