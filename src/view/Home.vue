<template>
  <div class="hello">
    <el-table :data="laundryMachineList">
      <el-table-column type="index"/>
      <el-table-column prop="location" label="楼层"/>
      <el-table-column prop="name" label="设备编号"/>
      <el-table-column prop="status" label="状态"/>
    </el-table>
  </div>
</template>

<script>
import request from 'request'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      laundryMachineList: []
    }
  },
  mounted () {
    this.laundryMachineList = [
      {'location': 'F13   ', 'name': ['J94495']},
      {'location': 'F11   ', 'name': ['J94646']},
      {'location': 'F9    ', 'name': ['J94519']},
      {'location': 'F7    ', 'name': ['J94515']},
      {'location': 'F5    ', 'name': ['J94492']},
      {'location': 'F3    ', 'name': ['J94644']},
      {'location': 'F1(东侧1号) ', 'name': ['J94523']},
      {'location': 'F1(东侧2号) ', 'name': ['J94524']},
      {'location': 'F1(西侧3号)', 'name': ['J94525']},
      {'location': 'F1(西侧4号)', 'name': ['J94498']},
      {'location': 'F1(西侧4号)', 'name': ['J94576']}
    ]
    this.laundryMachineList.map(item => {
      request('https://www.weimaqi.net/Index_.aspx?device_name=' + item.name[0] + 'extra=', function (error, response, body) {
        console.log('error:', error) // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode) // Print the response status code if a response was received
        console.log('body:', body) // Print the HTML for the Google homepage.
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
