import {useModel} from "@@/exports";

export const useCurrentUser = (): API.UserResponseDTO | undefined => {
  const { initialState } = useModel('@@initialState');
  return initialState?.currentUser ?? undefined;
};
