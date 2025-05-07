import { IUserTerritory } from '../../types/user';

export interface Position {
  id: string;
  name: string;
  role: string;
  refId: string;
}

export interface User {
  id: string;
  idamanId: string | null;
  webAuthnId: string;
  email: string;
  name: string;
  role: string;
  photoUrl: string | null;
  status: string;
  UserTerritory: IUserTerritory[];
  Position: Position;
}
