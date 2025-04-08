import { motion } from "framer-motion";
import { FaUserClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const PendingApproval = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <motion.div
        className="max-w-md text-center bg-white p-6 rounded-xl shadow-lg border border-gray-200"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-4">
          <FaUserClock className="text-blue-500 text-6xl animate-pulse" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-700 mb-2">
          Approval Pending
        </h1>
        <p className="text-gray-600 mb-4">
          Your request to become a seller is under review. Once approved, you’ll
          gain full access to your seller features.
        </p>
        <motion.div
          className="flex justify-center"
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
         
        </motion.div>
      <Link to= '/'>
      <button className="mt-6 px-4 py-2 text-sm text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
         Home
        </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default PendingApproval;
