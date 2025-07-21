declare namespace API {
  type ApiResponseObject = {
    code?: string;
    message?: string;
    data?: any;
  };

  type ApiResponseRefreshTokenResponseDto = {
    code?: string;
    message?: string;
    data?: RefreshTokenResponseDto;
  };

  type ApiResponseUserLoginResponseDto = {
    code?: string;
    message?: string;
    data?: UserLoginResponseDto;
  };

  type ApiResponseUserResponseDTO = {
    code?: string;
    message?: string;
    data?: UserResponseDTO;
  };

  type RefreshTokenRequestDto = {
    refreshToken?: string;
  };

  type RefreshTokenResponseDto = {
    accessToken?: string;
    refreshToken?: string;
    expireIn?: string;
    refreshExpiresIn?: string;
  };

  type UserLoginRequestDto = {
    username?: string;
    password?: string;
  };

  type UserLoginResponseDto = {
    accessToken?: string;
    refreshToken?: string;
    expireIn?: string;
    refreshExpiresIn?: string;
    username?: string;
    userId?: string;
  };

  type UserRegisterReqDTO = {
    userId?: string;
    username?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  };

  type UserResponseDTO = {
    id?: string;
    userId?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    email?: string;
    lastConnectionTime?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}
