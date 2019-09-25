Component({

  methods: {
    back: function() {
      this.triggerEvent('back', {}, {});
    }
  }
})