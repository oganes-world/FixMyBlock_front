import axios from "axios";

export interface Report {
  _id?: string;
  lat: number;
  lng: number;
  problemType: string;
  isNearSchool?: boolean;
  schoolName?: string;
  description: string;
  imageUrl?: string;
  timestamp?: Date;
}

const API_BASE_URL = "http://localhost:5000/api"; // change if needed

// Add a new report
export const addReport = async (report: Report, imageFile?: File) => {
  try {
    const formData = new FormData();
    formData.append("problemType", report.problemType);
    formData.append("description", report.description);
    formData.append("lat", report.lat.toString());
    formData.append("lng", report.lng.toString());

    if (report.isNearSchool !== undefined)
      formData.append("isNearSchool", String(report.isNearSchool));
    if (report.schoolName)
      formData.append("address", report.schoolName);
      formData.append("schoolName", report.schoolName);
    if (imageFile)
      formData.append("image", imageFile);

    const response = await axios.post(`${API_BASE_URL}/reports`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error adding report:", error);
    throw error;
  }
};

// Get all reports
export const getReports = async (): Promise<Report[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reports`);
    console.log(response);
    
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching reports:", error);
    throw error;
  }
};

// Get a single report by ID
export const getReportById = async (id: string): Promise<Report | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reports/${id}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching report ${id}:`, error);
    return null;
  }
};
