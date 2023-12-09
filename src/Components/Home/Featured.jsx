import { Link } from 'react-router-dom';
import bgimg from '../../assets/home/featured.jpg'
import Heading from '../SharedComponents/Heading';

const Featured = () => {
    return (
        <div className='my-8 '>
            <div className="hero min-h-screen bg-fixed" style={{ backgroundImage: `url(${bgimg})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content flex-col text-center text-neutral-content">
                    <Heading subheading={'---Check it out---'} heading={'FROM OUR MENU'}  />
                    <div className="max-w-3xl flex flex-col lg:flex-row gap-5">
                        <img src={bgimg} alt="" className='w-1/2 '/>
                        <div className='text-left'>
                            <h1 className="mb-5 text-lg font-bold">March 20,<br /> 2023 WHERE CAN I GET SOME?</h1>
                            <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                            <Link to={'/shop/salad'} className="border-b-4 border-[#FFFFFF] rounded-b-lg p-3 hover:bg-gray-800 rounded-lg">Order Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;