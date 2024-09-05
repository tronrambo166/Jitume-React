import  { useState,useEffect } from 'react';
import axiosClient from "../../axiosClient";


function ServiceMilestone() {
  const [milestones, setMilestones] = useState([]);
  const [business, setBusiness] = useState([]);
  const [businessName, setBusinessName] = useState([]);



  useEffect(() => {
    const getMilestones = (id) => {
      id = 'all'
        axiosClient.get('/business/bBQhdsfE_WWe4Q-_f7ieh7Hdhf4F_-'+id)
          .then(({ data }) => {
            setBusiness(data.business)
            //console.log(data)
          })
          .catch(err => {
            console.log(err);
          });
    };
    getMilestones();
  }, []);
console.log()
  // const [milestones, setMilestones] = useState([
  //   { id: 1, name: "Milestone 1", service: "Web Development", customer: "John Doe", amount: 30000, status: "Done" },
  //   { id: 2, name: "Milestone 2", service: "App Design", customer: "Jane Smith", amount: 15000, status: "In Progress" },
  //   // Add more sample data as needed
  // ]);

  const [selectedService, setSelectedService] = useState('All');
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('All');
  const [S_id, setS_id] = useState('');

  const handleStatusChange = (e, id) => {
    const updatedMilestones = milestones.map((milestone) =>
      milestone.id === id ? { ...milestone, status: e.target.value } : milestone
    );
    setMilestones(updatedMilestones);
  };

  const handleDelete = (id) => {
    setMilestones(milestones.filter((milestone) => milestone.id !== id));
  };

  const handleFindCustomer = (id) => {
    // setMilestones(milestones.filter((milestone) => milestone.id !== id));
  };
  const handleSet = (id) => {
    // Implement the logic for the "Set" button action here
    console.log(`Set action for milestone ${id}`);
  };

const getBookers = (e) => {
  const id = e.target.value;
  setS_id(id);

  axiosClient.get(`/business/getBookers/${id}`)
    .then(({ data }) => {
      console.log(data);
      setCustomers(data.data || []);
    })
    .catch(err => {
      console.log(err);
    });
};

const handleCustomerChange = (e) => {
  const customer = e.target.value;
  setSelectedCustomer(customer);

  if (S_id) {
    axiosClient.get(`/business/findMilestones/${S_id}/${customer}`)
      .then(({ data }) => {
        console.log(data);
        setMilestones(data.milestones || []);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

// Filter milestones based on selected service and customer
const filteredMilestones = milestones.filter(milestone =>
  (selectedService === 'All' || milestone.service === selectedService) &&
  (selectedCustomer === 'All' || milestone.customer === selectedCustomer)
);
  return (
    <div className="container mx-auto p-6">
      <h3 className="text-left text-2xl font-semibold mb-6">Service Milestones</h3>
      
      {/* Dropdowns for selecting service and customer */}
      <div className="mb-4 flex gap-2">
        <select
          value={S_id}
          onChange={getBookers}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
         
    {business.map((business) => (
      <option key={business.id} value={business.id}>
        {business.name}
      </option>
    ))}
        </select>

        <select
          value={selectedCustomer}
          onChange={handleCustomerChange}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">Select Customer</option>
          {customers.map((customer) => (
      <option key={customer.id} value={customer.id}>
        {customer.name}
      </option>
    ))}
          {/* Add more options as needed */}
        </select>
        <button           onClick={handleFindCustomer}
 type='submit' className='btn-primary py-2 text-white rounded-md px-6'>Find</button>
      </div>
      
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 border-b">
            <tr className='text-gray-500'>
              <th className="text-left py-3 px-4 uppercase font-semibold text-[12px]">Milestone Name</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-[12px]">Service</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-[12px]">Customer</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-[12px]">Amount</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-[12px]">Status</th>
              <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {milestones.map((milestone) => (
              <tr key={milestone.id} className="text-gray-600 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 border-b">{milestone.title}</td>
                <td className="py-3 px-4 border-b">{milestone.service}</td>
                <td className="py-3 px-4 border-b">{milestone.customer}</td>
                <td className="py-3 px-4 border-b">${milestone.amount}</td>
                <td className="py-3 px-4 border-b">
                  <select
                    value={milestone.status}
                    onChange={(e) => handleStatusChange(e, milestone.id)}
                    className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </td>
                <td className="py-3 px-4 border-b text-center flex gap-2 items-center">
                  <button
                    onClick={() => handleSet(milestone.id)}
                    className="border border-black text-black px-4 py-2 rounded-lg hover:bg-green-500 transition-colors"
                  >
                    Set
                  </button>
                  <button
                    onClick={() => handleDelete(milestone.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServiceMilestone;
