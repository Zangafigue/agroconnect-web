import axios from '../api/axios';

const profileService = {
  updateProfile: async (data) => {
    const response = await axios.patch('/profile', data);
    return response.data;
  },
  uploadPicture: async (file) => {
    const formData = new FormData();
    formData.append('picture', file);
    const response = await axios.post('/profile/picture', formData);
    return response.data;
  },
  updatePassword: async (currentPassword, newPassword) => {
    const response = await axios.patch('/profile/password', { currentPassword, newPassword });
    return response.data;
  },
};

export default profileService;
