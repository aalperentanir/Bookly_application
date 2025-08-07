import { updateAuthor } from "@/State/Author/Action";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const UpdateAuthorModal = ({ isOpen, onClose, author }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: author.name || "",
    biography: author.biography || "",
    birthDate: author.birthDate || "",
    deathDate: author.deathDate || "",
    nationality: author.nationality || "",
    profileImageUrl: author.profileImageUrl || "",
  });

  useEffect(() => {
    if (author) {
      setFormData({
        name: author.name || "",
        biography: author.biography || "",
        birthDate: author.birthDate || "",
        deathDate: author.deathDate || "",
        nationality: author.nationality || "",
        profileImageUrl: author.profileImageUrl || "",
      });
    }
  }, [author]);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Update author", formData);
    dispatch(updateAuthor(formData))
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Update Author</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 bg-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Nationality
            </label>
            <input
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Birth Date
            </label>
            <input
              name="birthDate"
              value={formData.birthDate}
              type="date"
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Death Date
              </label>
              <input
                name="deathDate"
                type="date"
                value={formData.deathDate}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                B iography
              </label>
              <textarea
                name="biography"
                value={formData.biography}
                rows={3}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded bg-white"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
                Profile Image
            </label>
            <input
              name="profileImageUrl"
              value={formData.profileImageUrl}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-white"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 font-semibold"
            >
              Update Author
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAuthorModal;
