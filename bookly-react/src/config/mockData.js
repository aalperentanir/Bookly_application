export const mockBooks = [
  {
    id: 1,
    title: "1984",
    summary: "Distopik bir gelecekte geçen, totaliter rejimin bireyleri nasıl kontrol ettiğini anlatan klasik roman.",
    publicationDate: "1949-06-08",
    isbn: "978-0451524935",
    pageCount: 328,
    coverImageUrl: "https://upload.wikimedia.org/wikipedia/tr/thumb/1/13/1984.jpg/250px-1984.jpg",
    averageRating: 4.5,
    ratingCount: 2847,
    authors: [{ id: 1, name: "George Orwell" }],
    categories: [{ id: 1, name: "Dystopian Fiction" }, { id: 2, name: "Political Fiction" }],
    publisher: { id: 1, name: "Secker & Warburg" }
  },
  {
    id: 2,
    title: "Suç ve Ceza",
    summary: "Dostoyevski'nin başyapıtı. St. Petersburg'da geçen, bir suçlunun psikolojik analizi.",
    publicationDate: "1866-01-01",
    isbn: "978-0486415871",
    pageCount: 671,
    coverImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Cover_of_the_first_edition_of_Crime_and_Punishment.jpg/250px-Cover_of_the_first_edition_of_Crime_and_Punishment.jpg",
    averageRating: 4.2,
    ratingCount: 1532,
    authors: [{ id: 2, name: "Fyodor Dostoyevski" }],
    categories: [{ id: 3, name: "Classic Literature" }, { id: 4, name: "Psychological Fiction" }],
    publisher: { id: 2, name: "Penguin Classics" }
  },
  {
    id: 3,
    title: "The Great Gatsby",
    summary: "1920'ler Amerikan rüyasının çöküşünü simgeleyen çarpıcı bir aşk ve trajedi hikayesi.",
    publicationDate: "1925-04-10",
    isbn: "978-0743273565",
    pageCount: 180,
    coverImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg/250px-The_Great_Gatsby_Cover_1925_Retouched.jpg",
    averageRating: 4.3,
    ratingCount: 2100,
    authors: [{ id: 3, name: "F. Scott Fitzgerald" }],
    categories: [{ id: 3, name: "Classic Literature" }, { id: 5, name: "Modernism" }],
    publisher: { id: 3, name: "Charles Scribner's Sons" }
  },
  {
    id: 4,
    title: "To Kill a Mockingbird",
    summary: "Irkçılık ve adalet temalarını çocuk gözünden anlatan etkileyici bir hikaye.",
    publicationDate: "1960-07-11",
    isbn: "978-0060935467",
    pageCount: 281,
    coverImageUrl: "https://upload.wikimedia.org/wikipedia/tr/thumb/c/cd/Bulbulu_oldurmek_ilk_baski.JPG/250px-Bulbulu_oldurmek_ilk_baski.JPG",
    averageRating: 4.8,
    ratingCount: 3925,
    authors: [{ id: 4, name: "Harper Lee" }],
    categories: [{ id: 6, name: "Southern Gothic" }, { id: 7, name: "Legal Story" }],
    publisher: { id: 4, name: "J.B. Lippincott & Co." }
  },
  {
    id: 5,
    title: "Brave New World",
    summary: "Teknoloji ve mutluluğun baskı aracı olarak kullanıldığı distopik bir geleceği anlatır.",
    publicationDate: "1932-01-01",
    isbn: "978-0060850524",
    pageCount: 268,
    coverImageUrl: "https://upload.wikimedia.org/wikipedia/tr/8/85/Cesuryenidunya.jpg",
    averageRating: 4.1,
    ratingCount: 1742,
    authors: [{ id: 5, name: "Aldous Huxley" }],
    categories: [{ id: 1, name: "Dystopian Fiction" }, { id: 8, name: "Science Fiction" }],
    publisher: { id: 5, name: "Chatto & Windus" }
  },
  {
    id: 6,
    title: "Pride and Prejudice",
    summary: "Aşk, gurur ve toplumsal sınıflar üzerine dönemin İngiltere'sinde geçen romantik bir roman.",
    publicationDate: "1813-01-28",
    isbn: "978-0141439518",
    pageCount: 279,
    coverImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/PrideAndPrejudiceTitlePage.jpg/250px-PrideAndPrejudiceTitlePage.jpg",
    averageRating: 4.6,
    ratingCount: 3201,
    authors: [{ id: 6, name: "Jane Austen" }],
    categories: [{ id: 3, name: "Classic Literature" }, { id: 9, name: "Romance" }],
    publisher: { id: 6, name: "T. Egerton, Whitehall" }
  },
  {
    id: 7,
    title: "Moby-Dick",
    summary: "Bir balina avı seferi üzerinden insan doğasının ve takıntının sorgulandığı epik bir roman.",
    publicationDate: "1851-10-18",
    isbn: "978-1503280786",
    pageCount: 635,
    coverImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Moby-Dick_FE_title_page.jpg/250px-Moby-Dick_FE_title_page.jpg",
    averageRating: 3.9,
    ratingCount: 980,
    authors: [{ id: 7, name: "Herman Melville" }],
    categories: [{ id: 10, name: "Adventure" }, { id: 3, name: "Classic Literature" }],
    publisher: { id: 7, name: "Harper & Brothers" }
  },
  {
    id: 8,
    title: "Frankenstein",
    summary: "Bir bilim insanının doğa yasalarını ihlal ederek hayat verdiği canavarın hikayesi.",
    publicationDate: "1818-01-01",
    isbn: "978-0486282114",
    pageCount: 280,
    coverImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Frankenstein_1818_edition_title_page.jpg/250px-Frankenstein_1818_edition_title_page.jpg",
    averageRating: 4.0,
    ratingCount: 1904,
    authors: [{ id: 8, name: "Mary Shelley" }],
    categories: [{ id: 8, name: "Science Fiction" }, { id: 11, name: "Gothic Fiction" }],
    publisher: { id: 8, name: "Lackington, Hughes, Harding, Mavor & Jones" }
  },
  {
    id: 9,
    title: "The Catcher in the Rye",
    summary: "Yetişkinliğe geçiş dönemindeki bir gencin yabancılaşmasını anlatan kült roman.",
    publicationDate: "1951-07-16",
    isbn: "978-0316769488",
    pageCount: 234,
    coverImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg/250px-The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg",
    averageRating: 3.8,
    ratingCount: 1450,
    authors: [{ id: 9, name: "J.D. Salinger" }],
    categories: [{ id: 12, name: "Coming-of-Age" }],
    publisher: { id: 9, name: "Little, Brown and Company" }
  },
  {
    id: 10,
    title: "The Hobbit",
    summary: "Bilbo Baggins'in epik yolculuğunu ve ejderha Smaug ile olan macerasını anlatır.",
    publicationDate: "1937-09-21",
    isbn: "978-0547928227",
    pageCount: 310,
    coverImageUrl: "https://upload.wikimedia.org/wikipedia/tr/thumb/7/71/Hobbit_Kapak.jpg/250px-Hobbit_Kapak.jpg",
    averageRating: 4.7,
    ratingCount: 4201,
    authors: [{ id: 10, name: "J.R.R. Tolkien" }],
    categories: [{ id: 13, name: "Fantasy" }, { id: 10, name: "Adventure" }],
    publisher: { id: 10, name: "George Allen & Unwin" }
  }
];

