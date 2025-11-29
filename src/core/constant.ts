export const UNPAGED = {
  page: 0,
  size: 999999999
}

export const TOPIC_MESSAGE_SEND = "/app/chat/message/send/"
export const TOPIC_MESSAGE_REACT = "/app/chat/message/react/"
export const TOPIC_MESSAGE_REPLY = "/app/chat/message/reply/"
export const TOPIC_MESSAGE_EDIT = "/app/chat/message/edit/"
export const TOPIC_MESSAGE_PIN = "/app/chat/message/pin/"
export const TOPIC_MESSAGE_REMOVE = "/app/chat/message/remove/"
export const TOPIC_CONNECT_CONVERSATION = "/app/connect-conversation/"
export const TOPIC_DISCONNECT_CONVERSATION = "/app/disconnect-conversation/"

export const FILE_ICON_MAP: Record<string, string> = {
  pdf: "/icons/file-preview/pdf.svg",

  doc: "/icons/file-preview/docx.svg",
  docx: "/icons/file-preview/docx.svg",

  xls: "/icons/file-preview/xlsx.svg",
  xlsx: "/icons/file-preview/xlsx.svg",

  ppt: "/icons/file-preview/ppt.svg",
  pptx: "/icons/file-preview/ppt.svg",

  jpg: "/icons/file-preview/jpg.svg",
  jpeg: "/icons/file-preview/jpg.svg",
  png: "/icons/file-preview/png.svg",
  gif: "/icons/file-preview/gif.svg",
  webp: "/icons/file-preview/webp.svg",

  mp4: "/icons/file-preview/mp4.svg",
  mov: "/icons/file-preview/mp4.svg",
  webm: "/icons/file-preview/webm.svg",

  zip: "/icons/file-preview/zip.svg",
  rar: "/icons/file-preview/rar.svg",
};
