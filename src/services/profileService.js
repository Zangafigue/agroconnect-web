import axios from '../api/axios';

const profileService = {
  updateProfile: async (data) => {
    const response = await axios.patch('/auth/profile', data);
    return response.data;
  },
  uploadPicture: async (file) => {
    const formData = new FormData();
    formData.append('picture', file);
    const response = await axios.post('/auth/profile/picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default profileService;
