export default function Pagination({totalItems, itemsPerPage, setCurrentPage, currentPage }: {
  totalItems: number, 
  itemsPerPage: number, 
  setCurrentPage: any, 
  currentPage: number
}) {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++){
    pages.push(i);
  }

  const isLastPage = currentPage === Math.ceil(totalItems / itemsPerPage);
  const isFirstPage = currentPage === 1;

  return (
    <nav aria-label="Pagination" className="ml-0 mr-0 px-1">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button disabled={isFirstPage}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="rounded-s-md default-page">Previous</button>
        </li>
        {pages.map((page, index) => {
          return (
            <li key={index}>
              <a href="#"
                onClick={() => setCurrentPage(page)}
                className={page == currentPage ? 'active-page' : 'default-page'}>
                {page}
              </a>
            </li>
          )
        })}
        <li>
          <button disabled={isLastPage}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="rounded-e-md default-page">Next</button>
        </li>
      </ul>
    </nav>
  )
}