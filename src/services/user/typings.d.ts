declare namespace API {
  type ApiResponseCustomPageScrollUserResponseDTO = {
    code?: string;
    message?: string;
    data?: CustomPageScrollUserResponseDTO;
  };

  type ApiResponseListUserResponseDTO = {
    code?: string;
    message?: string;
    data?: UserResponseDTO[];
  };

  type ApiResponseObject = {
    code?: string;
    message?: string;
    data?: any;
  };

  type ApiResponseUserResponseDTO = {
    code?: string;
    message?: string;
    data?: UserResponseDTO;
  };

  type CustomPageScrollUserResponseDTO = {
    content?: UserResponseDTO[];
    limit?: number;
    extendData?: Record;
  };

  type getUserByIdParams = {
    id: string;
  };

  type getUserByUsernameParams = {
    username: string;
  };

  type SearchUserRequestDto = {
    searchValue?: string;
    searchAfter?: string;
    limit?: number;
  };

  type UserRequestDTO = {
    id?: string;
    userId?: string;
    userName?: string;
    password?: string;
    enabled?: boolean;
    firstName?: string;
    lastName?: string;
    email?: string;
    birthDate?: string;
    userIds?: string[];
  };

  type UserResponseDTO = {
    id?: string;
    userId?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    email?: string;
    createdAt?: string;
  };
}
