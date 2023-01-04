import * as React from 'react';
import Stack from '@mui/material/Stack';
import BookCard from './BookCard';
import { HelloReactEndpoint } from 'Frontend/generated/endpoints';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface BooksResponse {
  isbn: string;
  title: string;
  authors: string;
  publication_year: string;
  price: number;
  stock: number;
}

export default function ShopView() {
  const [books, setBooks] = React.useState<BooksResponse[]>([]);
  const [keyword, setKeyword] = React.useState<string>('');
  const [criteria, setCriteria] = React.useState<string>('title');
  const [page, setPage] = React.useState<number>(1);

  const searchBooks = () => {
    const bookPromise =
      keyword === ''
        ? HelloReactEndpoint.getAllBooks(page)
        : criteria === 'title'
        ? HelloReactEndpoint.searchBookByTitle(keyword, page)
        : criteria === 'author'
        ? HelloReactEndpoint.searchBookByAuthor(keyword, page)
        : criteria === 'publisher'
        ? HelloReactEndpoint.searchBookByPublisher(keyword, page)
        : HelloReactEndpoint.searchBookByISBN(keyword, page);

    bookPromise.then((response) => {
      console.log(JSON.parse(response));
      setBooks(JSON.parse(response));
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      searchBooks();
    }
  };

  const handleCriteriaChange = (event: SelectChangeEvent) => {
    setCriteria(event.target.value as string);
  };

  const handleKeywordChange = (event: React.ChangeEvent<{ value: string }>) => {
    setKeyword(event.target.value as string);
  };

  React.useEffect(() => {
    searchBooks();
  }, [page]);

  return (
    <Stack maxWidth="xl" spacing={2} alignItems="center">
      <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%' }}>
        <TextField
          id="book-search"
          hiddenLabel
          placeholder="Search"
          variant="filled"
          size="small"
          sx={{ flex: 1 }}
          onChange={handleKeywordChange}
          onKeyDown={handleKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Select native defaultValue="title" size="small" onChange={handleCriteriaChange}>
          <option value="title">title</option>
          <option value="author">author</option>
          <option value="publisher">publisher</option>
          <option value="isbn">isbn</option>
        </Select>
      </Stack>
      {books.map((book) => (
        <BookCard
          key={book.isbn}
          title={book.title}
          authors={book.authors.split(',')}
          publisher={book.publication_year}
          isbn={book.isbn}
          price={book.price}
          stock={book.stock}
        />
      ))}
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton onClick={() => setPage(page - 1)} disabled={page === 1}>
          <ChevronLeft />
        </IconButton>
        <Typography variant="h6">{page}</Typography>
        <IconButton onClick={() => setPage(page + 1)} disabled={books.length < 10}>
          <ChevronRight />
        </IconButton>
      </Stack>
    </Stack>
  );
}
