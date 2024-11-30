/* eslint-disable @typescript-eslint/no-explicit-any */
import privateClient from "../client/private.client";

const contactEndpoints = {
  getAll: "contacts",
  get: "contacts/{id}",
  create: "contacts",
  update: "contacts/{id}",
  delete: "contacts/{id}",
};

interface ContactData {
  contactName: string;
  mobileNumber?: string;
  email?: string;
}

interface ContactResponse {
  id: string;
  contactName: string;
  mobileNumber?: string;
  email?: string;
  user: string;
}

interface ApiResponse<T> {
  status: string;
  results?: number;
  data: T;
  err?: {
    message: string;
    status?: string;
  };
}

const contactApi = {
  getAll: async (): Promise<ApiResponse<ContactResponse[]>> => {
    try {
      const response = await privateClient.get<{
        status: string;
        results: number;
        data: ContactResponse[];
      }>(contactEndpoints.getAll);

      // Only return `results` for `getAll` (when `data` is an array)
      return {
        status: response.data.status,
        results: response.data.results,
        data: response.data.data,
      };
    } catch (err: any) {
      console.error(err);
      return {
        status: "error",
        data: [],
        err: {
          message: err.message || "Something went wrong",
          status: err.status,
        },
      };
    }
  },

  get: async (id: string): Promise<ApiResponse<ContactResponse | null>> => {
    try {
      const response = await privateClient.get<{
        status: string;
        results: number;
        data: ContactResponse;
      }>(contactEndpoints.get.replace("{id}", id));

      return {
        status: response.data.status,
        data: response.data.data,
      };
    } catch (err: any) {
      console.error(err);
      return {
        status: "error",
        data: null,
        err: {
          message: err.message || "Something went wrong",
          status: err.status,
        },
      };
    }
  },

  create: async (
    contactData: ContactData
  ): Promise<ApiResponse<ContactResponse | null>> => {
    try {
      const response = await privateClient.post<{
        status: string;
        results: number;
        data: ContactResponse;
      }>(contactEndpoints.create, contactData);

      // Return single object as `data`
      return {
        status: response.data.status,
        data: response.data.data,
      };
    } catch (err: any) {
      console.error(err);
      return {
        status: "error",
        data: null,
        err: {
          message: err.message || "Something went wrong",
          status: err.status,
        },
      };
    }
  },

  update: async (
    id: string,
    contactData: ContactData
  ): Promise<ApiResponse<ContactResponse | null>> => {
    try {
      const response = await privateClient.patch<{
        status: string;
        results: number;
        data: ContactResponse;
      }>(contactEndpoints.update.replace("{id}", id), contactData);

      // Return single object as `data`
      return {
        status: response.data.status,
        data: response.data.data,
      };
    } catch (err: any) {
      console.error(err);
      return {
        status: "error",
        data: null,
        err: {
          message: err.message || "Something went wrong",
          status: err.status,
        },
      };
    }
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    try {
      const response = await privateClient.delete<{
        status: string;
        results: number;
        data: null;
      }>(contactEndpoints.delete.replace("{id}", id));

      return {
        status: response.data.status,
        data: null, // `data` will be `null` for delete
      };
    } catch (err: any) {
      console.error(err);
      return {
        status: "error",
        data: null,
        err: {
          message: err.message || "Something went wrong",
          status: err.status,
        },
      };
    }
  },
};

export default contactApi;
