import axios from './axiosInstance';

const AxiosController = {
  post: async (data: Object, endpoint: string, headers = {}) => {
    try {
      const response = await axios.post(endpoint, data, { headers });
      return response;
    } catch (err: any) {
      return err.response;
    }
  },
};

export default AxiosController;
