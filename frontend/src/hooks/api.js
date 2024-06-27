import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/es", // Replace with your actual API base URL
});

const errorHandler = (error) => {
  if (error.response) {
    toast.error(`Error: ${error.response.data.message}`);
  } else {
    toast.error("Network error occurred. Please try again later.");
  }
};

export const useClients = (currentPage, pagelimit) => {
  return useQuery({
    queryKey: ["clientsList"],
    queryFn: async () => {
      const { data } = await apiClient.get("/clients/", {
        params: { page: currentPage, limit: pagelimit },
      });
      return data;
    },
    onError: errorHandler,
  });
};

export const useClientsQuery = (query) => {
  return useQuery({
    queryKey: ["clients", query],
    queryFn: async () => {
      const { data } = await apiClient.get("/clients", {
        params: { q: query },
      });
      return data;
    },
    onError: errorHandler,
    keepPreviousData: true,
  });
};

export const useClient = (id) => {
  return useQuery({
    queryKey: ["client", id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/clients/${id}`);
      return data;
    },
    enabled: !!id,
    onError: errorHandler,
  });
};

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newClient) => {
      const { data } = await apiClient.post("/clients", newClient);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("clients");
      toast.success("Client created successfully!");
    },
    onError: errorHandler,
  });
};

export const useUpdateClient = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedClient) => {
      const { data } = await apiClient.put(`/clients/${id}`, updatedClient);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("clients");
      toast.success("Client updated successfully!");
    },
    onError: errorHandler,
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const { data } = await apiClient.delete(`/clients/${id}`);
      return data;
    },
    onSuccess: () => {
      toast.success("Client deleted successfully!");
    },
    onError: errorHandler,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["clientsList"] });
    },
  });
};
