export const canSaveDraft = (lastSavedEmail, form, bodyDirty) => {
  const formDirty = () => {
    const toDirty =
      JSON.stringify(form.to) !== JSON.stringify(lastSavedEmail.to);
    const ccDirty =
      JSON.stringify(form.cc) !== JSON.stringify(lastSavedEmail.cc);
    const bccDirty =
      JSON.stringify(form.bcc) !== JSON.stringify(lastSavedEmail.bcc);
    const subjectDirty = form.subject !== lastSavedEmail.subject;
    const attachmentsDirty =
      JSON.stringify(form.attachments) !==
      JSON.stringify(lastSavedEmail.attachments);
    const templateDirty =
      JSON.stringify(form.template) !== JSON.stringify(lastSavedEmail.template);
    const fromDirty = form.from !== lastSavedEmail.from;

    return (
      toDirty ||
      ccDirty ||
      bccDirty ||
      subjectDirty ||
      attachmentsDirty ||
      templateDirty ||
      fromDirty ||
      bodyDirty
    );
  };

  return formDirty();
};
