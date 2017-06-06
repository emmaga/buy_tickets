<template>
  <div  class="modal fade in" v-show="isShow">
    <div class="modal-backdrop fade in"></div>
    <div class="modal-dialog autoscroll" >
      <div class="modal-content">
        <!--header-->
        <div class="modal-header">
          <button type="button" class="close"  @click="close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 class="modal-title" >游客</h5>
        </div>
        <!--body-->
        <div class="modal-body">
          <div v-for="item in tourists">
            <label>游客{{}}</label>
            <br>姓名：&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{ item.TravellerName }}
            <br>手机：&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{ item.TravellerMobile }}
            <br>证件类型：{{ item.CardType | cardType }}
            <br>证件号：&nbsp&nbsp&nbsp{{ item.CardID}}
          </div>
        </div>
        <!--footer-->
        <!--footer-->
        <div class="modal-footer">
          <a class="btn btn-default btn-sm" @click="close">取消</a>
        </div>

      </div>
    </div>


  </div>
</template>

<script>
import {getCardType} from '@/utils/filters'
let that
export default {
  name: 'm-tourist',
  data () {
    return {
      isShow: false,
      orderId: 0,
      tourists: []
    }
  },
  computed: {
    // user_name () {
    //   return this.$store.state.user_name
    // }
  },
  filters: {
    cardType: function (value) {
      return getCardType(value)
    }
  },
  created () {
    that = this
  },
  methods: {
    init () {
      this.tourists = []
      this.isShow = true
      this.getTouristList()
    },
    close () {
      this.isShow = false
    },
    getTouristList () {
      this.axios.post('/otauser', {
        action: 'GetOrderUserList',
        orderId: this.orderId + ''
      })
      .then(function (response) {
        let data = response.data
        that.tourists = data.users.lists
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
