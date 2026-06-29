import { http } from './http-client'

export interface ApiMember {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone_number: string;
  email: string;
  gender: string;
  department_name: string;
  date_joined: string;
}

export interface MembersResponse {
  count: number;
  page: number;
  page_size: number;
  total_pages: number;
  results: ApiMember[];
}

export const memberApi = {
  async getMembers(page: number = 1, pageSize: number = 10): Promise<MembersResponse> {
    const res = await http.get<MembersResponse>(`/api/members/?page=${page}&page_size=${pageSize}`);
    
    if (!res.ok || !res.data) {
      throw new Error(res.error || 'Failed to fetch members');
    }
    
    return res.data;
  }
};
