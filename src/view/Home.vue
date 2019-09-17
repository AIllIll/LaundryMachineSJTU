<template>
  <div class="hello">
    <el-card>
      <div slot="header" class="clearfix">
        <span style="float: left; font-size: 28px;"> {{ building }}洗衣机实时状态</span>
        <el-button style="float: left; margin-left:28px; align-items: center" type="primary" @click="onClickAdd">add</el-button>
        <el-select v-model="building" style="float: right; padding: 3px 0; width: 200px;" type="text" placeholder="选择楼栋" @change="onSelect" >
          <el-option
            v-for="item in buildingOptionList"
            :key="item.buildingId"
            :label="item.buildingName"
            :value="item.buildingId"
            >
          </el-option>
        </el-select>
      </div>
      <el-table :data="laundryMachineList" v-loading="false"
                element-loading-text="拼命加载中(其实并没有很拼命"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table-column type="index"/>
        <el-table-column prop="location" label="楼层"/>
        <el-table-column prop="name" label="设备编号"/>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <div style="color: green" v-if="scope.row.status == 'online'">在线</div>
            <div style="color: red" v-else-if="scope.row.status == 'offline'">离线</div>
            <div style="color: red" v-else >无法检测：请联系管理员</div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="addDialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>
        <el-form>
          <el-form-item>

          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
// import check from '@/api/laundryMachine'
export default {
  name: 'HelloWorld',
  data () {
    return {
      laundryMachineList: [],
      buildingOptionList: [{
        buildingId: 'D34',
        buildingName: 'D34'
      }, {
        buildingId: 'D35',
        buildingName: 'D35'
      }],
      building: 'D34',
      loading: true,
      addDialogVisible: false
    }
  },
  mounted () {
    this.loading = true
    let counter = 0
    this.laundryMachineList = [
      {'location': 'F13   ', 'name': ['J94495'], 'status': ''},
      {'location': 'F11   ', 'name': ['J94646'], 'status': ''},
      {'location': 'F9    ', 'name': ['J94519'], 'status': ''},
      {'location': 'F7    ', 'name': ['J94515'], 'status': ''},
      {'location': 'F5    ', 'name': ['J94492'], 'status': ''},
      {'location': 'F3    ', 'name': ['J94644'], 'status': ''},
      {'location': 'F1(东侧1号) ', 'name': ['J94523'], 'status': ''},
      {'location': 'F1(东侧2号) ', 'name': ['J94524'], 'status': ''},
      {'location': 'F1(西侧3号)', 'name': ['J94525'], 'status': ''},
      {'location': 'F1(西侧4号)', 'name': ['J94498'], 'status': ''},
      {'location': 'F1(西侧5号)', 'name': ['J94576'], 'status': ''}
    ]
    for (let item of this.laundryMachineList) {
      axios({
        url: 'http://111.186.2.115:8081/check?id=' + item.name
        // url: 'http://129.204.68.192:8081/check?id=' + item.name
        // url: 'http://10.162.103.176:8081/check?id=' + item.name
        // url: 'http://localhost:8081/check?id=' + item.name
        // url: 'http://111.186.2.209:19035/check?id=' + item.name
      }).then(res => {
        item.status = res.data.status
        counter++
        if (counter === this.laundryMachineList.length) {
          this.loading = false
        }
        return item
      }).catch(err => {
        item.status = 'error'
        console.log(item.location, err)
      })
    }
  },
  methods: {
    onClickAdd () {
      this.addDialogVisible = true
    },
    onSelect () {
      console.log('onSelect')
      this.loading = true
      let counter = 0
      this.laundryMachineList = [
        {'location': 'F13   ', 'name': ['J94495'], 'status': ''},
        {'location': 'F11   ', 'name': ['J94646'], 'status': ''},
        {'location': 'F9    ', 'name': ['J94519'], 'status': ''},
        {'location': 'F7    ', 'name': ['J94515'], 'status': ''},
        {'location': 'F5    ', 'name': ['J94492'], 'status': ''},
        {'location': 'F3    ', 'name': ['J94644'], 'status': ''},
        {'location': 'F1(东侧1号) ', 'name': ['J94523'], 'status': ''},
        {'location': 'F1(东侧2号) ', 'name': ['J94524'], 'status': ''},
        {'location': 'F1(西侧3号)', 'name': ['J94525'], 'status': ''},
        {'location': 'F1(西侧4号)', 'name': ['J94498'], 'status': ''},
        {'location': 'F1(西侧5号)', 'name': ['J94576'], 'status': ''}
      ]
      for (let item of this.laundryMachineList) {
        axios({
          url: 'http://localhost:8081/check?id=' + item.name
          // url: 'http://111.186.2.209:19035/check?id=' + item.name
        }).then(res => {
          item.status = res.data.status
          counter++
          if (counter === this.laundryMachineList.length) {
            this.loading = false
          }
          return item
        }).catch(err => {
          item.status = 'error'
          console.log(item.location, err)
        })
      }
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
    clear: both
  }

</style>
