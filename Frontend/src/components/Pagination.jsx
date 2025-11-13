import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '16px',
        gap: '12px',
      }}
    >
      <button
        onClick={handlePrev}
        disabled={currentPage <= 1}
        style={{
          padding: '6px 12px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          backgroundColor: currentPage <= 1 ? '#f0f0f0' : '#007bff',
          color: currentPage <= 1 ? '#999' : '#fff',
          cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
        }}
      >
        Prev
      </button>

      <span>
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        style={{
          padding: '6px 12px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          backgroundColor: currentPage >= totalPages ? '#f0f0f0' : '#007bff',
          color: currentPage >= totalPages ? '#999' : '#fff',
          cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
        }}
      >
        Next
      </button>
    </div>
  );
}
