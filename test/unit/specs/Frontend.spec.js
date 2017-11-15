import Vue from 'vue'
import Frontend from '@/components/Frontend'

const Constructor = Vue.extend(Frontend)

describe('Frontend.vue', () => {
  it('says waiting for players with no players', () => {
    const vm = new Constructor({ propsData: { lapCount: 2, players: [] } }).$mount()
    expect(vm.$el.querySelector('#frontend span').textContent)
      .to.equal('Waiting for players…')
  })

  it('only shows players that have qualified', () => {
    const propsData = {
      lapCount: 2,
      players: [
        {
          name: 'Unqualified player 1',
          carColor: 'green',
          stickerColor: 'black',
          laps: []
        },
        {
          name: 'Unqualified player 2',
          carColor: 'green',
          stickerColor: 'black'
        },
        {
          name: 'Qualified player',
          carColor: 'blue',
          stickerColor: 'white',
          laps: [1]
        }
      ]
    }
    const vm = new Constructor({ propsData }).$mount()
    const rows = vm.$el.querySelectorAll('#frontend tr.player')

    expect(rows).to.have.lengthOf(1)
    expect(rows[0].textContent).to.have.string('1').and.have.string('Qualified player')
  })

  it('shows no buttons', () => {
    const propsData = {
      lapCount: 2,
      players: [
        {
          name: 'Qualified player',
          carColor: 'blue',
          stickerColor: 'white',
          laps: [1]
        }
      ]
    }
    const vm = new Constructor({ propsData }).$mount()
    const buttons = vm.$el.querySelectorAll('#frontend tr.player button')
    expect(buttons).to.have.lengthOf(0)
  })

  it('shows lapCount lap column headers', () => {
    const propsData = {
      lapCount: 5,
      players: [
        {
          name: 'Qualified player',
          carColor: 'blue',
          stickerColor: 'white',
          laps: [1]
        }
      ]
    }
    const vm = new Constructor({ propsData }).$mount()
    const lapHeaders = vm.$el.querySelectorAll('#frontend thead th')

    expect(lapHeaders).to.have.lengthOf(6)
    expect(lapHeaders[0].textContent).to.equal('Lap')
    expect(lapHeaders[1].textContent).to.equal('1')
    expect(lapHeaders[2].textContent).to.equal('2')
    expect(lapHeaders[3].textContent).to.equal('3')
    expect(lapHeaders[4].textContent).to.equal('4')
    expect(lapHeaders[5].textContent).to.equal('5')
  })

  it('orders players by qualifying place during race', () => {
    const propsData = {
      lapCount: 2,
      players: [
        {
          name: 'Player 1',
          carColor: 'red',
          stickerColor: 'silver',
          laps: [2, 1]
        },
        {
          name: 'Player 2',
          carColor: 'orange',
          stickerColor: 'black',
          laps: [1, 2]
        }
      ]
    }
    const vm = new Constructor({ propsData }).$mount()
    const rows = vm.$el.querySelectorAll('#frontend tr.player')

    expect(rows).to.have.lengthOf(2)
    expect(rows[0].querySelectorAll('td')[0].textContent).to.have.string('1')
    expect(rows[0].textContent).to.have.string('Player 2')
    expect(rows[1].querySelectorAll('td')[0].textContent).to.have.string('2')
    expect(rows[1].textContent).to.have.string('Player 1')
  })

  it('orders players by finishing order after race', () => {
    const propsData = {
      lapCount: 1,
      players: [
        {
          name: 'Player 1',
          carColor: 'yellow',
          stickerColor: 'pink',
          laps: [2, 3]
        },
        {
          name: 'Player 2',
          carColor: 'green',
          stickerColor: 'white',
          laps: [3, 1]
        },
        {
          name: 'Player 3',
          carColor: 'red',
          stickerColor: 'silver',
          laps: [1, 2]
        }
      ]
    }
    const vm = new Constructor({ propsData }).$mount()
    const rows = vm.$el.querySelectorAll('#frontend tr.player')

    expect(rows).to.have.lengthOf(3)
    expect(rows[0].textContent).to.have.string('3').and.have.string('Player 2')
    expect(rows[0].querySelector('.lap').textContent).to.have.string('1')
    expect(rows[1].textContent).to.have.string('1').and.have.string('Player 3')
    expect(rows[1].querySelector('.lap').textContent).to.have.string('2')
    expect(rows[2].textContent).to.have.string('2').and.have.string('Player 1')
    expect(rows[2].querySelector('.lap').textContent).to.have.string('3')
  })
})
