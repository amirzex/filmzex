import { FiDownload } from "react-icons/fi";

const DataAndStorage = () => {
  return (
    <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-6 mt-6">
      <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-700">
        Data & Storage
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-700/30 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <FiDownload className="text-blue-400" />
            <span className="text-white">Download Your Data</span>
          </div>
          <p className="text-sm text-gray-400 mb-3">Get a copy of your data</p>
          <button className="text-blue-400 hover:text-blue-300 transition-all">
            Request Data
          </button>
        </div>

        <div className="p-4 bg-gray-700/30 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            {/* <FiTrash2 className="text-red-400" /> */}
            <span className="text-white">Delete Account</span>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            Permanently delete your account
          </p>
          <button className="text-red-400 hover:text-red-300 transition-all">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataAndStorage;
