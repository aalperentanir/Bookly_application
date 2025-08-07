import { getAllAuthors } from "@/State/Author/Action";
import { Search } from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Authors = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { author } = useSelector((store) => store);
  const authors = author.authors;
  const authorsPerPage = 6;

  const filteredAuthors = useMemo(() => {
    if (!searchTerm.trim()) return authors;
    const lowerSearch = searchTerm.toLowerCase();
    return authors.filter(
      (a) =>
        a.name.toLowerCase().includes(lowerSearch) ||
        a.nationality.toLowerCase().includes(lowerSearch)
    );
  }, [authors, searchTerm]);

  const totalPages = Math.ceil(filteredAuthors.length / authorsPerPage);
  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = filteredAuthors.slice(indexOfFirstAuthor, indexOfLastAuthor);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    dispatch(getAllAuthors());
  }, [dispatch]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            Authors ({filteredAuthors.length})
          </h1>

          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Author search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAuthors.length > 0 ? (
            currentAuthors.map((author) => (
              <Link key={author.id} to={`/authors/${author.id}`} className="group">
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                  <div className="text-center">
                    <img
                      src={author.profileImageUrl}
                      alt={author.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover group-hover:scale-105 transition-transform"
                    />
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-400 transition-colors mb-2">
                      {author.name}
                    </h3>
                    <p className="text-gray-600 mb-2">{author.nationality}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(author.birthDate).getFullYear()} -{" "}
                      {author.deathDate
                        ? new Date(author.deathDate).getFullYear()
                        : ""}
                    </p>
                    <p className="text-gray-700 mt-4 line-clamp-3">{author.biography}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-12 col-span-full">
              <p className="text-gray-500 text-lg">No authors found.</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500 disabled:opacity-50"
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
        )}
      </div>
    </div>
  );
};

export default Authors;
