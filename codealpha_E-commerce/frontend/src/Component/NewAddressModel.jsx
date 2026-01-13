import React, { useState } from "react";
import { X, MapPin, Home, Building } from "lucide-react";

const NewAddressModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    address: "",
    type: "home",
    country: "United States",
    default: false,
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // List of countries
  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "India",
    "Germany",
    "France",
  ];

  // Address types
  const addressTypes = [
    { value: "home", label: "Home", icon: <Home className="w-4 h-4" /> },
    { value: "work", label: "Work", icon: <Building className="w-4 h-4" /> },
    { value: "other", label: "Other", icon: <MapPin className="w-4 h-4" /> },
  ];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle type selection
  const handleTypeSelect = (type) => {
    setFormData((prev) => ({ ...prev, type }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      await onSave(formData);
      // Reset form on success
      setFormData({
        address: "",
        type: "home",
        country: "United States",
        default: false,
      });
      setErrors({});
    } catch (error) {
      console.error("Error saving address:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // If modal is not open, return null
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
          {/* Header - Reduced padding */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Add New Address
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form - Reduced padding and spacing */}
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {/* Address Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Type
              </label>
              <div className="flex gap-2">
                {addressTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => handleTypeSelect(type.value)}
                    className={`flex-1 flex flex-col items-center justify-center p-3 border rounded transition-all ${
                      formData.type === type.value
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`mb-1 ${
                        formData.type === type.value
                          ? "text-amber-600"
                          : "text-gray-400"
                      }`}
                    >
                      {type.icon}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        formData.type === type.value
                          ? "text-amber-700"
                          : "text-gray-700"
                      }`}
                    >
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Address Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your full address"
                rows="3"
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                  errors.address ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.address && (
                <p className="mt-1 text-xs text-red-600">{errors.address}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Include street, apartment/unit number, building name, etc.
              </p>
            </div>

            {/* Country Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-500/50 appearance-none ${
                  errors.country ? "border-red-300" : "border-gray-300"
                }`}
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="mt-1 text-xs text-red-600">{errors.country}</p>
              )}
            </div>

            {/* Set as Default */}
            <div className="flex items-start">
              <div className="flex items-center h-5 mt-0.5">
                <input
                  type="checkbox"
                  name="default"
                  checked={formData.default}
                  onChange={handleChange}
                  className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                />
              </div>
              <div className="ml-2">
                <label className="text-sm font-medium text-gray-700">
                  Set as default address
                </label>
                <p className="text-xs text-gray-500 mt-0.5">
                  Use this address for all future orders
                </p>
              </div>
            </div>

            {/* Actions - Reduced button padding */}
            <div className="flex gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 px-3 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm flex items-center justify-center gap-1"
              >
                {isSaving ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <MapPin className="w-3 h-3" />
                    Save Address
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewAddressModal;
