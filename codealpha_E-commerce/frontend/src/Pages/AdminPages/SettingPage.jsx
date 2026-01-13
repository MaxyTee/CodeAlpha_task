import React from "react";
import DashboardLayout from "../../Root/DashboardLayout";

const SettingPage = () => {
  return (
    <DashboardLayout>
      <div className="bg-white flex-1 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Settings</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 text-lg">
                  Store Settings
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    defaultValue="ShopEase"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    defaultValue="support@shopease.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Currency
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 text-lg mb-4">
                  Security Settings
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-amber-600"
                      defaultChecked
                    />
                    <span className="ml-3">Two-factor authentication</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-amber-600"
                      defaultChecked
                    />
                    <span className="ml-3">Login notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 text-amber-600" />
                    <span className="ml-3">
                      Require admin approval for new products
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-amber-50 rounded-xl">
                <h4 className="font-medium text-gray-900 mb-2">
                  System Status
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Database</span>
                    <span className="text-green-600 font-medium">Healthy</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">API</span>
                    <span className="text-green-600 font-medium">Online</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Storage</span>
                    <span className="text-amber-600 font-medium">65% used</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingPage;
