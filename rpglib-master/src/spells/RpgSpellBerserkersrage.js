const RpgSpell = require('../RpgSpell.js')

/* eslint no-undef: "off" */
module.exports = class RpgSpellBerserkersrage extends RpgSpell {

    constructor(player) {
        let data = {
            health:100
        }
        super(player, data)
        this.count = 1

    }


    cast(target) {

        this.precision= 45
        let hitrate = this.player.randPower(1,100)
        let damage = (this.player.baseHealth - this.player.health)*60 /100

        this.berserk()
        

        this.player.logger(`${this.player.name} Enrage and hit ${target.name} for ${damage} damage`)
        target.health -= damage
        if(hitrate >= precision){

            while(hitrate >= this.precision){
                this.berserk()
                
                damage = (this.player.baseHealth - this.player.health)*45 /100
                this.player.logger(`${this.player.name} hit one more time ${target.name} for ${damage} damage`)
                target.health -= damage
                this.precision -= 10
                hitrate = this.player.randPower(1,100)
                
            }    

            this.player.logger(`${this.player.name} missed`)

        


        }
        
    }


}
