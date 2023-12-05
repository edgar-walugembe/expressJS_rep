export const formatDateWithoutTime = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const baseUrl = "http://localhost:5000";
export const getUrl = `${baseUrl}/dev`;
export const createUrl = `${baseUrl}/create-dev`;
export const editUrl = `${baseUrl}/edit-dev`;
export const deleteUrl = `${baseUrl}/delete-dev`;
export const uploadUrl = `${baseUrl}/upload-devFiles`;
