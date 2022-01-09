module.exports = {
    index: async ctx => {
        const today = new Date()
        const result = []
        for (let i = 0 ; i <= 6; i++) {
            const newDay = new Date()
            result.push(new Date(newDay.setDate(today.getDate()+i)))
        }
        ctx.send(result)
    }
}