import create from 'zustand'

export enum Permission{
  Articles
}

interface Store{
  user: { active: boolean, api_key: string, email: string, name: string } | null,
  permissions: Record<Permission, boolean>,
  isLoggedIn: () => boolean,
  load: () => void,
}
export const useStore = create<Store>((set, get) => ({
  user: null,
  permissions: {[Permission.Articles]: false},
  isLoggedIn: () => !!get().user?.active,
  load: () => {
    const user = JSON.parse(sessionStorage.getItem("user") ?? "{}");
    set(state => ({ ...state, user, permissions: {
      [Permission.Articles]: ["admin"].includes(user.group)
    }}));
  },
}))