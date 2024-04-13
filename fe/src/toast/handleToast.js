import { ElNotification } from 'element-plus';

export const Notification = (error) => (
  ElNotification({
    title: 'Error',
    message: error.response.data.message,
    type: 'error',
  }));
