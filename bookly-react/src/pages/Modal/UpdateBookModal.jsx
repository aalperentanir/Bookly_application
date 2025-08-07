import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

const UpdateBookModal = ({ isOpen, onClose, book }) => {
  const [formData, setFormData] = useState({
    title: book.title || "",
    isbn: book.isbn || "",
    summary: book.summary || "",
    pageCount: book.pageCount || "",
    publicationDate: book.publicationDate || "",
    publisherName: book.publisher.name || "",
    coverImageUrl: book.coverImageUrl || "",
  });

    useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        isbn: book.isbn || "",
        summary: book.summary || "",
        pageCount: book.pageCount || "",
        publicationDate: book.publicationDate || "",
        publisherName: book.publisher.name || "",
        coverImageUrl: book.coverImageUrl || "",
      });
    }
  }, [book]);


  const handleChange = (e) =>{
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log("Update book", formData)
    onClose()
  }

  if (!isOpen) return null;


  return (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Update Book</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 bg-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">ISBN</label>
            <input
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Summary</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows="4"
              className="w-full border px-3 py-2 rounded bg-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Page Count</label>
              <input
                name="pageCount"
                type="number"
                value={formData.pageCount}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Publication Date</label>
              <input
                name="publicationDate"
                type="date"
                value={formData.publicationDate?.slice(0, 10)}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded bg-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Publisher</label>
            <input
              name="publisherName"
              value={formData.publisherName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Cover Image URL</label>
            <input
              name="coverImageUrl"
              value={formData.coverImageUrl}
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
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBookModal;
