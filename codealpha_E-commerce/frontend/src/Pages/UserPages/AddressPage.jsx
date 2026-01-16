import React, { useState } from "react";
import {
  MapPin,
  Edit2,
  Trash2,
  Plus,
  Check,
  Home,
  Briefcase,
  User,
} from "lucide-react";
import Header from "../../Component/Header";

const AddressPage = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Alexandra Morgan",
      address: "123 Jewelry Street",
      city: "New York",
      zipCode: "10001",
      country: "United States",
      phone: "+1 (555) 123-4567",
      type: "home",
      isDefault: true,
    },
    {
      id: 2,
      name: "Alexandra Morgan",
      address: "456 Business Avenue",
      city: "Brooklyn",
      zipCode: "11201",
      country: "United States",
      phone: "+1 (555) 987-6543",
      type: "work",
      isDefault: false,
    },
    {
      id: 3,
      name: "Alex Morgan",
      address: "789 Luxury Lane",
      city: "Manhattan",
      zipCode: "10016",
      country: "United States",
      phone: "+1 (555) 456-7890",
      type: "other",
      isDefault: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    city: "",
    zipCode: "",
    country: "United States",
    phone: "",
    type: "home",
    isDefault: false,
  });

  const handleAddAddress = () => {
    if (editingAddress) {
      // Update existing address
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingAddress.id
            ? { ...newAddress, id: editingAddress.id }
            : newAddress.isDefault
            ? { ...addr, isDefault: false }
            : addr
        )
      );
      setEditingAddress(null);
    } else {
      // Add new address
      const newId = Math.max(...addresses.map((a) => a.id)) + 1;
      setAddresses([
        ...addresses.map((addr) =>
          newAddress.isDefault ? { ...addr, isDefault: false } : addr
        ),
        { ...newAddress, id: newId },
      ]);
    }

    setNewAddress({
      name: "",
      address: "",
      city: "",
      zipCode: "",
      country: "United States",
      phone: "",
      type: "home",
      isDefault: false,
    });
    setShowAddForm(false);
  };

  const handleEditAddress = (address) => {
    setNewAddress(address);
    setEditingAddress(address);
    setShowAddForm(true);
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      const addressToDelete = addresses.find((addr) => addr.id === id);
      const wasDefault = addressToDelete?.isDefault;

      const updatedAddresses = addresses.filter((addr) => addr.id !== id);

      // If we deleted the default address and there are other addresses, make the first one default
      if (wasDefault && updatedAddresses.length > 0) {
        updatedAddresses[0].isDefault = true;
      }

      setAddresses(updatedAddresses);
    }
  };

  const handleSetDefault = (id) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const addressTypeIcons = {
    home: Home,
    work: Briefcase,
    other: User,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 pt-24 pb-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Addresses</h1>
          <p className="text-gray-600 mt-2">Manage your shipping addresses</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Address Cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((address) => {
                const TypeIcon = addressTypeIcons[address.type] || Home;
                return (
                  <div
                    key={address.id}
                    className={`bg-white rounded-lg border-2 p-6 shadow-sm ${
                      address.isDefault ? "border-amber-500" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-50 rounded-lg">
                          <TypeIcon className="text-amber-600" size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 capitalize">
                            {address.type} Address
                          </h3>
                          {address.isDefault && (
                            <span className="inline-block px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full mt-1">
                              Default
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditAddress(address)}
                          className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <p className="font-medium text-gray-900">
                        {address.name}
                      </p>
                      <p className="text-gray-600">{address.address}</p>
                      <p className="text-gray-600">
                        {address.city}, {address.zipCode}
                      </p>
                      <p className="text-gray-600">{address.country}</p>
                      <p className="text-gray-600">{address.phone}</p>
                    </div>

                    <div className="flex gap-3">
                      {!address.isDefault && (
                        <button
                          onClick={() => handleSetDefault(address.id)}
                          className="flex-1 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                        >
                          Set as Default
                        </button>
                      )}
                      {address.isDefault && (
                        <button
                          className="flex-1 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg cursor-default flex items-center justify-center gap-2"
                          disabled
                        >
                          <Check size={16} />
                          Default Address
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Add New Address Card */}
              {!showAddForm && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg hover:border-amber-400 transition-colors">
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="w-full h-full min-h-[300px] flex flex-col items-center justify-center p-6 text-gray-500 hover:text-amber-600"
                  >
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <Plus size={24} />
                    </div>
                    <p className="font-medium text-gray-900">Add New Address</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Add a new shipping address
                    </p>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Add/Edit Form Sidebar */}
          {showAddForm && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  {editingAddress ? "Edit Address" : "Add New Address"}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={newAddress.name}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={newAddress.address}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          address: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={newAddress.city}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, city: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={newAddress.zipCode}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            zipCode: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="10001"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <select
                      value={newAddress.country}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          country: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={newAddress.phone}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, phone: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address Type
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["home", "work", "other"].map((type) => {
                        const TypeIcon = addressTypeIcons[type] || Home;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() =>
                              setNewAddress({ ...newAddress, type })
                            }
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 ${
                              newAddress.type === type
                                ? "border-amber-500 bg-amber-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <TypeIcon size={20} className="mb-2" />
                            <span className="text-sm font-medium capitalize">
                              {type}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="default"
                      checked={newAddress.isDefault}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          isDefault: e.target.checked,
                        })
                      }
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <label htmlFor="default" className="text-sm text-gray-700">
                      Set as default shipping address
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleAddAddress}
                      className="flex-1 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700"
                    >
                      {editingAddress ? "Update Address" : "Add Address"}
                    </button>
                    <button
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingAddress(null);
                        setNewAddress({
                          name: "",
                          address: "",
                          city: "",
                          zipCode: "",
                          country: "United States",
                          phone: "",
                          type: "home",
                          isDefault: false,
                        });
                      }}
                      className="px-4 py-3 text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty State for No Form */}
          {!showAddForm && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="p-4 bg-amber-50 rounded-lg mb-6">
                  <MapPin className="text-amber-600 mb-2" size={24} />
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Shipping Tips
                  </h3>
                  <p className="text-sm text-gray-600">
                    Ensure your address is accurate for timely delivery
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Default Address
                    </h4>
                    <p className="text-sm text-gray-600">
                      Your default address will be used for all orders unless
                      you specify otherwise during checkout.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Multiple Addresses
                    </h4>
                    <p className="text-sm text-gray-600">
                      You can add multiple addresses for home, work, or gift
                      shipping.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
