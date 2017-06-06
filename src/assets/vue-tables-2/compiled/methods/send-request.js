'use strict';

module.exports = function (data) {
  if (typeof this.axios !== 'undefined') return this.axios.post(this.url, data).catch(function (e) {
    this.dispatch('error', e);
  }.bind(this));

  if (typeof this.$http !== 'undefined') return this.$http.post(this.url, data).then(function (data) {
    return data.json();
  }.bind(this), function (e) {
    this.dispatch('error', e);
  }.bind(this));

  if (typeof $ != 'undefined') return $.getJSON(this.url, data).fail(function (e) {
    this.dispatch('error', e);
  }.bind(this));

  throw "vue-tables: No supported ajax library was found. (jQuery, axios or vue-resource)";
};