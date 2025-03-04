export interface Position {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  teamId: string | null;
  organizationId: string;
  organizationParentId: string | null;
  isChief: boolean;
  isHead: boolean;
  isOwner: boolean;
  isPublished: boolean;
  isSync: boolean;
  Team: any | null;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  teamId: string | null;
  photoUrl: string | null;
  positionId: string;
  Position: Position;
  idamanId: string | null;
  webAuthnId: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
