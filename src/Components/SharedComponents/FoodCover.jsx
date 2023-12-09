

const FoodCover = ({img , heading , subHeading}) => {
    return (
        <div className="hero my-8 bg-fixed " style={{ backgroundImage: `url(${img})` }}>
            <div className="hero-overlay w-3/4  bg-opacity-30"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md font-cinzel">
                    <h1 className="mb-5 text-2xl lg:text-7xl font-semibold  ">{heading}</h1>
                    <p className="mb-5 text-xs lg:text-sm">{subHeading}</p>
                </div>
            </div>
        </div>
    );
};

export default FoodCover;