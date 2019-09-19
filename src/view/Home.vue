<template>
  <div class="hello">
    <el-card>
      <div slot="header" class="clearfix">
        <span style="float: left; font-size: 28px;"> {{ currentBuilding }}洗衣机实时状态</span>
        <el-button type="primary" icon="el-icon-plus" circle style="float: right; margin: 5px;" @click="addBuildingDialogVisible = true"></el-button>
        <el-select v-model="currentBuilding" style="float: right; padding: 3px 0; width: 200px;" type="text" placeholder="选择楼栋" @change="onSelect" >
          <el-option
            v-for="item in buildingList"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </div>
      <el-table :data="machineList" v-loading="false"
                element-loading-text="拼命加载中(其实并没有很拼命"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table-column type="index"/>
        <el-table-column prop="name" label="楼层"/>
        <el-table-column prop="code" label="设备编号"/>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 'online' " style="color: green">
              {{ scope.row.status }}
            </div>
            <div v-else-if=" scope.row.status === 'offline' " style="color: red">
              {{ scope.row.status }}
            </div>
            <div v-else style="color: blue">
              检测错误
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="align-self: center; width: 200px; margin: 10px;" type="primary" @click="addMachineDialogVisible = true">添加洗衣机</el-button>
    </el-card>
    <el-dialog
      title="添加洗衣机"
      :visible.sync="addMachineDialogVisible"
      width="30%">
      <span>
        <el-form ref="formOfNewMachine" :model="formOfNewMachine" label-width="80px" :rules="ruleOfMachine">
          <el-form-item label="所属楼栋" prop="building">
            <el-input v-model="formOfNewMachine.building"></el-input>
          </el-form-item>
          <el-form-item label="设备名称" prop="name">
            <el-input v-model="formOfNewMachine.name"></el-input>
          </el-form-item>
          <el-form-item label="设备编号" prop="code">
            <el-input v-model="formOfNewMachine.code"></el-input>
          </el-form-item>
          <el-form-item label="管理密码" prop="pwd">
            <el-input v-model="formOfNewMachine.pwd" type="password" placeholder="请联系管理员获得"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addMachineDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onClickConfirmAddMachine">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加楼栋"
      :visible.sync="addBuildingDialogVisible"
      width="30%">
      <span>
        <el-form ref="formOfNewBuilding" :model="formOfNewBuilding" label-width="80px" :rules="ruleOfBuilding">
          <el-form-item label="楼栋名称" prop="name">
            <el-input v-model="formOfNewBuilding.name"></el-input>
          </el-form-item>
          <el-form-item label="管理密码" prop="pwd">
            <el-input v-model="formOfNewBuilding.pwd" type="password" placeholder="请联系管理员获得"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addBuildingDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onClickConfirmAddBuilding">确 定</el-button>
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
      machineList: [],
      buildingList: [],
      currentBuilding: 'D34',
      addBuildingDialogVisible: false,
      addMachineDialogVisible: false,
      formOfNewBuilding: {
        name: null,
        pwd: null
      },
      formOfNewMachine: {
        building: null,
        name: null,
        code: null,
        pwd: null
      },
      ruleOfBuilding: {
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入楼栋名称', trigger: 'blur' }
        ]
      },
      ruleOfMachine: {
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入机器名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入机器编号', trigger: 'blur' }
        ],
        building: [
          { required: true, message: '请选择所属楼栋', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getBuildingList()
    this.getMachineListAndCheck('D34')
  },
  methods: {
    getBuildingList () {
      axios({
        url: 'http://111.186.2.115:8082/getBuildingList'
      }).then(res => {
        this.buildingList = res.data
      }).catch(err => {
        this.buildingList = []
        console.log(err)
      })
    },
    getMachineListAndCheck (building) {
      axios({
        url: 'http://111.186.2.115:8082/getMachineList?building=' + building
      }).then(res => {
        this.machineList = [...res.data]
        for (let machine of this.machineList) {
          axios({
            url: 'http://111.186.2.115:8082/check?id='
          }).then(res2 => {
            this.$set(machine, 'status', res2.data.status)
            console.log(this.machineList)
          })
        }
      }).catch(err => {
        this.machineList = []
        console.log(err)
      })
    },
    onSelect (item) {
      console.log('onSelect', item)
      if (item === '添加新楼栋') {
        this.addBuildingDialogVisible = true
      } else {
        this.getMachineListAndCheck(item)
      }
    },
    onClickConfirmAddBuilding () {
      this.$refs['formOfNewBuilding'].validate(valid => {
        if (valid) {
          console.log(this.formOfNewBuilding)
          axios({
            url: 'http://111.186.2.115:8082/addBuilding',
            method: 'post',
            data: {...this.formOfNewBuilding}
          }).then(res => {
            this.addBuildingDialogVisible = false
            console.log(res.data)
            if (res.data.Msg === 'success') {
              this.getBuildingList()
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    onClickConfirmAddMachine () {
      this.$refs['formOfNewMachine'].validate(valid => {
        if (valid) {
          console.log(this.formOfNewMachine)
          axios({
            url: 'http://111.186.2.115:8082/addMachine',
            method: 'post',
            data: {...this.formOfNewMachine}
          }).then(res => {
            this.addMachineDialogVisible = false
            console.log(res.data)
            if (res.data.Msg === 'success') {
              this.getMachineListAndCheck(this.currentBuilding)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
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
  .el-form-item {
    margin-right: 30px;
  }
</style>
