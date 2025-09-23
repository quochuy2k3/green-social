import type { FileUploadResponse } from '@/types/api';
import apiClient from './api';

export class StorageService {
  /**
   * Upload file to server
   */
  async uploadFile(file: any): Promise<FileUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<FileUploadResponse>('/storage/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  /**
   * Get file info by upload ID
   */
  async getFileInfo(uploadId: string): Promise<FileUploadResponse> {
    const response = await apiClient.get<FileUploadResponse>(`/storage/files/${uploadId}/info`);
    return response.data;
  }

  /**
   * Delete file by upload ID
   */
  async deleteFile(uploadId: string): Promise<void> {
    await apiClient.delete(`/storage/files/${uploadId}`);
  }

  /**
   * Get file URL by upload ID
   */
  getFileUrl(uploadId: string): string {
    return `${apiClient.defaults.baseURL}/storage/files/${uploadId}`;
  }
}

export const storageService = new StorageService();