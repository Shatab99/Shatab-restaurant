

const Cover = ({img, heading, subHeading}) => {
    return (
        <div className="hero min-h-screen bg-fixed mb-8" style={{ backgroundImage: `url(${img})` }}>
            <div className="hero-overlay w-3/4 h-1/2 bg-opacity-40"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md font-cinzel">
                    <h1 className="mb-5 text-2xl lg:text-6xl font-semibold  ">{heading}</h1>
                    <p className="mb-5 text-xs lg:text-lg">{subHeading}</p>
                </div>
            </div>
        </div>
    );
};

export default Cover;