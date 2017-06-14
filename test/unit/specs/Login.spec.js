import Login from '@/components/Login'

describe('Login.vue', () => {
  it('sets the correct default data', () => {
    expect(typeof Login.data).to.equal('function')
    const defaultData = Login.data()
    expect(defaultData.logining).to.equal(false)
  })
})
