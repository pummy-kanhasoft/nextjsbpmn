import React, { useEffect } from "react";
import Modeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";
import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda.json";

const CreateForm = () => {
  let diagram = `<?xml version="1.0" encoding="UTF-8"?>
  <bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn">
    <bpmn2:process id="Process_1" isExecutable="false">
      <bpmn2:startEvent id="StartEvent_1"/>
    </bpmn2:process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_1">
      <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
        <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
          <dc:Bounds height="36.0" width="36.0" x="412.0" y="240.0"/>
        </bpmndi:BPMNShape>
      </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
  </bpmn2:definitions>
    `;
  useEffect(() => {
    setTimeout(() => {
      const modelerContainer = document.querySelector("#container");
      if (modelerContainer.childNodes.length == 0) {
        let modeler = new Modeler({
          container: "#container",
          keyboard: {
            bindTo: document,
          },
          additionalModules: [propertiesPanelModule, propertiesProviderModule],
          propertiesPanel: {
            parent: "#properties",
          },
          moddleExtensions: {
            camunda: camundaModdleDescriptor,
          },
        });

        modeler
          .importXML(diagram)
          .then(({ warnings }) => {
            const canvas = modeler.get("canvas");
            canvas.zoom("fit-viewport");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, 100);
  }, []);

  return (
    <>
      <div
        id="container"
        style={{
          border: "1px solid #000000",
          height: "100vh",
          width: "76vw",
          margin: "auto",
        }}
      ></div>
      <div id="properties" style={{ marginTop: "-410px" }}></div>
    </>
  );
};

export default CreateForm;
