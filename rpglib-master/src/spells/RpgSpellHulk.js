const RpgSpell = require('../RpgSpell.js')

/* eslint no-undef: "off" */
module.exports = class RpgSpellHulk extends RpgSpell {

    constructor(player) {
        let data = {
            mana: 400
        }
        super(player, data)
        this.count = 1
    }

    cast() {

        // stop cast
        if (this.player.stateHulk) {
            this.player.stateHulk = false
            this.player.logger(`${this.player.name} is human again…`)
            this.player.currentBuffs = []
            this.player.addBuff('strength', -10, 4)
            this.player.addBuff('constitution', -8, 4)
            return
        }

        this.consume()

        // hulk state
        // TODO: this.player.states.special
        this.player.stateHulk = true

        this.player.logger(`${this.player.name} is how Hulk… wow…`)
        this.player.addBeforeTurn(this.callback.bind(this))

        return true
    }

    callback() {

        // le mode a été désactivé
        if (!this.player.stateHulk) {
            return
        }

        this.count++

        // perds de plus en plus de vie
        this.player.health -= this.count * 50
        // de plus en plus fort et bête
        this.player.addBuff('strength', this.count * 4, 1)
        this.player.addBuff('intelligence', this.count * -3, 1)

        if (this.count === 4) {
            this.player.logger(`Is ${this.player.name} still human?…`)
        }

        return this.callback.bind(this)
    }

}
