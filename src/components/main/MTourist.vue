<template>
  <div class="temp" v-show="isShow">
    <a @click="close">close</a>
    <div v-for="item in tourists">
      {{ item.TravellerName }}
      {{ item.TravellerMobile }}
      {{ item.CardType | cardType }}
      {{ item.CardID}}
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
.temp {
  position: fixed;
  z-index: 999;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
