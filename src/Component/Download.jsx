import React from 'react';

const DownloadButton = () => {
  const handleDownload = () => {
    fetch('http://localhost:5000/download_excel', {
      method: 'GET',
    })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'students.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch(err => {
        alert('Download failed');
        console.error(err);
      });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button onClick={handleDownload} style={{
        padding: '12px 24px',
        fontSize: '16px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer'
      }}>
        Download Excel
      </button>
    </div>
  );
};

export default DownloadButton;
