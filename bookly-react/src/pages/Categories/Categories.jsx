import { getAllCategories } from "@/State/Category/Action";
import { BookOpen, Search } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Categories = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { categories, loading, error } = useSelector((state) => state.category);
  const categoriesPerPage = 12;

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return categories;
    const lowerSearch = searchTerm.toLowerCase();
    return categories.filter((c) => c.name.toLowerCase().includes(lowerSearch));
  }, [categories, searchTerm]);

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);
  const currentCategories = filteredCategories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Categories</h1>

        <div className="relative w-full max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Category search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
          />
        </div>

        {loading ? (
          <div className="text-center text-gray-500 py-12 text-lg">Loading categories...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-12 text-lg">Error: {error}</div>
        ) : currentCategories.length === 0 ? (
          <div className="text-center text-gray-500 py-12 text-lg">No categories found.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/categories/${category.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 h-full">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-400 transition-colors mb-3">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow">
                      {category.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex justify-center items-center mt-8 gap-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Categories;
