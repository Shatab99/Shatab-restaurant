
import MenuCards from "./MenuCards";



const MenuCat = ({ items }) => {


    return (
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {
                    items.map(item => <MenuCards key={item._id} item={item} />)
                }
            </div>
           
        </div>
    );
};

export default MenuCat;