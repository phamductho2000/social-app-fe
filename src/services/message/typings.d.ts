declare namespace API {
  type ApiResponseBoolean = {
    code?: string;
    message?: string;
    data?: boolean;
  };

  type ApiResponseCustomPageScrollMessageResDTO = {
    code?: string;
    message?: string;
    data?: CustomPageScrollMessageResDTO;
  };

  type ApiResponseMessageResDTO = {
    code?: string;
    message?: string;
    data?: MessageResDTO;
  };

  type Attachment = {
    id?: string;
    fileName?: string;
    originalName?: string;
    size?: number;
    mimeType?: string;
    url?: string;
    uploadedAt?: string;
  };

  type CustomPageScrollMessageResDTO = {
    content?: MessageResDTO[];
    limit?: number;
    extendData?: Record;
  };

  type Mention = {
    userId?: string;
  };

  type MessageReqDTO = {
    id?: string;
    tempId?: string;
    conversationId?: string;
    senderId?: string;
    userName?: string;
    content?: string;
    type?: 'TEXT' | 'IMAGE' | 'FILE';
    status?: 'SENDING' | 'SENT' | 'READ' | 'FAILED' | 'DELETED';
    sentAt?: string;
    attachments?: Attachment[];
    reactionHistory?: ReactionHistory;
    mentions?: Mention[];
    replyTo?: Reply;
  };

  type MessageResDTO = {
    id?: string;
    tempId?: string;
    conversationId?: string;
    senderId?: string;
    userName?: string;
    content?: string;
    type?: 'TEXT' | 'IMAGE' | 'FILE';
    status?: 'SENDING' | 'SENT' | 'READ' | 'FAILED' | 'DELETED';
    sentAt?: string;
    attachments?: Attachment[];
    summaryReaction?: Record;
    mentions?: Mention[];
    replyTo?: Reply;
  };

  type ReactionHistory = {
    id?: string;
    messageId?: string;
    userId?: string;
    emoji?: string;
    unified?: string;
    createdAt?: string;
    updatedAt?: string;
  };

  type Reply = {
    messageId?: string;
    senderId?: string;
    senderName?: string;
    content?: string;
    contentType?: string;
    attachments?: Attachment[];
  };

  type SearchMessageRequestDto = {
    conversationId?: string;
    limit?: number;
    searchAfter?: string;
  };
}
