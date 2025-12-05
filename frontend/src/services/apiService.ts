import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify"; 

// Generic API Response Structure
export interface ApiResponse<T> {
  status: number;
  result: T;
  message?: string;
}

// --- Helpers ---
const handleApiResponse = <T>(response: any): T => {
  // Handle success status codes (200-299)
  if (response.status >= 200 && response.status < 300) {
    if (response.data !== "" && response.data !== undefined) {
      return response.data as T;
    } else {
      toast.info("Request successful, but no data returned");
      return {
        message: "Request successful, but no data returned",
      } as unknown as T;
    }
  }

  throw new Error(
    `Unexpected API response format: ${JSON.stringify(response)}`
  );
};

const handleApiError = (error: any) => {
  let title = "Error";
  let description = "An error occurred while processing your request.";

  if (error.response) {
    const { data, status } = error.response;
    title = `Error ${status}`;
    description = data?.message || "API error occurred.";
    console.error("API Error Response:", data);
  } else if (error.request) {
    title = "Network Error";
    description = "No response from server. Please check your network.";
    console.error("API Error Request:", error.request);
  } else {
    description = error.message || "An unexpected error occurred.";
    console.error("API Error Message:", error.message);
  }

  console.error(title, { description });
};

// --- GET ---
export const getData = async <T>(
  url: string,
  params?: Record<string, any>
): Promise<T> => {
  try {
    const response = await axiosInstance.get<ApiResponse<T>>(url, { params });
    return handleApiResponse<T>(response);
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};

// --- POST ---
export const postData = async <T>(
  url: string,
  data: Record<string, any> | FormData,
  contentType: "application/json" | "multipart/form-data" = "application/json"
): Promise<T> => {
  try {
    const headers = { "Content-Type": contentType };
    const response = await axiosInstance.post<T>(url, data, { headers });
    return handleApiResponse<T>(response);
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};

// --- PUT ---
export const putData = async <T>(
  url: string,
  data: Record<string, any> | FormData,
  contentType: "application/json" | "multipart/form-data" = "application/json"
): Promise<T> => {
  try {
    const headers = { "Content-Type": contentType };
    const response = await axiosInstance.put<ApiResponse<T>>(url, data, {
      headers,
    });
    return handleApiResponse<T>(response);
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};

// --- PATCH ---
export const patchData = async <T>(
  url: string,
  data: Record<string, any> | FormData,
  contentType: "application/json" | "multipart/form-data" = "application/json"
): Promise<T> => {
  try {
    const headers = { "Content-Type": contentType };
    const response = await axiosInstance.patch<ApiResponse<T>>(url, data, {
      headers,
    });
    return handleApiResponse<T>(response);
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};

// --- DELETE ---
export const deleteData = async <T>(
  url: string,
  data?: Record<string, any>
): Promise<T> => {
  try {
    const response = await axiosInstance.delete<ApiResponse<T>>(url, {
      data,
    });
    return handleApiResponse<T>(response);
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};

//multipart/form-data
export const postDataMultipart = async <T>(
  url: string,
  data: Record<string, any> | FormData
): Promise<T> => {
  return postData<T>(url, data, "multipart/form-data");
};

// Keep useApi for backward compatibility (but it's now just a wrapper)
export const useApi = () => {
  return { 
    getData, 
    postData, 
    putData, 
    patchData, 
    deleteData, 
    postDataMultipart 
  };
};
