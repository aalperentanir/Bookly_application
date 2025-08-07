
import { Book, BookOpen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookCard from "../BookCard/BookCard";
import EditIcon from '@mui/icons-material/Edit';
import UpdateAuthorModal from "../Modal/UpdateAuthorModal";
import { useDispatch, useSelector } from "react-redux";
import { getAuthorById } from "@/State/Author/Action";
import { getBooksByAuthor } from "@/State/Book/Action";
const AuthorDetails = () => {
  const dispatch = useDispatch()
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const { id } = useParams();
  const { author } = useSelector((state) => state.author);
  const {auth} = useSelector(store=> store)
   const { books } = useSelector((state) => state.book);
  
  const authorBooks = books.filter((book) =>
    book.authors.some((a) => a.name === author?.name)
  );

  useEffect(()=>{
    dispatch(getAuthorById(id))
    dispatch(getBooksByAuthor(id));
  },[dispatch,id])


    const isAdmin = () => {
    const userRole = auth.user?.role;
    return userRole === "ADMIN";
  };



  if (!author) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Author not found
          </h1>
          <Link to="/authors" className="text-blue-600 hover:underline">
            Back to authors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <img
              src={author.profileImageUrl}
              alt=""
              className="w-48 h-48 rounded-lg object-cover shadow-md"
            />

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {author.name}
              </h1>

              <div className="grid gird-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
                <div>
                  <span className="font-semibold">Birth Date:</span>
                  <p className="font-semibold">
                    {new Date(author.birthDate).toLocaleDateString("tr-TR")}
                  </p>
                </div>
                {author.deathDate && (
                  <div>
                    <span className="text-gray-500">Death Date:</span>
                    <p className="font-semibold">
                      {new Date(author.deathDate).toLocaleDateString("tr-TR")}
                    </p>
                  </div>
                )}

                <div>
                  <span className="text-gray-500">Nationality:</span>
                  <p className="font-semibold">{author.nationality}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">About:</h3>
                <p className="text-gray-700 leading-relaxed">
                  {author.biography}
                </p>
              </div>

              <div>
                {/**Normalde isAdmin() olmasi gerekiyor ama suanlik true olucak ki button gozuksun*/}
                {isAdmin() && (
                  <button
                    onClick={() => setIsUpdateModalOpen(true)}
                    className="w-full bg-yellow-400 text-black py-3 rounded-lg hover:bg-yellow-500 transition-colors font-semibold"
                  >
                    <EditIcon className="w-5 h-5 inline mr-2" />
                    Update Author
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Books</h2>

          {authorBooks.length > 0 ? (
            <div className="grid gap-6">
              {authorBooks.map((book) => (
                <BookCard key={book.id} book={book} size="large" />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">
                This author doesn't have any book...
              </p>
            </div>
          )}
        </div>
      </div>

      <UpdateAuthorModal
      isOpen={isUpdateModalOpen}
      onClose={() => setIsUpdateModalOpen(false)}
      author={author}
      />
    </div>
  );
};

export default AuthorDetails;
