import { motion } from "framer-motion";
import { Form } from "react-router-dom";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { FiMessageCircle } from "react-icons/fi";
import { itemVariants } from "@/features/movie-detail/animations";
import { Commentresults } from "@/shared/ui/CommentList";

const validation = Yup.object().shape({
  username: Yup.string()
    .trim()
    .min(2, "Username is too short")
    .required("Username is required"),
  content: Yup.string()
    .trim()
    .min(3, "Comment is too short")
    .required("Comment is required"),
  rating: Yup.number()
    .typeError("Rating must be a number")
    .min(1, "Min rating is 1")
    .max(10, "Max rating is 10")
    .nullable(),
  isSpoiler: Yup.boolean(),
});

const inputClass =
  "w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-all";

const FormField = ({ children, name }) => (
  <div>
    {children}
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-400 text-xs mt-1 font-medium"
    />
  </div>
);

const CommentSection = ({ comments, loading, posting, onAddComment, onReply }) => (
  <motion.div variants={itemVariants} className="mb-8">
    <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-700 overflow-hidden">
      <Formik
        initialValues={{ username: "", content: "", rating: "", isSpoiler: false }}
        validationSchema={validation}
        onSubmit={(values, { resetForm }) => {
          onAddComment(values);
          resetForm();
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col lg:flex-row">
            <div className="lg:w-2/5 p-6 border-b lg:border-b-0 lg:border-r border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FiMessageCircle className="text-red-400" />
                Leave a Comment
              </h3>

              <div className="space-y-4">
                <FormField name="username">
                  <Field type="text" name="username" placeholder="Your name" className={inputClass} />
                </FormField>

                <FormField name="rating">
                  <Field
                    type="number"
                    name="rating"
                    min="1"
                    max="10"
                    placeholder="Your rating (1-10, optional)"
                    className={inputClass}
                  />
                </FormField>

                <FormField name="content">
                  <Field
                    as="textarea"
                    name="content"
                    rows="4"
                    placeholder="Share your thoughts about this film..."
                    className={`${inputClass} resize-none`}
                  />
                </FormField>

                <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer select-none">
                  <Field type="checkbox" name="isSpoiler" className="w-4 h-4 accent-red-500" />
                  Contains spoilers
                </label>

                <motion.button
                  whileHover={{ scale: posting ? 1 : 1.02 }}
                  whileTap={{ scale: posting ? 1 : 0.98 }}
                  type="submit"
                  disabled={posting}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2.5 rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {posting ? "Posting..." : "Post Comment"}
                </motion.button>
              </div>
            </div>

            <div className="lg:w-3/5 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FiMessageCircle className="text-red-400" />
                Comments ({comments.length})
              </h3>
              <div className="max-h-96 overflow-y-auto custom-scrollbar">
                {loading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-500 border-t-transparent"></div>
                  </div>
                ) : (
                  <Commentresults comments={comments} onReply={onReply} />
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  </motion.div>
);

export { CommentSection };
