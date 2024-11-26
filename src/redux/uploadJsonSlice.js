import { createSlice } from "@reduxjs/toolkit";

const uploadJsonSlice = createSlice({
  name: 'uploadJson',
  initialState: {
    performanceList: [],
    tableLoading: true
  },
  reducers: {
    formatPerformanceList(state, { payload }) {
      const jsonData = payload
      // const filterData = jsonData.filter(item => !!item.args?.data?.url && (item.args?.data?.url?.includes('gulfstream') || item.args?.data?.url?.includes('gulf-lazy-common')))
      const filterData = jsonData.filter(item => !!item.args?.data?.url)
      const listData = filterData.map(item => {
        return {
          url: item.args?.data?.url.split('?')[0],
          name: item.name,
          ts: ((item.ts - filterData[0].ts) / 1000 / 1000).toFixed(5),
          dur: item.dur / 1000,
          tid: item.tid
        }
      })
      state.performanceList = listData
    },
    setTableLoading(state, { payload }) {
      state.tableLoading = payload
    }
  }
})

export const { formatPerformanceList, setTableLoading } = uploadJsonSlice.actions

export default uploadJsonSlice.reducer