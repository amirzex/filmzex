import { FiDownload } from "react-icons/fi";
import { PanelCard } from "@/features/user-panel/components/PanelShell";

const DataAndStorage = () => {
  return (
    <PanelCard className="p-5 sm:p-6">
      <h2 className="mb-4 border-b border-gray-700/60 pb-3 text-lg font-semibold text-white">
        Data & Storage
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
          <div className="mb-3 flex items-center gap-3">
            <FiDownload className="text-red-400" />
            <span className="text-white">Download Your Data</span>
          </div>
          <p className="mb-3 text-sm text-gray-400">Get a copy of your data</p>
          <button
            type="button"
            className="text-sm text-red-400 transition hover:text-red-300"
          >
            Request Data
          </button>
        </div>

        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-white">Delete Account</span>
          </div>
          <p className="mb-3 text-sm text-gray-400">
            Permanently delete your account
          </p>
          <button
            type="button"
            className="text-sm text-red-400 transition hover:text-red-300"
          >
            Delete Account
          </button>
        </div>
      </div>
    </PanelCard>
  );
};

export default DataAndStorage;
