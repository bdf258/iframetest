import {
  Button,
  FlexBox,
  ModalContext,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import Exception from "./Plugins/Exception.jsx";
import api from "@electedtech/api";

function Plugins() {
  const [plugins, setPlugins] = useState([]);
  const [SelectedPlugin, setSelectedPlugin] = useState("");
  const [pluginDetails, setPluginDetails] = useState("");
  const { modalActions } = useContext(ModalContext);

  const getPlugins = async () => {
    const res = await api.getPlugins(modalActions);
    res && setPlugins(res.plugins);
  };
  useEffect(() => {
    getPlugins();
    //eslint-disable-next-line
  }, []);
  const saveDetails = async (payload, pluginID) => {
    const res = await api.savePlugin(pluginID, payload, modalActions);
    res && getPlugins();
    setSelectedPlugin("");
  };
  const selectPlugin = (plugin) => {
    // removes space from the name to match the file name
    const name = plugin.name && plugin.name.replace(/ /g, "");
    /*import jsx file of the component and render component depending on the selected name.
     If the file is not found it renders the exception component*/

    import(`./Plugins/${name}.jsx`)
      .then((Component) => setSelectedPlugin(() => Component.default))
      .catch(() => setSelectedPlugin(() => Exception));

    setPluginDetails(() => ({ ...plugin }));
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <FlexBox>
        {SelectedPlugin ? (
          <div>
            <Button type="text" onClick={() => setSelectedPlugin("")}>
              Back to Plugins
            </Button>
            <SelectedPlugin details={pluginDetails} saveDetails={saveDetails} />
          </div>
        ) : (
          <Table>
            <TableHead>
              <TableHeader>Plugin</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Configure</TableHeader>
            </TableHead>
            <TableBody>
              {plugins.map((plugin) => (
                <TableRow key={plugin.id}>
                  <TableCell textAlign="center">{plugin.name}</TableCell>
                  <TableCell textAlign="center">
                    {plugin.active ? "Enabled" : "Disabled"}
                  </TableCell>
                  <TableCell textAlign="center">
                    <Button type="text" onClick={() => selectPlugin(plugin)}>
                      Configure
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </FlexBox>
    </div>
  );
}

export default Plugins;
