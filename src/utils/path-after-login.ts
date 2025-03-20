import { paths } from 'src/pages/paths';

export function pathAfterLogin(role?: string) {
  switch (role) {
    // case 'VENDOR':
    //   return paths.approval.root;

    // case rolePTPL.includes(role):
    //   return paths.approval.root;

    default:
      return paths.approval.root;
  }
}
