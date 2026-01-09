export const customBlocksAsInputsForCaseCreation = (customBlocksAsInputs) => {
  if (!customBlocksAsInputs) return [];

  return customBlocksAsInputs.map((customBlock) => {
    const { inputs } = customBlock;
    return {
      ...customBlock,
      inputs: inputs.filter(({ input }) => {
        return !!input.hideonCreate;
      }),
    };
  });
};
