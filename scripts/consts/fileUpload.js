const caseAttachmentFileTypes = [
  "gif",
  "jpg",
  "jpeg",
  "tiff",
  "png",
  "pdf",
  "msg",
  "eml",
  "rtf",
  "xps",
  "doc",
  "docx",
  "ppt",
  "pptx",
  "xls",
  "xlsx",
  "txt",
  "mp3",
  "mp4",
  "wav",
  "od",
  "mov",
  "csv",
  "zip",
];

const emailAttachmentFileTypes = [
  "gif",
  "jpg",
  "jpeg",
  "tiff",
  "png",
  "pdf",
  "msg",
  "eml",
  "rtf",
  "xps",
  "doc",
  "docx",
  "ppt",
  "pptx",
  "xls",
  "xlsx",
  "txt",
  "mp3",
  "mp4",
  "wav",
  "od",
  "mov",
  "zip",
  "csv",
];

export const inboxEmailUploadFileTypes = ["msg"];
const bulkEmailAttachmentFileType = ["jpg", "pdf"];

const bulkEmailAttachmentFileTypeAsString = bulkEmailAttachmentFileType.reduce(
  (acc, cur) => `.${cur},${acc}`,
  ""
);

const caseAttachmentFileTypesAsString = caseAttachmentFileTypes.reduce(
  (acc, cur) => `.${cur},${acc}`,
  ""
);

const emailAttachmentFileTypesAsString = emailAttachmentFileTypes
  .map((type) => "." + type)
  .join(",");

export const inboxEmailUploadFileTypesAsString = inboxEmailUploadFileTypes
  .map((type) => "." + type)
  .join(",");

const validCaseFileAttachmentExtension = (fileExtension) =>
  caseAttachmentFileTypes.includes(fileExtension.toLowerCase());

const validEmailAttachmentFileExtension = (fileExtension) =>
  emailAttachmentFileTypes.includes(fileExtension.toLowerCase());

export const validInboxEmailUploadExtension = (fileExtension) =>
  inboxEmailUploadFileTypes.includes(fileExtension.toLowerCase());

const caseMaxFileUploadSize = 104857600; // 100MB in bytes
const emailAttachmentFileUploadSize = 20971520; // 20MB in bytes
export const inboxMaxEmailUploadSize = 20971520; // 20MB in bytes
const validBulkAttachmentFileExtension = (fileExtension) =>
  bulkEmailAttachmentFileType.includes(fileExtension.toLowerCase());
const bulkEmailAttachmentFileUploadSize = 256000; // 250KB in bytes

const bulkEmailWithAttachmentLimit = 1000; //no of max bulk email recipients with an attachment

const getFileSizeForDisplay = (fileSizeInBytes) =>
  `${fileSizeInBytes / 1024 / 1024}MB`;

const getBulkEmailFileSizeForDisplay = (fileSizeInBytes) =>
  `${fileSizeInBytes / 1024}KB`;

export {
  caseAttachmentFileTypes,
  caseMaxFileUploadSize,
  emailAttachmentFileTypes,
  emailAttachmentFileUploadSize,
  caseAttachmentFileTypesAsString,
  emailAttachmentFileTypesAsString,
  bulkEmailAttachmentFileTypeAsString,
  validCaseFileAttachmentExtension,
  validEmailAttachmentFileExtension,
  validBulkAttachmentFileExtension,
  getFileSizeForDisplay,
  bulkEmailAttachmentFileUploadSize,
  getBulkEmailFileSizeForDisplay,
  bulkEmailWithAttachmentLimit,
};
