<template>
  <div class="hello">
    <el-card>
      <div slot="header" class="clearfix">
        <span style="float: left; font-size: 28px;">
          {{ currentBuilding }}洗衣机实时状态</span
        >
        <div style="height: 50px; float: right;">
          <el-radio-group v-model="currentBuilding" @change="onSelect">
            <el-radio-button
              v-for="item in buildingList"
              :key="item.name"
              :label="item.name"
            />
          </el-radio-group>
        </div>
      </div>
      <el-table
        :data="machineList"
        v-loading="loading"
        element-loading-text="拼命加载中(其实并没有很拼命"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <!--<el-table-column type="index"/>-->
        <el-table-column align="center" prop="location" label="楼层"/>
        <el-table-column align="center" prop="key" label="设备编号" />
        <el-table-column align="center" prop="available" label="状态">
          <template slot-scope="scope">
            <div v-if="scope.row.available === true" style="color: green">
              <!--              {{ scope.row.status }}-->
              空闲
            </div>
            <div v-else-if="scope.row.available === false" style="color: red">
              <!--              {{ scope.row.status }}-->
              占用or离线
            </div>
            <div v-else style="color: blue">
              检测错误
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
// import check from '@/api/laundryMachine'

export default {
  name: 'HelloWorld',
  data () {
    return {
      loading: false,
      machineList: [],
      buildingList: [],
      currentBuilding: 'd34'
    }
  },
  mounted () {
    this.getBuildingList()
    this.getMachineStatus('d34')
  },
  methods: {
    getBuildingList () {
      this.buildingList = ['d34', 'd35']
    },
    getMachineStatus (key) {
      this.loading = true
      axios({
        // url: `http://111.186.2.105:2334/api/v1/laundry/machine/${key}`
        url: `http://localhost:2334/api/v1/laundry/machine/${key}`
      }).then(res => {
        this.machineList = res.data
        this.loading = false
      })
    },
    onSelect (key) {
      this.getMachineStatus(key)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-form-item {
  margin-right: 30px;
}
</style>
