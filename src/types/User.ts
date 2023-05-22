export interface User {
  id: number,
  password: string,
  email: string,
  role: string,
  bossId: number | null,
  createdAt: string,
  updatedAt: string,
}
