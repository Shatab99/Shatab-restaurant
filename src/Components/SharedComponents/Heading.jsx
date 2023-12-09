

const Heading = ({subheading , heading}) => { 

    
    return (
        <div className="max-w-sm mx-auto text-center my-8">
            <p className="text-[#D99904] mb-4">{subheading}</p>
            <p className="text-[#151515] border-t-2 border-b-2 border-[#E8E8E8] text-4xl p-4 ">{heading}</p>

        </div>
    );
};

export default Heading;