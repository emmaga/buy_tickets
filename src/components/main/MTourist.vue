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
          <div v-for="(item, index) in tourists" style="margin-bottom:10px; margin-top:4px;">
            <label style="margin-bottom:0px;">游客{{ index + 1 }}</label>
            <br>姓名：&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{ item.TravellerName }}
            <br>手机：&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{ item.TravellerMobile }}
            <br>证件类型：{{ item.CardType | cardType }}
            <br>证件号：&nbsp&nbsp&nbsp{{ item.CardID}}
          </div>
        </div>
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
    this.$bus.$on('touristInit', event => {
      this.orderId = event.orderId
      this.init()
    })
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
      .then((response) => {
        let data = response.data
        this.tourists = data.users.lists
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
