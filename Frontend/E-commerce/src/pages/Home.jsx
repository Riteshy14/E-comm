import { TopBar } from '../component/TopBar';
import {Hero} from '../component/Hero'
import { LatestCollection } from '../component/LatestCollection';
import Footer from '../component/Footer';
import { BestSeller } from '../component/BestSeller';
import Policy from '../component/Policy';

export function Home(){
    return <div>
        <TopBar icon={"search_icon.png"}/>
        <Hero/>
        <LatestCollection/>
        <BestSeller/>
        <Policy/>
        <Footer/>
    </div>
}