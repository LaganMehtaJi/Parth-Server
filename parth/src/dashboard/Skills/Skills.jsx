import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkills,addSkill,deleteSkill,updateSkill } from "../../redux/SkillSlice";

export default function Skills() {
  const dispatch = useDispatch();
  const { items: skills, status, error } = useSelector((state) => state.skills);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);


  const skillSchema = Yup.object().shape({
    skill: Yup.string().required("Skill name is required"),
    proficiency: Yup.string().required("Proficiency level is required"),
    registrationNo: Yup.string().required("Registration number is required"),
  });

  const formik = useFormik({
    initialValues: {
      skill: "",
      proficiency: "",
      registrationNo: "",
    },
    validationSchema: skillSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (editingId) {
          await dispatch(updateSkill({ id: editingId, ...values })).unwrap();
        } else {
          await dispatch(addSkill(values)).unwrap();
        }
        resetForm();
        setIsModalOpen(false);
        setEditingId(null);
      } catch (err) {
        console.error("Error submitting form:", err);
      }
    },
  });

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  const handleEdit = (item) => {
    formik.setValues({
      skill: item.skill,
      proficiency: item.proficiency,
      registrationNo: item.registrationNo,
    });
    setEditingId(item._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      await dispatch(deleteSkill(id)).unwrap();
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  };

  const resetForm = () => {
    formik.resetForm();
    setEditingId(null);
  };

  if (status === 'loading' && !skills.length) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center">
          My<span className="text-blue-600"> Skills</span>
        </h1>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md"
          >
            + Add Skill
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {skills.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md p-4 relative border border-gray-100 group transform hover:scale-105 transition-transform duration-300"
            >
              <div className="mt-4">
                <h2 className="text-xl font-semibold">{item.skill}</h2>
                <p className="text-gray-700 mt-2">
                  Proficiency:{" "}
                  <span className="font-medium">{item.proficiency}</span>
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Registration No: {item.registrationNo}
                </p>
              </div>

              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Edit Skill" : "Add Skill"}
            </h2>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium">Skill</label>
                <input
                  type="text"
                  name="skill"
                  value={formik.values.skill}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full border ${
                    formik.touched.skill && formik.errors.skill
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded px-3 py-2`}
                />
                {formik.touched.skill && formik.errors.skill ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.skill}
                  </div>
                ) : null}
              </div>

              <div>
                <label className="block font-medium">Proficiency</label>
                <select
                  name="proficiency"
                  value={formik.values.proficiency}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full border ${
                    formik.touched.proficiency && formik.errors.proficiency
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded px-3 py-2`}
                >
                  <option value="">Select</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
                {formik.touched.proficiency && formik.errors.proficiency ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.proficiency}
                  </div>
                ) : null}
              </div>

              <div>
                <label className="block font-medium">Registration No</label>
                <input
                  type="text"
                  name="registrationNo"
                  value={formik.values.registrationNo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full border ${
                    formik.touched.registrationNo && formik.errors.registrationNo
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded px-3 py-2`}
                />
                {formik.touched.registrationNo && formik.errors.registrationNo ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.registrationNo}
                  </div>
                ) : null}
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setIsModalOpen(false);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  disabled={status === 'loading'}
                >
                  {status === 'loading'
                    ? "Processing..."
                    : editingId
                    ? "Update"
                    : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}