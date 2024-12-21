import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";

const Register = () => {
  const navigate = useNavigation()
  const { createUser } = useContext(AuthContext);
  const { register, handleSubmit,  formState: { errors } } = useForm();



  const onSubmit = async (data) => {
    console.log("Submitted Data:", data);
    const email = data.email;
    const password = data.password;
    createUser(email, password);
    const role = data.role;
    const name = data.name;
    const profilePicture = data.profilePicture[0]; // File upload handling

    // Create FormData to handle both the form fields and the file
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("name", name);
    formData.append("profilePicture", profilePicture);

    try {
      const response = await axios.post("http://localhost:5000/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the backend handles file uploads
        },
      });
      alert(response.data.message);
      navigate('/')
    } catch (error) {
      console.error("Error:", error.response?.data?.message || "Something went wrong");
      alert("Failed to register user. Please try again.");
    }
  };

  return (
    <div className="bg-black/50 fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
      <div className="relative p-4 w-full max-w-md">
        <div className="bg-white rounded-lg shadow">
          <Link to="/">
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5">
              <svg aria-hidden="true" className="w-5 h-5" fill="#c6c7c7" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          </Link>

          <div className="p-5">
            <div className="text-center">
              <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">Register to your account</p>
              <p className="mt-2 text-sm leading-4 text-slate-600">You must be registered to perform this action.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <label htmlFor="email" className="text-sm text-gray-700">Email Address</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email address" }
                })}
                type="email"
                className="block w-full rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              <label htmlFor="name" className="text-sm text-gray-700">Name:</label>
              <input
                {...register("name", {
                  required: "Name is required",
               
             
                })}
                type="text"
                className="block w-full rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your Name"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

              {/* File Upload */}
              <label htmlFor="profilePicture" className="text-sm text-gray-700">Profile Picture</label>
              <input
                {...register("profilePicture", { required: "Profile picture is required" })}
                type="file"
                className="block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
              />
              {errors.profilePicture && <p className="text-red-500 text-sm">{errors.profilePicture.message}</p>}

              {/* Role */}
              <label htmlFor="role" className="text-sm text-gray-700">Role</label>
              <select
                {...register("role", { required: "Role is required" })}
                className="block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
              >
                <option value="">Select your role</option>
                <option value="Seller">Seller</option>
                <option value="Buyer">Buyer</option>
              </select>
              {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}

              {/* Password */}
              <label htmlFor="password" className="text-sm text-gray-700">Password</label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" }
                })}
                type="password"
                className="block w-full rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

              <button
                type="submit"
                className="w-full rounded bg-black py-3 text-sm font-medium text-white focus:ring-2 focus:ring-black"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
