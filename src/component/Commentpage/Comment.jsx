import { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import { getAllCourses, addCourse } from "../core/api/courseApi";
import { Commentresults } from "./Commentresults";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  const fetchComments = async () => {
    try {
      const response = await getAllCourses({ skip: 10 });
      setComments(response);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const Addcomment = async (values, { resetForm }) => {
    const newComment = { ...values, timestamp: new Date().toLocaleString() };

    console.log("Submitting comment:", newComment);

    try {
      const response = await addCourse(newComment);

      console.log("Response from API:", response.data);

      if (response.id || response.status === 201) {
        console.log("Comment posted successfully!");
        setComments([...comments, response]);
        resetForm();
      } else {
        console.error("Failed to post comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const validation = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    tag: Yup.string().required("Tag is required"),
    comment: Yup.string().required("Comment is required"),
  });

  return (
    <Formik
      initialValues={{ username: "", tag: "", comment: "" }}
      validationSchema={validation}
      onSubmit={Addcomment}
    >
      {({ handleSubmit }) => (
        <Form className="w-full max-w-4xl mx-auto px-4 py-6" onSubmit={handleSubmit}>
          {loading ? (
            <div className="loader-container">
              <div className="loader">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl border border-gray-700 bg-gray-800/40 backdrop-blur-md">
              <Field
                type="text"
                name="username"
                placeholder="username:"
                className="bg-gray-300 h-12 sm:h-15 pl-5 rounded-2xl w-full"
              />
              <ErrorMessage name="username" component="div" className="error" />

              <Field
                type="text"
                name="tag"
                placeholder="your tag(#0111):"
                className="bg-gray-300 h-12 sm:h-15 pl-5 rounded-2xl w-full"
              />
              <ErrorMessage name="tag" component="div" className="error" />

              <Field
                type="text"
                name="comment"
                placeholder="type your things:"
                className="bg-gray-300 h-12 sm:h-15 pl-5 rounded-2xl w-full"
              />
              <ErrorMessage name="comment" component="div" className="error" />

              <input
                className={`bg-blue-300 w-full sm:w-32 p-3 sm:p-5 rounded-2xl m-auto text-center cursor-pointer ${
                  clicked ? "animate-move" : ""
                }`}
                type="submit"
                onClick={handleClick}
              />
            </div>
          )}
          <div className="mt-6">
            <Commentresults comments={comments} setComments={setComments} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { Comment };
