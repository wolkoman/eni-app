import create from 'zustand'

export enum Permission{
  Articles,
  ReaderPlanning,
  PrivateCalendarAccess
}

interface Store{
  user: { active: boolean, api_key: string, email: string, name: string } | null,
  permissions: Record<Permission, boolean>,
  isLoggedIn: () => boolean,
  load: () => void,
  loaded: boolean,
}
export const useStore = create<Store>((set, get) => ({
  user: null,
  loaded: false,
  permissions: {[Permission.Articles]: false, [Permission.ReaderPlanning]: false, [Permission.PrivateCalendarAccess]: false},
  isLoggedIn: () => !!get().user?.active,
  load: () => {
    if(get().loaded) return;
    const user = JSON.parse(sessionStorage.getItem("user") ?? "{}");
    set(state => ({ ...state, user, loaded: true, permissions: {
      [Permission.Articles]: ["admin"].includes(user.group),
      [Permission.PrivateCalendarAccess]: ["PrivateCalendarAccess", "admin"].includes(user.group),
      [Permission.ReaderPlanning]: ["admin"].includes(user.group)
    }}));
  },
}))