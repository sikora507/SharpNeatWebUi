import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import apiClient from "../axios/apiClient";

interface IExperimentsResponse {
    name: string;
    id: string;
  }
  
  const getExperiments = async () => {
    const response = await apiClient.get<IExperimentsResponse[]>(`/experiments`);
    if (response.status == 200) {
      return response.data;
    }
    throw new Error("Error loading experiments");
  };
  
  const useExperiments = () => {
    const { data: experiments } = useQuery<IExperimentsResponse[], Error>(
      "experiments",
      getExperiments
    );
    return { experiments }
  };
  
  export default useExperiments;