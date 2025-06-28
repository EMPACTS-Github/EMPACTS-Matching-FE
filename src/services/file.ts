export const handleDocumentDownload = (fileUrl: string, fileName: string) => {
  // Create a hidden anchor element
  const element = document.createElement('a');
  element.setAttribute('href', fileUrl);
  element.setAttribute('download', fileName);
  element.style.display = 'none';

  // Add to the DOM
  document.body.appendChild(element);

  // Trigger download
  element.click();

  // Clean up
  document.body.removeChild(element);
};

export const getFileName = (fileOriginalName: string, maxLength: number = 30) => {
  const fileName = fileOriginalName.split('.').slice(0, -1).join('.');
  if (fileName.length > maxLength) {
    return fileName.slice(0, maxLength) + '...';
  }
  return fileName;
}