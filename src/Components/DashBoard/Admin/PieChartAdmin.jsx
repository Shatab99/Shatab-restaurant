import { PieChart, Pie, Cell } from 'recharts';
import useMenu from '../../Hooks/useMenu';


const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const PieChartAdmin = () => {
    const [menu] = useMenu()
    // console.log(menu)
    const dessert = menu.filter(item=> item.category === 'dessert')
    const drinks = menu.filter(item=> item.category === 'drinks')
    const popular = menu.filter(item=> item.category === 'popular')
    const pizza = menu.filter(item=> item.category === 'pizza')
    const salad = menu.filter(item=> item.category === 'salad')
    const soup = menu.filter(item=> item.category === 'soup')

    const data = [
        { name: 'Group A', value: dessert.length },
        { name: 'Group B', value: pizza.length },
        { name: 'Group C', value: salad.length },
        { name: 'Group D', value: soup.length },
        { name: 'Group E', value: drinks.length },
        { name: 'Group E', value: popular.length },
    ];
    
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#D62728','#C54EF6'];




    return (

        <div className='my-12'>
            <h1 className='text-4xl  font-semibold'>Pie Chart </h1>
            <div className='mt-8 mb-12'>
                <PieChart width={350} height={350} >
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={160}
                        fill="#8884d8"
                        dataKey="value"

                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </div>
        </div>

    );
};

export default PieChartAdmin;









