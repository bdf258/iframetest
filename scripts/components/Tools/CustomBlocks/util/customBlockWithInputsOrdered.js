export const customBlockWithInputsOrdered = (customBlocksAsInputs) => {
  return customBlocksAsInputs.map((customBlockAsInput) => {
    const { inputs } = customBlockAsInput;

    return {
      ...customBlockAsInput,
      inputs: inputs.sort((a, b) => a.orderNo - b.orderNo),
    };
  });
};
