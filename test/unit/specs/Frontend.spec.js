import Vue from 'vue'
import Frontend from '@/components/Frontend'

describe('Frontend.vue', () => {
  it('says waiting for players', () => {
    const Constructor = Vue.extend(Frontend)
    const vm = new Constructor({ propsData: { lapCount: 2, players: [] } }).$mount()
    expect(vm.$el.querySelector('#frontend span').textContent)
      .to.equal('Waiting for players…')
  })
})
