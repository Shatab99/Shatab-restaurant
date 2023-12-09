import Cover from "../SharedComponents/Cover";
import shopimg from '../../assets/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useMenu from "../Hooks/useMenu";
import ShopCards from "../SharedComponents/ShopCards";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import loadingAnimation from '../LoadingAnimaiton/Animation - Loading.json'
import Lottie from "lottie-react";


const Shop = () => {
    const catagories = ['salad', 'pizza', 'soup', 'dessert', 'drinks', 'popular']
    const { cat } = useParams()
    const initialIndex = catagories.indexOf(cat)
    console.log(cat)
    const [index, setIndex] = useState(initialIndex)

    const [menu, loading] = useMenu()

    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const dessert = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const drinks = menu.filter(item => item.category === 'drinks')
    const popular = menu.filter(item => item.category === 'popular')


   
    return (
        <div >
            <Helmet><title>Our Shop</title></Helmet>
            <Cover img={shopimg} heading={'OUR SHOP'} subHeading={'Would you like to try a dish?'} />
            <Tabs defaultIndex={index} onSelect={(index) => setIndex(index)} className={`max-w-4xl mx-auto my-8 `}>
                <TabList className={'flex justify-center max-w-xs lg:max-w-full text-xs lg:text-lg mx-auto'}>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Desert</Tab>
                    <Tab>Drinks</Tab>
                    <Tab>Popular</Tab>
                </TabList>
                <TabPanel>
                    {
                        loading ? <div className="flex justify-center my-16">
                            <Lottie animationData={loadingAnimation} />
                        </div> : <ShopCards items={salad} />
                    }
                </TabPanel>
                <TabPanel>
                    {
                        loading ? <div className="flex justify-center my-16">
                            <Lottie animationData={loadingAnimation} />
                        </div> : <ShopCards items={pizza} />
                    }
                </TabPanel>
                <TabPanel>
                    {
                        loading ? <div className="flex justify-center my-16">
                            <Lottie animationData={loadingAnimation} />
                        </div> : <ShopCards items={soup} />
                    }
                </TabPanel>
                <TabPanel>
                    {
                        loading ? <div className="flex justify-center my-16">
                            <Lottie animationData={loadingAnimation} />
                        </div> : <ShopCards items={dessert} />
                    }
                </TabPanel>
                <TabPanel>
                    {
                        loading ? <div className="flex justify-center my-16">
                            <Lottie animationData={loadingAnimation} />
                        </div> : <ShopCards items={drinks} />
                    }
                </TabPanel>
                <TabPanel>
                    {
                        loading ? <div className="flex justify-center my-16">
                            <Lottie animationData={loadingAnimation} />
                        </div> : <ShopCards items={popular} />
                    }
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Shop;