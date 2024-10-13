import { ReactEventHandler } from 'react';

export default function SearchBar({ placeholder, searchQuery, handleSearch }: {
  placeholder: string, 
  searchQuery: string, 
  handleSearch: ReactEventHandler, 
}) {
  return (
    <div className="flex items-end w-6/12 justify-end">
      <form className="w-full flex items-center">
        <label className="sr-only">Search</label>
        <div className="relative w-full">
          <input type="text"
            className="p-0"
            value={searchQuery}
            onChange={handleSearch}
            placeholder={placeholder} />
          <button type="button" className="search-btn">
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </button>
        </div>
        </form>
    </div>
  );
}
