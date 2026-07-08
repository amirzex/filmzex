import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaCalendarAlt,
  FaUsers,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { registerUser as registerUserAPI } from "../core/api/authApi";
import { saveToken, getToken, hasToken } from "../core/token/token";
import batman from "../../assets/register/batman.jpg";

function Register() {
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState("");
  const [newUser, setNewUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    birthDate: "",
  };

  const generateToken = () =>
    Math.random().toString(36).substring(2) + Date.now().toString(36);

  const createRegisterPayload = (values) => ({
    username: values.username.trim(),
    email: values.email.toLowerCase(),
    password: values.password,
    phone: values.phone || null,
    gender: values.gender || "unspecified",
    birthDate: values.birthDate || null,
    token: generateToken(),
  });

  // Save user data to localStorage
  const saveUserData = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");
    // You can also save individual fields if needed
    localStorage.setItem("username", userData.username);
    localStorage.setItem("userEmail", userData.email);
  };

  const registerUserHandler = async (payload) => {
    setLoading(true);
    try {
      const response = await registerUserAPI(payload);

      // Save token
      saveToken(response.token);

      // Save user data to localStorage
      saveUserData({
        id: response.id,
        username: response.username,
        email: response.email,
        phone: response.phone,
        gender: response.gender,
        birthDate: response.birthDate,
        token: response.token,
        registeredAt: new Date().toISOString(),
      });

      if (hasToken()) {
        console.log("User is authenticated");
      }

      setStatusMessage("✅ Registration successful!");
      setNewUser(response);

      // Redirect to home after successful registration
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setStatusMessage("❌ Registration failed. Please try again.");
      setTimeout(() => {
        setStatusMessage("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent p-4">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col h-150 md:flex-row rounded-2xl overflow-hidden bg-gray-800/40 backdrop-blur-md border border-gray-700 shadow-2xl">
          {/* Left side - Image (hidden on mobile) */}
          <div className="hidden md:block md:w-2/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 via-purple-600/30 to-blue-600/30 z-10" />
            <img
              src={batman}
              alt="Signup"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <div className="text-white">
                <h2 className="text-xl font-bold mb-1">Welcome Aboard!</h2>
                <p className="text-white/70 text-sm">
                  Start exploring amazing content
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-white/60">
                    1000+ active members
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-3/5 p-5 md:p-6">
            <Formik
              initialValues={initialValues}
              validate={(values) => {
                const errors = {};
                if (!values.username) errors.username = "Required";
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                if (!values.password) {
                  errors.password = "Required";
                } else if (values.password.length < 6) {
                  errors.password = "Min 6 characters";
                }
                if (!values.phone) {
                  errors.phone = "Required";
                } else if (values.phone.length < 11) {
                  errors.phone = "Min 11 characters";
                }
                if (!values.gender) errors.gender = "Required";
                if (!values.birthDate) errors.birthDate = "Required";
                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                const payload = createRegisterPayload(values);
                registerUser(payload);
                setSubmitting(false);
                resetForm();
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Username */}
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <FaUser className="w-4 h-4" />
                      </div>
                      <Field
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-gray-800/60 border border-gray-700 text-white placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none text-sm"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-red-400 text-xs mt-0.5"
                      />
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <FaEnvelope className="w-4 h-4" />
                      </div>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-gray-800/60 border border-gray-700 text-white placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none text-sm"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-400 text-xs mt-0.5"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <FaLock className="w-4 h-4" />
                    </div>
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password (min 6 characters)"
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-gray-800/60 border border-gray-700 text-white placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="w-4 h-4" />
                      ) : (
                        <FaEye className="w-4 h-4" />
                      )}
                    </button>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-400 text-xs mt-0.5"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Phone */}
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <FaPhone className="w-4 h-4" />
                      </div>
                      <Field
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-gray-800/60 border border-gray-700 text-white placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none text-sm"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-400 text-xs mt-0.5"
                      />
                    </div>

                    {/* Gender */}
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <FaUsers className="w-4 h-4" />
                      </div>
                      <Field
                        as="select"
                        name="gender"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-gray-800/60 border border-gray-700 text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none appearance-none cursor-pointer text-sm"
                      >
                        <option value="" className="text-gray-900">
                          Select gender
                        </option>
                        <option value="male" className="text-gray-900">
                          Male
                        </option>
                        <option value="female" className="text-gray-900">
                          Female
                        </option>
                        <option value="unspecified" className="text-gray-900">
                          Unspecified
                        </option>
                      </Field>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="text-red-400 text-xs mt-0.5"
                      />
                    </div>
                  </div>

                  {/* Birth Date */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <FaCalendarAlt className="w-4 h-4" />
                    </div>
                    <Field
                      type="date"
                      name="birthDate"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-gray-800/60 border border-gray-700 text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none text-sm"
                    />
                    <ErrorMessage
                      name="birthDate"
                      component="div"
                      className="text-red-400 text-xs mt-0.5"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting || loading}
                    className="w-full relative overflow-hidden group py-3 rounded-xl bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-white font-medium transition-all hover:shadow-lg hover:shadow-red-500/25 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Create Account
                          <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </motion.button>

                  <AnimatePresence>
                    {statusMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`text-center text-xs font-medium ${
                          statusMessage.includes("successful")
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {statusMessage}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {newUser && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="mt-2 p-3 rounded-xl bg-gray-800/60 border border-gray-700 text-white/90"
                      >
                        <h3 className="font-semibold text-sm flex items-center gap-2 mb-1.5">
                          <FaCheckCircle className="w-4 h-4 text-green-400" />
                          Welcome, {newUser.username}!
                        </h3>
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          <p>
                            <span className="text-gray-400">Email:</span>{" "}
                            {newUser.email}
                          </p>
                          <p>
                            <span className="text-gray-400">Phone:</span>{" "}
                            {newUser.phone}
                          </p>
                          <p>
                            <span className="text-gray-400">Gender:</span>{" "}
                            {newUser.gender}
                          </p>
                          <p>
                            <span className="text-gray-400">Birth:</span>{" "}
                            {newUser.birthDate}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <p className="text-center text-gray-500 text-xs mt-2">
                    By signing up, you agree to our Terms of Service
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