export const mockAuthors = [
  {
    id: 1,
    name: "George Orwell",
    biography: "İngiliz yazar ve gazeteci. Distopik romanları ile tanınır.",
    birthDate: "1903-06-25",
    deathDate: "1950-01-21",
    nationality: "British",
    profileImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/George_Orwell%2C_c._1940_%2841928180381%29_%28cropped%29.jpg/250px-George_Orwell%2C_c._1940_%2841928180381%29_%28cropped%29.jpg"
  },
  {
    id: 2,
    name: "Fyodor Dostoyevski",
    biography: "Rus yazar ve filozof. Psikolojik realizmin öncülerinden.",
    birthDate: "1821-11-11",
    deathDate: "1881-02-09",
    nationality: "Russian",
    profileImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Vasily_Perov_-_%D0%9F%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82_%D0%A4.%D0%9C.%D0%94%D0%BE%D1%81%D1%82%D0%BE%D0%B5%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_-_Google_Art_Project.jpg/250px-Vasily_Perov_-_%D0%9F%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82_%D0%A4.%D0%9C.%D0%94%D0%BE%D1%81%D1%82%D0%BE%D0%B5%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_-_Google_Art_Project.jpg"
  },
  {
    id: 3,
    name: "F. Scott Fitzgerald",
    biography: "Amerikan edebiyatının 20. yüzyıldaki önde gelen yazarlarından.",
    birthDate: "1896-09-24",
    deathDate: "1940-12-21",
    nationality: "American",
    profileImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/F_Scott_Fitzgerald_1921.jpg/250px-F_Scott_Fitzgerald_1921.jpg"
  },
  {
    id: 4,
    name: "Harper Lee",
    biography: "Amerikalı yazar, 'To Kill a Mockingbird' ile tanınır.",
    birthDate: "1926-04-28",
    deathDate: "2016-02-19",
    nationality: "American",
    profileImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Photo_portrait_of_Harper_Lee_%28To_Kill_a_Mockingbird_dust_jacket%2C_1960%29.jpg/250px-Photo_portrait_of_Harper_Lee_%28To_Kill_a_Mockingbird_dust_jacket%2C_1960%29.jpg"
  },
  {
    id: 5,
    name: "Aldous Huxley",
    biography: "İngiliz yazar ve filozof. Modern distopyanın öncülerinden.",
    birthDate: "1894-07-26",
    deathDate: "1963-11-22",
    nationality: "British",
    profileImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Aldous_Huxley_psychical_researcher.png/250px-Aldous_Huxley_psychical_researcher.png"
  },
  {
    id: 6,
    name: "Jane Austen",
    biography: "İngiliz romancı. Toplumun sınıfsal yapısını hicivle ele almıştır.",
    birthDate: "1775-12-16",
    deathDate: "1817-07-18",
    nationality: "British",
    profileImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Jane-Austen-portrait-victorian-engraving.png/250px-Jane-Austen-portrait-victorian-engraving.png"
  },
  {
    id: 7,
    name: "Herman Melville",
    biography: "Amerikan yazar. Epik deniz romanlarıyla tanınır.",
    birthDate: "1819-08-01",
    deathDate: "1891-09-28",
    nationality: "American",
    profileImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Herman_Melville_by_Joseph_O_Eaton.jpg/250px-Herman_Melville_by_Joseph_O_Eaton.jpg"
  },
  {
    id: 8,
    name: "Mary Shelley",
    biography: "İngiliz yazar, bilimkurgu edebiyatının kurucularından kabul edilir.",
    birthDate: "1797-08-30",
    deathDate: "1851-02-01",
    nationality: "British",
    profileImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Mary_Wollstonecraft_Shelley_Rothwell.tif/lossy-page1-200px-Mary_Wollstonecraft_Shelley_Rothwell.tif.jpg"
  },
  {
    id: 9,
    name: "J.D. Salinger",
    biography: "Amerikalı yazar, gençlik romanlarının önemli temsilcisi.",
    birthDate: "1919-01-01",
    deathDate: "2010-01-27",
    nationality: "American",
    profileImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/J._D._Salinger_%28Catcher_in_the_Rye_portrait%29.jpg/250px-J._D._Salinger_%28Catcher_in_the_Rye_portrait%29.jpg"
  },
  {
    id: 10,
    name: "J.R.R. Tolkien",
    biography: "İngiliz filolog, fantastik edebiyatın babası olarak bilinir.",
    birthDate: "1892-01-03",
    deathDate: "1973-09-02",
    nationality: "British",
    profileImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/J._R._R._Tolkien%2C_ca._1925.jpg/250px-J._R._R._Tolkien%2C_ca._1925.jpg"
  }
];


