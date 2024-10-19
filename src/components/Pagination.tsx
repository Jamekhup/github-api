import React from 'react';

interface PaginationProps {
  totalPages: number;   
  currentPage: number;   
  onPageChange: (page: number) => void; 
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
    
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        disabled={i === currentPage}
        className={i === currentPage ? 'bg-blue-500 px-2 rounded-sm hover:bg-blue-500 disabled:hover': 'bg-blue-300 px-2 rounded-sm hover:bg-blue-500 disabled:hover' }
      >
        {i}
      </button>
    );
  }

  return (
    <div>
        {(pages.length > 0 && totalPages > 1) && (
            <div className='flex flex-wrap justify-center items-center mt-3 gap-2'>
                {pages}
            </div>
        )}
    </div>
  );
};

export default Pagination;
