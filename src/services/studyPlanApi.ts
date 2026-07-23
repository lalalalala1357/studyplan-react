import axios from "axios";
import type { StudyPlan } from "../types/studyPlan";

const API_URL = "http://localhost:5273/api/study-plans";

function errorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError<{ message?: string }>(error)) 
  {
    return error.response?.data?.message ?? fallback;
  }
  return error instanceof Error ? error.message : fallback;
}

export async function getStudyPlans(): Promise<StudyPlan[]> {
  try 
  {
    const response = await axios.get<StudyPlan[]>(API_URL);
    return response.data;
  } 
  
  catch (error) 
  {
    throw new Error(errorMessage(error, "讀取讀書計畫失敗"));
  }
}

export async function getStudyPlanById(id: number): Promise<StudyPlan> {
  try 
  {
    const response = await axios.get<StudyPlan>(`${API_URL}/${id}`);
    return response.data;
  } 

  catch (error) 
  {
    throw new Error(errorMessage(error, "找不到讀書計畫"));
  }
}

export async function createStudyPlan(planName: string, plannedHours: number): Promise<StudyPlan> {
  try 
  {
    const response = await axios.post<StudyPlan>(API_URL, { planName, plannedHours });
    return response.data;
  } 

  catch (error) 
  {
    throw new Error(errorMessage(error, "新增讀書計畫失敗"));
  }
}

export async function deleteStudyPlan(id: number): Promise<void> {
  try 
  {
    await axios.delete(`${API_URL}/${id}`);
  }

  catch (error) 
  {
    throw new Error(errorMessage(error, "刪除讀書計畫失敗"));
  }
}

export async function updateStudyPlan(
  id: number,
  planName: string,
  plannedHours: number,
  actualHours: number,
  abandoned: boolean,
): Promise<void> {
  try 
  {
    await axios.put(`${API_URL}/${id}`, { planName, plannedHours, actualHours, abandoned });
  } 
  
  catch (error) 
  {
    throw new Error(errorMessage(error, "更新讀書計畫失敗"));
  }
}
