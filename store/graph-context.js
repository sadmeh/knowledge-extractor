import {createContext, useState} from 'react'

const GraphContext = createContext({
  data: null,
  selectedNode: null,
  initData: function () {
  },
  addNode: function (fromNode, toNode) {
  },
  deleteNode: function (node) {
  },
  editNode: function (oldNode, newNode) {},
  addLink: function (fromNode, toNode) {
  },
  selectNode: function (node) {
  }
})


export default GraphContext;