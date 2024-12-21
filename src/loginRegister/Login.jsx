import { useContext } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { AuthContext } from "../AuthProvider/AuthProvider"

const Login = () => {
  const {login} = useContext(AuthContext)
  const {register, handleSubmit,   formState: { errors },} = useForm()
  const onSubmit = data =>{
    const email = data.email
    const password = data.password
    login(email,password)
  }
  return (
    <div id="login-popup" tabindex="-1"
    className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
    <div className="relative p-4 w-full max-w-md h-full md:h-auto">

        <div className="relative bg-white rounded-lg shadow">
        <Link to="/">
         <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="#c6c7c7"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
           
          </button></Link>


            <div className="p-5">
                <h3 className="text-2xl mb-0.5 font-medium"></h3>
                <p className="mb-4 text-sm font-normal text-gray-800"></p>

                <div className="text-center">
                    <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                        Login to your account
                    </p>
                    <p className="mt-2 text-sm leading-4 text-slate-600">
                        You must be logged in to perform this action.
                    </p>
                </div>

             
            


                <form onSubmit={handleSubmit(onSubmit)} className="w-full p-4 space-y-2">
  <label type="email" className="sr-only">Email address</label>
  <input
    {...register("email", {
      required: "Email is required",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid email address",
      },
    })}
    name="email"
    type="email"
    className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
    placeholder="Email Address"
  />
  <label type="password" className="sr-only">Password</label>
  <input
    {...register("password", {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    })}
    name="password"
    type="password"
    className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
    placeholder="Password"
  />
  <button
    type="submit"
    className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
  >
    Login
  </button>
</form>


                <div className="mt-6 text-center text-sm text-slate-600">
                   I don't have an account?
                    <Link to='/register' className="font-medium text-[#4285f4]">Sign up</Link>
                </div>
            </div>
        </div>
    </div>
</div>

  )
}

export default Login
