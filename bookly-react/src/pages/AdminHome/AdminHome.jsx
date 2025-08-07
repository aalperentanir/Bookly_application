import React, { use, useState } from "react";
import { Plus, Book, Users, Tag, X, Upload } from "lucide-react";

const CreateAuthorModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    biography: "",
    birthDate: "",
    deathDate: "",
    nationality: "",
    profileImageUrl: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Name is required");
      return;
    }

    console.log("Author created", formData);

    // Formu temizler ve modal'i kapatir
    setFormData({
      name: "",
      biography: "",
      birthDate: "",
      deathDate: "",
      nationality: "",
      profileImageUrl: "",
    });
    onClose();
    alert("Author added succesfully");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex  justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Create New Author</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 bg-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Birth Date
            </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Death Date
            </label>
            <input
              type="date"
              name="deathDate"
              value={formData.deathDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nationality
            </label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Biograpy
            </label>
            <textarea
              type="text"
              name="biograpy"
              value={formData.biography}
              rows="4"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Profile Image
            </label>
            <input
              type="url"
              name="profileImageUrl"
              value={formData.profileImageUrl}
              onChange={handleChange}
              placeholder="https://example.com/cover.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Create Author
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CreateCategoryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    bookCount: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Category name required");
      return;
    }

    console.log("Category created:", formData);

    setFormData({
      name: "",
      description: "",
    });
    onClose();
    alert("Category created successfully");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            Create New Category
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 bg-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Fiction, Science, History"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Book Count
            </label>
            <input
              type="number"
              name="bookCount"
              value={formData.bookCount}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none bg-white"
              placeholder="Category description..."
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-colors font-semibold"
            >
              Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CreateBookModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    isbn: "",
    summary: "",
    pageCount: "",
    publicationDate: "",
    publisherName: "",
    authors: "",
    categorys: "",
    coverImageUrl: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.isbn.trim()) {
      alert("Kitap adı ve ISBN zorunludur");
      return;
    }

    console.log("Book created:", {
      ...formData,
      pageCount: parseInt(formData.pageCount) || 0,
      authorIds: formData.authors
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id),
      categoryIds: formData.categorys
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id),
    });

    setFormData({
      title: "",
      isbn: "",
      summary: "",
      pageCount: "",
      publicationDate: "",
      publisherName: "",
      authors: "",
      categorys: "",
      coverImageUrl: "",
    });
    onClose();
    alert("Kitap başarıyla oluşturuldu!");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Create New Book</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 bg-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Book Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ISBN <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="978-0-123456-78-9"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Page Count
              </label>
              <input
                type="number"
                name="pageCount"
                value={formData.pageCount}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Publication Date
              </label>
              <input
                type="date"
                name="publicationDate"
                value={formData.publicationDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Publisher Name
            </label>
            <input
              type="text"
              name="publisherName"
              value={formData.publisherName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Authors
            </label>
            <input
              type="text"
              name="authors"
              value={formData.authors}
              onChange={handleChange}
              placeholder="1,2,3 (comma separated)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter author IDs separated by commas
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Categorys
            </label>
            <input
              type="text"
              name="categorys"
              value={formData.categorys}
              onChange={handleChange}
              placeholder="1,2,3 (comma separated)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter category IDs separated by commas
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cover Image URL
            </label>
            <input
              type="url"
              name="coverImageUrl"
              value={formData.coverImageUrl}
              onChange={handleChange}
              placeholder="https://example.com/cover.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Summary
            </label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none bg-white"
              placeholder="Book summary..."
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              Create Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminHome = () => {
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const isAdmin = () => {
    const userRole = localStorage.getItem("role");
    return userRole === "admin";
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Acces Denied</h1>
          <p className="text-gray-600 mb-4">
            You need admin privileges to access this page.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go To Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Manage your application from here
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Create Author
              </h3>
              <p className="text-gray-600 mb-6">
                Add new authors to your Bookly application
              </p>
              <button
                onClick={() => setIsAuthorModalOpen(true)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Author
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tag className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Create Category
              </h3>
              <p className="text-gray-600 mb-6">
                Organize books with new categories
              </p>
              <button
                onClick={() => setIsCategoryModalOpen(true)}
                className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors font-semibold flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Category
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Create Book
              </h3>
              <p className="text-gray-600 mb-6">
                Add new books to your collection
              </p>
              <button
                onClick={() => setIsBookModalOpen(true)}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Book
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Quick Statistics
          </h2>

          <div className="grdi grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">150</div>
              <div className="text-gray-600">Total Books</div>
            </div>

            <div className="p-4">
              <div className="text-3xl font-bold text-yellow-500 mb-2">45</div>
              <div className="text-gray-600">Total Authors</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
              <div className="text-gray-600">Categories</div>
            </div>
          </div>
        </div>
      </div>

      <CreateAuthorModal
      isOpen={isAuthorModalOpen}
      onClose={() => setIsAuthorModalOpen(false)}
      />

      <CreateCategoryModal
      isOpen={isCategoryModalOpen}
      onClose={() => setIsCategoryModalOpen(false)} 
      />

      <CreateBookModal
      isOpen={isBookModalOpen}
      onClose={() => setIsBookModalOpen(false)}
      />
    </div>
  );
};

export default AdminHome;
