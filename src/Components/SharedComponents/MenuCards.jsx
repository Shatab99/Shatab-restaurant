

const MenuCards = ({item}) => {

    const {image, name,recipe, price} = item

    return (
        <>
            <div className="flex gap-3 p-6 ">
                <img style={{ borderRadius: '0px 200px 200px 200px' }} src={image} alt="" className="w-16 h-16" />
                <div>
                    <h1 className="font-semibold ">{name} ------------------</h1>
                    <p className="text-sm">{recipe}</p>
                </div>
                <p className="text-[#BB8506] font-semibold">${price}</p>
            </div>
        </>
    );
};

export default MenuCards;