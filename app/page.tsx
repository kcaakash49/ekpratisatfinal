import About from "@/components/About";
import CategoryComponent from "@/components/CategoryComponent";
import RecentListing from "@/components/RecentListing";
import TrialListing from "@/components/TrialListing";
import VideoComponent from "@/components/VideoComponent";
import WavyBackground from "@/components/WavyBackground";



export default async function Home() {
  
  
  return (
    <div>
      {/* <VideoComponent/> */}
      <WavyBackground/>
      <CategoryComponent/>
      {/* <RecentListing/> */}
      <TrialListing/>
      <About/>

    </div>
  );
}
