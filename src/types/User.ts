export interface User {
  id: number,
  email: string,
  role: string,
  bossId: number | null,
  createdAt: string,
  updatedAt: string,
}
