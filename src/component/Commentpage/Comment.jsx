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
        <Form className="border-2 w-[1920px] scale-90 " onSubmit={handleSubmit}>
          {loading ? (
            <div className="loader-container">
              <div className="loader">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <div className="border-2 scale-90 flex flex-col gap-5 p-5">
              <Field
                type="text"
                name="username"
                placeholder="username:"
                className="bg-gray-300 h-15 pl-5 rounded-2xl"
              />
              <ErrorMessage name="username" component="div" className="error" />

              <Field
                type="text"
                name="tag"
                placeholder="your tag(#0111):"
                className="bg-gray-300 h-15 pl-5 rounded-2xl"
              />
              <ErrorMessage name="tag" component="div" className="error" />

              <Field
                type="text"
                name="comment"
                placeholder="type your things:"
                className="bg-gray-300 h-15 pl-5 rounded-2xl"
              />
              <ErrorMessage name="comment" component="div" className="error" />

              <input
                className={`bg-blue-300 w-25 p-5 rounded-2xl m-auto text-center ${
                  clicked ? "animate-move" : ""
                }`}
                type="submit"
                onClick={handleClick}
              />
            </div>
          )}
          <Commentresults comments={comments} setComments={setComments} />
        </Form>
      )}
    </Formik>
  );
};

export { Comment };