export const mockReviews = [
  {
    id: 1,
    rating: 5,
    comment: "Mükemmel bir kitap! Herkesin okuması gereken bir klasik.",
    createdAt: "2024-01-15T10:30:00",
    user: { id: 1, username: "kitapsever123", firstName: "Ahmet", lastName: "Yılmaz" },
    bookId: 1
  },
  {
    id: 2,
    rating: 4,
    comment: "Ağır ama düşündürücü bir eser. Dostoyevski'nin derinliği muhteşem.",
    createdAt: "2024-01-10T14:20:00",
    user: { id: 2, username: "okuyucu42", firstName: "Elif", lastName: "Kaya" },
    bookId: 2
  },
  {
    id: 3,
    rating: 5,
    comment: "Amerikan rüyasının çöküşünü bu kadar güzel anlatan başka bir kitap yok.",
    createdAt: "2024-02-01T12:00:00",
    user: { id: 3, username: "gatsbyfan", firstName: "Mert", lastName: "Demir" },
    bookId: 3
  },
  {
    id: 4,
    rating: 5,
    comment: "Çok dokunaklı, adaletin ve insanlığın sorgulandığı etkileyici bir roman.",
    createdAt: "2024-02-15T09:45:00",
    user: { id: 4, username: "adaletsever", firstName: "Zeynep", lastName: "Koç" },
    bookId: 4
  },
  {
    id: 5,
    rating: 4,
    comment: "Farklı bir distopya anlayışı. Okuması keyifliydi.",
    createdAt: "2024-03-03T13:20:00",
    user: { id: 5, username: "techreader", firstName: "Emre", lastName: "Arslan" },
    bookId: 5
  },
  {
    id: 6,
    rating: 5,
    comment: "Aşkın ve gururun bu kadar ustaca işlendiği bir roman nadir bulunur.",
    createdAt: "2024-03-10T16:50:00",
    user: { id: 6, username: "romantikruhu", firstName: "Seda", lastName: "Güneş" },
    bookId: 6
  },
  {
    id: 7,
    rating: 3,
    comment: "Biraz uzun ve yer yer sıkıcı ama anlatım tarzı etkileyici.",
    createdAt: "2024-03-15T11:30:00",
    user: { id: 7, username: "denizadam", firstName: "Can", lastName: "Kurt" },
    bookId: 7
  },
  {
    id: 8,
    rating: 4,
    comment: "Bilim ve insan doğası üzerine çok güçlü mesajlar içeriyor.",
    createdAt: "2024-04-01T08:10:00",
    user: { id: 8, username: "bilimkurgu22", firstName: "Yasemin", lastName: "Tunç" },
    bookId: 8
  },
  {
    id: 9,
    rating: 3,
    comment: "Bazı yerlerde kopukluk yaşadım ama genel olarak iyiydi.",
    createdAt: "2024-04-12T15:05:00",
    user: { id: 9, username: "gencruhu", firstName: "Bora", lastName: "Aydemir" },
    bookId: 9
  },
  {
    id: 10,
    rating: 5,
    comment: "Fantastik edebiyatın zirvesi. Harika bir yolculuktu!",
    createdAt: "2024-04-18T19:40:00",
    user: { id: 10, username: "hobbitfan", firstName: "Ayşe", lastName: "Kurtuluş" },
    bookId: 10
  },

    {
    id: 10,
    rating: 5,
    comment: "Harika bir yolculuktu!",
    createdAt: "2024-04-18T19:40:00",
    user: { id: 10, username: "hobbitfan", firstName: "Ridvan", lastName: "Kurtuluş" },
    bookId: 10
  }
];
