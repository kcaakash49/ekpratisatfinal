import CategoryComponent from "@/components/CategoryComponent";
import RecentListing from "@/components/RecentListing";
import TrialListing from "@/components/TrialListing";
import VideoComponent from "@/components/VideoComponent";



export default async function Home() {
  
  
  return (
    <div>
      <VideoComponent/>
      <CategoryComponent/>
      {/* <RecentListing/> */}
      <TrialListing/>

    </div>
  );
}
