declare namespace API {
  type ApiResponseConversationResDTO = {
    code?: string;
    message?: string;
    data?: ConversationResDTO;
  };

  type ApiResponseCustomPageScrollUserConversationResDTO = {
    code?: string;
    message?: string;
    data?: CustomPageScrollUserConversationResDTO;
  };

  type ApiResponseObject = {
    code?: string;
    message?: string;
    data?: any;
  };

  type ApiResponsePageConversationResDTO = {
    code?: string;
    message?: string;
    data?: PageConversationResDTO;
  };

  type AttachmentDTO = {
    type?: string;
    url?: string;
    name?: string;
  };

  type ConversationReqDTO = {
    id?: string;
    type?: string;
    name?: string;
    avatar?: string;
    description?: string;
    participantIds?: string[];
    message?: MessageReqDTO;
  };

  type ConversationResDTO = {
    id?: string;
    type?: 'DIRECT' | 'GROUP';
    name?: string;
    avatar?: string;
    description?: string;
    lastMessage?: MessageReqDTO;
    participantInfos?: ParticipantResDTO[];
  };

  type CustomPageScrollUserConversationResDTO = {
    content?: UserConversationResDTO[];
    limit?: number;
    extendData?: Record;
  };

  type FilterCriteria = {
    key?: string;
    value?: any;
    operation?: string;
    values?: any[];
  };

  type FilterRequest = {
    page?: number;
    size?: number;
    filters?: FilterCriteria[];
  };

  type getDetailConversationParams = {
    conversationId: string;
  };

  type MessageReqDTO = {
    id?: string;
    conversationId?: string;
    senderId?: string;
    content?: string;
    contentType?: string;
    attachments?: AttachmentDTO[];
  };

  type PageableObject = {
    offset?: number;
    sort?: SortObject;
    paged?: boolean;
    pageSize?: number;
    pageNumber?: number;
    unpaged?: boolean;
  };

  type PageConversationResDTO = {
    totalElements?: number;
    totalPages?: number;
    size?: number;
    content?: ConversationResDTO[];
    number?: number;
    sort?: SortObject;
    first?: boolean;
    last?: boolean;
    numberOfElements?: number;
    pageable?: PageableObject;
    empty?: boolean;
  };

  type ParticipantResDTO = {
    id?: string;
    conversationId?: string;
    fullName?: string;
    userId?: string;
    role?: string;
    status?: string;
    invitedBy?: string;
    joinedAt?: string;
    leftAt?: string;
  };

  type SearchConversationRequestDto = {
    searchValue?: string;
    searchAfter?: string;
    limit?: number;
  };

  type SortObject = {
    empty?: boolean;
    sorted?: boolean;
    unsorted?: boolean;
  };

  type UserConversationResDTO = {
    id?: string;
    userId?: string;
    username?: string;
    name?: string;
    avatar?: string;
    type?: string;
    conversationId?: string;
    unreadCount?: number;
    notifications?: boolean;
    isPinned?: boolean;
    lastMessage?: MessageReqDTO;
  };
}
