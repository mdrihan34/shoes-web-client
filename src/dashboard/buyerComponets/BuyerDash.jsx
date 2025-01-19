import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";


const BuyerDash = () => {
    const {user} = useContext(AuthContext)
    const [order, setOrders] = useState([])
    useEffect(()=>{
      
      if (!user || !user.email) {
        console.error("User not found or email is missing.");
        // setLoading(false);
        return;
      }
      
  
      const fetchOrder = async () => {
        try {
          const response = await fetch(`http://localhost:5000/orders?email=${user.email}`);
          const data = await response.json();
          if (response.ok) {
            setOrders(data);
          } else {
            console.error("Error fetching products:", data.message);
          }
        } catch (error) {
          console.error("Failed to fetch products:", error);
        } finally {
          // setLoading(false);
        }
      };
      fetchOrder()
  
    }, [user])
    // const paddingOrder = () =>{
    //   console.log(order)
    // }
    const paddings = () => {
      const paddingOrder = order.filter(item => {
        if (item.Status === 'padding') {
         
          return true; // Include this item in the filtered array
        }
        return false; // Exclude this item
      });
      return paddingOrder;
    };
   
    const confam = () => {
      const confamOrder = order.filter(item => {
        if (item.Status === 'confam') {
         
          return true; // Include this item in the filtered array
        }
        return false; // Exclude this item
      });
      return confamOrder;
    };
    const cancelled = () => {
      const canceleOrder = order.filter(item => {
        if (item.Status === 'cancelled') {
         
          return true; // Include this item in the filtered array
        }
        return false; // Exclude this item
      });
      return canceleOrder;
    };
   

 

  return (
    <div className="">
      <div>

      </div>
      <div className="p-6 bg-gray-100 w-full min-h-screen">
      {/* Welcome Section */}
      <div className="bg-white p-4 shadow rounded-lg mb-6">
        <h1 className="text-2xl font-bold">Welcome back 👋</h1>
        <p className="text-gray-600 mt-2">Here’s what’s happening in your account today.</p>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-3xl font-bold text-blue-500">{order.length ? order.length : 0}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Pending Orders</h2>
          <p className="text-3xl font-bold text-orange-500">
          {paddings().length ? paddings().length : 0}
  
          </p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Confam Orders</h2>
          <p className="text-3xl font-bold text-green-500">  {confam().length ? confam().length : 0}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Cancelled Orders</h2>
          <p className="text-3xl font-bold text-red-500"> {cancelled().length ? cancelled().length : 0}</p>
        </div>
      </div>

   
</div>
    </div>
  )
}

export default BuyerDash
