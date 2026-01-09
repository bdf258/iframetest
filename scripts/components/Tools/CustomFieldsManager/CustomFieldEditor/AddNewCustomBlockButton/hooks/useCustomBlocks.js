import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@electedtech/electedtech-ui";
import customBlocksApi from "../../../../../../api/src/customBlocks";

const useCustomBlocks = () => {
  const { modalActions } = useContext(ModalContext);
  const [customBlocks, setCustomBlocks] = useState([]);
  const [loadingCustomBlocks, setLoadingCustomBlocks] = useState(true);

  useEffect(() => {
    customBlocksApi.customBlocks(1, 50, modalActions).then((res) => {
      setCustomBlocks(res.data);
      setLoadingCustomBlocks(false);
    });
  }, []);

  return [loadingCustomBlocks, customBlocks];
};

export default useCustomBlocks;
