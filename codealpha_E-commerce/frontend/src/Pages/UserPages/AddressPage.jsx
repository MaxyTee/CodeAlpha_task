import React, { useState, useEffect } from "react";
import {
  MapPin,
  Edit2,
  Trash2,
  Plus,
  Check,
  Home,
  Briefcase,
  User,
  Loader2
} from "lucide-react";
import Header from "../../Component/Header";
import { useAuthStore } from "../../Store/authStore";

const AddressPage = () => {
  const { userAddress, user, updateUserAddress } = useAuthStore();
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    address: "",
    addressType: "home",
    country: "United States",
    default: false,
  });

  // Initialize addresses from user data
  const [addresses, setAddresses] = useState(user?.addresses || []);

  useEffect(() => {
    if (user?.addresses) {
      setAddresses(user.addresses);
    }
  }, [user]);

  const handleAddAddress = async () => {
    if (!newAddress.address.trim()) {
      alert("Please enter an address");
      return;
    }

    setIsAddingAddress(true);
    try {
      const payload = { ...newAddress };
      await userAddress(payload);
      
      // Update local state with the new address
      const updatedAddresses = user?.addresses || [];
      setAddresses(updatedAddresses);
      
      // Reset form
      setNewAddress({
        address: "",
        addressType: "home",
        country: "United States",
        default: false,
      });
      setShowAddForm(false);
      setEditingAddress(null);
    } catch (error) {
      console.error("Error adding address:", error);
      alert("Failed to add address. Please try again.");
    } finally {
      setIsAddingAddress(false);
    }
  };

  const handleEditAddress = (address) => {
    setNewAddress({
      address: address.address || "",
      addressType: address.addressType || "home",
      country: address.country || "United States",
      default: address.default || false,
    });
    setEditingAddress(address);
    setShowAddForm(true);
  };

  const handleDeleteAddress = async (index) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setIsLoading(true);
      try {
        const updatedAddresses = [...addresses];
        updatedAddresses.splice(index, 1);
        
        // Update the addresses (removing the deleted one)
        await updateUserAddress({ addresses: updatedAddresses });
        
        // Update local state
        setAddresses(updatedAddresses);
      } catch (error) {
        console.error("Error deleting address:", error);
        alert("Failed to delete address. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSetDefault = async (index) => {
    setIsLoading(true);
    try {
      // Update all addresses: set the selected one as default, others as not default
      const updatedAddresses = addresses.map((addr, idx) => ({
        ...addr,
        default: idx === index
      }));
      
      await updateUserAddress({ addresses: updatedAddresses });
      setAddresses(updatedAddresses);
    } catch (error) {
      console.error("Error setting default address:", error);
      alert("Failed to set default address. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const addressTypeIcons = {
    home: Home,
    work: Briefcase,
    other: User,
  };

  // Get address type display name
  const getAddressTypeDisplay = (type) => {
    const typeMap = {
      home: "Home",
      work: "Work",
      other: "Other"
    };
    return typeMap[type] || type;
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
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="animate-spin text-amber-600" size={32} />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((address, index) => {
                  const TypeIcon = addressTypeIcons[address.addressType] || Home;
                  return (
                    <div
                      key={index}
                      className={`bg-white rounded-lg border-2 p-6 shadow-sm ${
                        address.default ? "border-amber-500" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-amber-50 rounded-lg">
                            <TypeIcon className="text-amber-600" size={20} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 capitalize">
                              {getAddressTypeDisplay(address.addressType)} Address
                            </h3>
                            {address.default && (
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
                            onClick={() => handleDeleteAddress(index)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 mb-6">
                        <p className="text-gray-600">{address.address}</p>
                        <p className="text-gray-600">{address.country}</p>
                        {address.city && (
                          <p className="text-gray-600">City: {address.city}</p>
                        )}
                        {address.zipCode && (
                          <p className="text-gray-600">ZIP: {address.zipCode}</p>
                        )}
                        {address.phone && (
                          <p className="text-gray-600">Phone: {address.phone}</p>
                        )}
                      </div>

                      <div className="flex gap-3">
                        {!address.default && (
                          <button
                            onClick={() => handleSetDefault(index)}
                            className="flex-1 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                          >
                            Set as Default
                          </button>
                        )}
                        {address.default && (
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
            )}
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
                      Address *
                    </label>
                    <textarea
                      value={newAddress.address}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, address: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="123 Main Street, Apt 4B"
                      rows="3"
                      required
                    />
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
                      <option value="Nigeria">Nigeria</option>
                    </select>
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
                              setNewAddress({ ...newAddress, addressType: type })
                            }
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 ${
                              newAddress.addressType === type
                                ? "border-amber-500 bg-amber-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <TypeIcon size={20} className="mb-2" />
                            <span className="text-sm font-medium capitalize">
                              {getAddressTypeDisplay(type)}
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
                      checked={newAddress.default}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          default: e.target.checked,
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
                      disabled={isAddingAddress || !newAddress.address.trim()}
                      className={`flex-1 py-3 font-medium rounded-lg flex items-center justify-center gap-2 ${
                        isAddingAddress || !newAddress.address.trim()
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-amber-600 text-white hover:bg-amber-700"
                      }`}
                    >
                      {isAddingAddress ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Processing...
                        </>
                      ) : editingAddress ? (
                        "Update Address"
                      ) : (
                        "Add Address"
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingAddress(null);
                        setNewAddress({
                          address: "",
                          addressType: "home",
                          country: "United States",
                          default: false,
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
                      Address Structure
                    </h4>
                    <p className="text-sm text-gray-600">
                      Include street, apartment/unit number, city, and ZIP code
                      for best delivery results.
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